const express = require('express')
const app = express()

const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {


    // socket.broadcast.emit("connected", "user connected")
    socket.on("join", (roomNo) => {
        socket.join(roomNo)
        console.log("joined room ", roomNo);
    })
    socket.on("message", (payload) => {
        console.log("what is payload", payload);
        socket.to("room1").emit(/* ... */);
        io.emit("message", payload)
    })
    // socket.broadcast.emit("message")
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})


server.listen(4000, () => {
    console.log('server listening on port 4000')
})