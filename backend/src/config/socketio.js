const socketio = require('socket.io')

module.exports = server => {
    const io = socketio(server)
    io.on('connection', () => {
        console.log('BATATA')
    })
}
