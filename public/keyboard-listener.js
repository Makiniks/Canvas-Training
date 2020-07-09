export default function createKeyboardListener(document) {

    const state = {

        observers: []

    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {

        const keyPressed = event.key
        const command = {

            playerId: 'player1',
            keyPressed

        }

        

    }

    return {

        
        
    }

}