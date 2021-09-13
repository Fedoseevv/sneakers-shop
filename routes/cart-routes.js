const {Router} = require('express')
const Sneaker = require('../models/Sneaker')
const authMiddleware = require('../middleware/auth-middleware')
const User = require('../models/User')


const router = new Router()

function mapCartItems(cart) {
    return cart.items.map(item => ({
        ...item.sneakerId._doc, 
        id: item.sneakerId.id,
        count: item.count,
        size: item.size
    }));
}

function computePrice(sneakers) {
    return sneakers.reduce((total, sneaker) => {
        return total +=sneaker.price * sneaker.count
    }, 0)
}

router.post('/', async(req, res) => {
    try {
        const {id} = req.body

        const user = await User.findById(id)
        .populate('cart.items.sneakerId') 
        const sneakers = mapCartItems(user.cart);
        const totalPrice = computePrice(sneakers)

        res.json({sneakers, totalPrice})

    } catch(e){
        res.status(500).json({ message: 'Не удалось получить данные. Повторите попытку позже' })
    }
})

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId 
        const user = await User.findById(userId)
        const sneaker = await Sneaker.findById(req.body.sneakerId);
        await user.addToCart(sneaker, req.body.size);
    } catch(e) {
        res.status(500).json( {message: e.message} )
    }
})

router.delete('/remove/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId // Получаем с клиента id пользователя
        const user = await User.findById(userId)// Находим пользователя в БД

        await user.removeFromCart(req.params.id)
        const result = await user
        .populate('cart.items.sneakerId')

        const sneakers = mapCartItems(result.cart)
        const cart = {
            sneakers, price: computePrice(sneakers)
        }

        res.status(200).json(cart)
    } catch(e) {
        res.status(500).json({message: e.message })
    }
})

module.exports = router