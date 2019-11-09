require('dotenv').config()
const server = require('./config/server')
const socketio = require('./config/socketio')

socketio(server)
