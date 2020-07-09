import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addFruit({fruitId: 'fruit1', fruitX: 5, fruitY:5})

game.movePlayer({playerId: 'player1', keyPressed: 'ArrowRight'})

sockets.on('connection', (socket) => {

    const playerId = socket.id
    game.addPlayer({playerId: playerId})

    console.log(`> Player connected on Server with id: ${playerId}`)

    socket.emit('setup', game.state)
    socket.on('disconnect', () => {

        game.removePlayer({playerId: playerId})

        console.log(`> Player disconnected: ${playerId}`)

    })

})

server.listen(3000, () => {

    console.log('> Server listening on port: 3000')
    
})