const socketio = require('socket.io')

let pokemon = 'Bulbassalto'
let nodes = []
let mapIndex = new Map()
let current = 0

const timeout = 5000
const moveToken = () => {
    if (nodes.length <= 1) {
        return
    }

    const last = current
    console.log("LENGTH:", nodes.length)
    current = (current + 1) % nodes.length

    console.log('LAST:', last, '\tCURRENT:', current)
    nodes.forEach(u => console.log(u.id))

    nodes[last].emit('token', false)
    nodes[current].emit('token', true)
}

module.exports = server => {
    const io = socketio(server)

    io.on('connection', socket => {
        nodes.push(socket)
        socket.emit('pokemon', pokemon)

        let index = nodes.length - 1
        mapIndex.set(socket.id, index)

        console.log('CONECTADO:', socket.id)

        socket.once('disconnect', () => {
            console.log('DISCONNECT BABY:', socket.id)
            const isTokenOwner = socket === nodes[current]

            // Remove the node and update the mapIndex.
            nodes.splice(mapIndex.get(socket.id), 1)
            console.log('ID SENDO DELETADO:', socket.id)
            for (const [ key, value ] of mapIndex) {
                console.log(key + " = " + value)
            }

            nodes.forEach(n => console.log(n.id))
            mapIndex.delete(socket.id)
            nodes.forEach((i, n) => mapIndex.set(n, i))

            // Send token to the next node if the current was the disconnected one.
            console.log(current, isTokenOwner, nodes.length)
            if (isTokenOwner && nodes.length > 0) {
                current %= nodes.length
                console.log(current, isTokenOwner, nodes.length, nodes[current].id)
                nodes[current].emit('token', true)
            }
        })

        if (nodes.length <= 1) {
            socket.emit('token', true)
            return
        }
    })

    setInterval(moveToken, timeout)
}
