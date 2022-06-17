const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = 8080
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use('/', routes)

app.listen(port, (error) => {
    if(!error) {
        console.log(`Server started on port ${port}`)
    } else {
        console.log(`Error: ${error}`)
    }
})
