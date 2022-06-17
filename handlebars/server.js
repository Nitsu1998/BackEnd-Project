const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = 8080
const { engine } = require('express-handlebars')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials'),
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use('/', routes)

app.listen(port, (error) => {
    if(!error) {
        console.log(`Server started on port ${port}`)
    } else {
        console.log(`Error: ${error}`)
    }
})
