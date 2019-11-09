const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
