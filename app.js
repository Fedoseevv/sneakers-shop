const express = require('express')
const config = require('config') 
const mongoose = require('mongoose')
const router = require('./routes/index')

const app = express() 

app.use(express.json({ extended: true })) 

app.use('/api', router)
app.use('/api/sneakers', require('./routes/sneakers-routes'))
app.use('/api/cart', require('./routes/cart-routes'))
const PORT = config.get('port') || 5000 


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
        })
        

    } catch(e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}
start()

