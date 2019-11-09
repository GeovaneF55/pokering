require('dotenv').config()
require('./config/database')
const server = require('./config/server')
const socketio = require('./config/socketio')

socketio(server)
