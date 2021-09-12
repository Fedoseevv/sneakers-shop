const {Router} = require('express')
const Sneaker = require('../models/Sneaker')
const config = require('config')
const authMiddleware = require('../middleware/auth-middleware')


const router = new Router()

router.post('/add', authMiddleware, async(req, res) => { // Добавить
    try {
        const baseUrl = config.get('baseUrl')
        const {title, price, img, sizes, descr} = req.body

        const arrSize = sizes.split(' ')

        const sneaker = new Sneaker({
            title: title,
            price: price,
            img: img,
            sizes: arrSize,
            descr: descr
        })
        console.log(sneaker)
        
        await sneaker.save()
        res.status(201).json({ sneaker })

    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так.../add'})
    }
})

router.get('/', async(req, res) => { // Вывод всех
    try {
        const allSneakers = await Sneaker.find().populate('userId')
        res.json(allSneakers)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так.../'})
    }
})

router.get('/:id', async(req, res) => { // Вывод одного
    try {
        console.log(req.params.id)
        const sneaker = await Sneaker.findById(req.params.id)
        // console.log(sneaker)
        res.json(sneaker)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так.../:id'})
    }
})



router.post('/edit', authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        console.log(`from server id: ${id}`)
        // console.log(`id from /edit: ${id}`)
        delete req.body.id;
        // await Course.update(req.body)
        const data = await Sneaker.findByIdAndUpdate(id, req.body);
        res.status(200).json(data)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так.../edit'})
    }
})

router.get('/edit/:id', authMiddleware, async (req, res) => {

    try {
        const sneaker = await Sneaker.findById(req.params.id)
        res.status(200).json(sneaker)

    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так.../:id/edit'})
    }

})


router.post('/remove', authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        await Sneaker.deleteOne({_id: id}) // Условие, которое должно выполниться для удаления    
        res.status(200).json({ message: 'Объект был удалён' })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так.../remove'})
    }
})

module.exports = router