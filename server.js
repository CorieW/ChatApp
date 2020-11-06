const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const dotenv = require('dotenv')
const flash = require("express-flash")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require("express-session")

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

require('./sockets/index')(io)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 3002
server.listen(port)

// ! Messaging offline people breaks the server