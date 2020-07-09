export default function renderScreen(screen, game, requestAnimationFrame, currentPlayer) {

    const ctx = screen.getContext('2d')

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

    const playerId = game.state.players[currentPlayer]

    if (currentPlayer) {

        ctx.fillStyle = '#F0DB4F'
        ctx.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)

    }

    requestAnimationFrame(() => {

        renderScreen(screen, game, requestAnimationFrame, currentPlayer)

    })

}