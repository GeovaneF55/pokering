const fetch = require('node-fetch')
const socketio = require('socket.io')

let nodes = []
let mapIndex = new Map()
let current = 0

const timeout = 5000
const moveToken = () => {
    if (nodes.length <= 1) {
        return
    }

    const last = current
    current = (current + 1) % nodes.length

    // Invalidate token of the current node.
    nodes[last].emit('token', false)

    // Send token to the next node.
    nodes[current].emit('token', true)
}

// We're considering only the first generation.
const lastID = 151
const pokemonAPI = `https://pokeapi.co/api/v2/pokemon/`
const randomPokemon = () => {
    const randomID = Math.floor(Math.random() * lastID)
    const url = pokemonAPI + randomID

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return {
                name: data.name,
                url: data.sprites.front_default,
            }
        })
        .catch(({ message }) => console.log(message))
}

module.exports = server => {
    const io = socketio(server)
    randomPokemon().then(next => {
        let pokemon = next

        io.on('connection', socket => {
            nodes.push(socket)
            socket.emit('pokemon', pokemon)

            let index = nodes.length - 1
            mapIndex.set(socket.id, index)

            console.log('CONNECTED:', socket.id)

            socket.once('disconnect', () => {
                const isTokenOwner = socket === nodes[current]

                // Remove the node and update the mapIndex.
                nodes.splice(mapIndex.get(socket.id), 1)
                mapIndex.delete(socket.id)
                nodes.forEach((i, n) => mapIndex.set(n, i))

                // Send token to the next node if the current was the disconnected one.
                if (isTokenOwner && nodes.length > 0) {
                    current %= nodes.length
                    nodes[current].emit('token', true)
                }

                console.log('DISCONNECTED:', socket.id)
            })

            socket.on('captured', () => {
                randomPokemon().then(next => {
                    pokemon = next
                    io.emit('pokemon', pokemon)
                })
            })

            // Send the initial token to the first node.
            if (nodes.length <= 1) {
                socket.emit('token', true)
                return
            }
        })

        setInterval(moveToken, timeout)
    })
}
