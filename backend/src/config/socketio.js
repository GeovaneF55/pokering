const socketio = require('socket.io')

module.exports = server => {
    const io = socketio(server)
    let pokemon = 'Bulbassalto'
    let users = []
    let token = 0

    io.on('connection', socket => {
        users.push(socket)
        socket.emit('pokemon', pokemon)
    })
}
