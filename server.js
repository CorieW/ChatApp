const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

require('./sockets/index')(io)

const port = process.env.PORT || 3002
server.listen(port)

// ! Messaging offline people breaks the server