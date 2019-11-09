const socketio = require('socket.io')

let pokemon = 'Bulbassalto'
let users = []
let current = 0

const timeout = 5000
const moveToken = () => {
    if (users.length <= 1) {
        return
    }

    const last = current
    console.log("LENGTH:", users.length)
    current = (current + 1) % users.length

    users[last].emit('token', false)
    users[current].emit('token', true)
}

module.exports = server => {
    const io = socketio(server)

    io.on('connection', socket => {
        users.push(socket)
        socket.emit('pokemon', pokemon)

        let index = users.length - 1
        console.log('CONECTADO:', socket.id)

        socket.once('disconnect', () => {
            console.log('DISCONNECT BABY:', socket.id)
            users.splice(index, 1)

            // Send token to the next node if the current was the disconnected one.
            if (socket == users[current]) {
                current %= users.length
                users[current].emit('token', true)
            }
        })

        if (users.length <= 1) {
            socket.emit('token', true)
            return
        }
    })

    setInterval(moveToken, timeout)
}
