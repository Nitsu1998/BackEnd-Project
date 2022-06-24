const express = require('express')
const { Server: IOServer } = require('socket.io')
const app = express()
const port = 8080
const io = new IOServer(expressServer)



const expressServer = app.listen(port, (error) => {
    if(!error) {
        console.log(`Server started on port ${port}`)
    } else {
        console.log(`Error: ${error}`)
    }
})