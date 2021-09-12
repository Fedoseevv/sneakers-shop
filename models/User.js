const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                size: {
                    type: Number,
                    required: true,
                    default: 40
                },
                sneakerId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Sneaker', // Связываем с моделью кроссовок === стер в конце s
                    required: true
                }
            } 
        ]
    }
})

// Доблавляем метод, выносим логику в объект пользователя
// Используем ключевое слово function чтобы не потерять контекст вызова
schema.methods.addToCart = function(sneaker, size) {
    const clonedItems = [...this.cart.items];
    const idx = clonedItems.findIndex(c => {
        return c.sneakerId.toString() === sneaker._id.toString()
    })

    if (idx >= 0) {
        clonedItems[idx].count = clonedItems[idx].count + 1;
    } else {
        clonedItems.push({
            sneakerId: sneaker._id,
            count: 1,
            size: size
        })
    }
    this.cart = {items: clonedItems}
    return this.save()
}

schema.methods.removeFromCart = function(id) {

    let items = [...this.cart.items]
    const idx = items.findIndex(item => {
        return item.sneakerId.toString() === id.toString()
    })

    if (items[idx].count === 1) {
        items = items.filter(item => item.sneakerId.toString() !== id.toString())

    } else {
        items[idx].count--;
    }

    this.cart = {items}
    return this.save();
}

schema.method('toClient', function() {
    const course = this.toObject();

    course.id = course._id;
    delete course._id

    return course
})


schema.methods.clearCart = function() {
    this.cart = {item: []}
    return this.save()
}


module.exports = model('User', schema)