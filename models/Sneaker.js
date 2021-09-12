const {Schema, model} = require('mongoose')

const sneaker = new Schema({
    title: {
        type: String, // Тип поля
        required: true, // Поле необходимое
        unique: true // Поле должно быть уникальным
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    sizes: [
        {
            type: Number,
            required: true,
            default: [38, 39, 40, 41, 42, 43]
        }
    ],
    descr: {
        type: String,
        default: "krekfmwlef,ewmfwenfjwnfkwemkfweeeeemjkfwnkehbfwhkejnmfkwenfhwebkjfnkfewkf"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Sneaker', sneaker)