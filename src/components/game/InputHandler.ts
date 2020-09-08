import Game from "./Game";
import Paddle from "./Paddle";


const LeftListeners: { [key: string]: string } = {
    'ArrowLeft': 'ArrowLeft', 'Left': 'Left', 'a': 'a', 'A': 'A'
}

const RightListeners: { [key: string]: string } = {
    'ArrowRight': 'ArrowRight', 'Right': 'Right', 's': 's', 'S': 'S'
}

export default class InputHandler {
    constructor(public game: Game, public paddle: Paddle) {
        this.addkeyDownListener()
        this.addkeyUpListener()
    }

    addkeyUpListener() {
        document.addEventListener('keyup', (evt) => {
            switch (evt.key)
            {
                case LeftListeners[evt.key]:
                    if (this.paddle.speed < 0) this.paddle.stop()
                    break;
                case RightListeners[evt.key]:
                    if (this.paddle.speed > 0) this.paddle.stop()
                    break;
                default:
                    break;
            }
        })
    }

    addkeyDownListener() {
        document.addEventListener('keydown', (evt) => {
            switch (evt.key)
            {
                case LeftListeners[evt.key]:
                    this.paddle.moveLeft()
                    break;
                case RightListeners[evt.key]:
                    this.paddle.moveRight()
                    break;
                case 'Escape':
                case ' ':
                    this.game.togglePause()
                    break;
                case 'Enter':
                case '1':
                    this.game.start()
                    break;
                case 'R':
                    this.game.restart()
                    break;
                default:
                    break;
            }
        })
    }
}