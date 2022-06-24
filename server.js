// initialisation
const express = require('express')
const socket = require('socket.io')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000

// setup server
const app = express()
const server = http.createServer(app)
const io = socket(server)
app.use(express.static(path.join(__dirname, 'public')))

// begin
server.listen(PORT, () => console.log(`server started successfully on port ${PORT}!`))

// handle connections

io.on('connection', socket => {
    socket.on('submitWord', (word) => {
        io.emit('submitWord',word)
    })
})