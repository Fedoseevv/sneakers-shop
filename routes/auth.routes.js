const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()
const User = require('../models/User')

// Метод для проверки авторизованности
router.get('/auth', async (req, res) => {
    res.json({message: 'Пользователь авторизован'})
});


// /api/user/registration
router.post('/registration', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req) // Валидируем входящие поля
        if (!errors.isEmpty()) { // Если есть ошибки, то возвращаем их на фронт
            return res.status(400).json({
                errors: errors.array(), // возвращаем массив ошибок
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body; // Получаем с front-end'a два поля
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({message: 'Пользователь успешно создан!'}) // 201 - статус, когда что-то создается



    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова...' })
    }
})

// /api/auth
router.post(
    '/login', 
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').exists() // То есть пароль просто должен существовать
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req) // Валидируем входящие поля
        // console.log(errors)
        if (!errors.isEmpty()) { // Если есть ошибки, то возвращаем их на фронт
            return res.status(400).json({
                errors: errors.array(), // возвращаем массив ошибок
                message: 'Некорректные данные при входе'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email})
        console.log(user.role)
        

        if (!user) { // Пользователь не найден
            return res.status(400).json({message: 'Пользователь не найден'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {// Пароли не совпадают
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role }, // Данные, которые надо шифровать
            config.get('jwtSecret'), // Передаем секретный ключ
            { expiresIn: '1h' } // Через сколько данный jwt токен закончит свое существование
        )
            console.log(`before send res: ${user.role}`)
        res.json({token, userId: user.id, role: user.role})

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова...' })
    }   


})

module.exports = router