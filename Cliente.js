const cnv = document.querySelector("canvas")
const ctx = cnv.getContext("2d")
const currentPlayerId = 'player1'

function createGame() {

    const state = {

        players: {},
        fruits: {}

    }

    function addPlayer(command) {

        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {

            x: playerX,
            y: playerY

        }

    }

    function removePlayer(command) {

        const playerId = command.playerId

        delete state.players[playerId]

    }

    function addFruit(command) {

        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {

            x: fruitX,
            y: fruitY

        }

    }

    function removeFruit(command) {

        const fruitId = command.fruitId
		console.log("remover: " + fruitId)

        delete state.fruits[fruitId]

    }

    function MovePlayer(command) {

        const acceptedKeys = {

            ArrowUp(player) {

                player.y = Math.max(player.y - 1, 0)

            },
            ArrowDown(player) {

                player.y = Math.min(player.y + 1, cnv.height - 1)

            },
            ArrowRight(player) {

                player.x = Math.min(player.x + 1, cnv.width - 1)

            },
            ArrowLeft(player) {

                player.x = Math.max(player.x - 1, 0)

            }

        }
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedKeys[keyPressed]

        if (player && moveFunction) {

            moveFunction(player)
            checkForFruitCollision(playerId)

        }

    }

    function checkForFruitCollision(playerId) {
		
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {

            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
				
                removeFruit(fruitId)

            }

        }

    }

    return {

        addFruit,
        removeFruit,
        addPlayer,
        removePlayer,
        MovePlayer,
        state

    }

}

const game = createGame()
const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.MovePlayer)

function createKeyboardListener() {

    const state = {

        observers: []

    }

    function subscribe(observerFunction) {

        state.observers.push(observerFunction)

    }

    function notifyAll(command) {

        for (const observerFunction of state.observers) {

            observerFunction(command)

        }

    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {

        const keyPressed = event.key
        const command = {

            playerId: 'player1',
            keyPressed

        }

        notifyAll(command)

    }

    return {

        subscribe
        
    }

}

renderScreen()

function renderScreen() {

    ctx.fillStyle = 'white'
    ctx.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {

        const player = game.state.players[playerId]
        ctx.fillStyle = 'black'
        ctx.fillRect(player.x, player.y, 1, 1)

    }
    for (const fruitId in game.state.fruits) {

        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = 'green'
        ctx.fillRect(fruit.x, fruit.y, 1, 1)

    }

    requestAnimationFrame(renderScreen)

}