// Подключаем необходимые пакеты
const express = require('express') // Для работы с express
const config = require('config') // Для работы с конфигом подключаем установленный пакет
const mongoose = require('mongoose') // Подключаем пакет для работы с mongodb
const router = require('./routes/index')

const app = express() // Наш будущий сервер

app.use(express.json({ extended: true })) // Чтобы body не был пустым

app.use('/api', router)
app.use('/api/sneakers', require('./routes/sneakers-routes'))
app.use('/api/cart', require('./routes/cart-routes'))
const PORT = config.get('port') || 5000 // Получаем порт из конфига и если он не определен, то ставим 5000

// Оборачиваем все эти действия в async функцию, чтобы можно было пользоваться синтаксисом async/await, 
// потому как работает с промисами
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // Запускаем сервер только после того, как подключились к базе
        app.listen(PORT, () => { // Запускаем сервер на порте, указанным первым аргументом,
            // второй аргумент - кол-бэк функция, которая отрабатывает при успешком запуске сервера
            console.log(`App has been started on port ${PORT}`)
        })
        

    } catch(e) {
        console.log('Server error: ', e.message)
        process.exit(1) // Завершаем наш процесс, если что-то пошло не так
    }
}
start()

