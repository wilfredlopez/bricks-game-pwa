import Game from "./Game";
import Paddle from "./Paddle";


const LeftListeners: { [key: string]: string } = {
    'ArrowLeft': 'ArrowLeft', 'Left': 'Left', 'a': 'a', 'A': 'A'
}

const RightListeners: { [key: string]: string } = {
    'ArrowRight': 'ArrowRight', 'Right': 'Right', 's': 's', 'S': 'S'
}

export default class InputHandler {
    private isDragging = false
    private mouse = { x: 0, y: 0 }
    constructor(public game: Game, public paddle: Paddle) {
        this.addkeyDownListener()
        this.addkeyUpListener()
        this.addMouseDownListener()
        this.addMouseUpListener()
        this.addMouseMoveListener()
    }





    setMouse(evt: MouseEvent) {
        const canvas = this.game.canvas
        const { left, top } = canvas.getBoundingClientRect()
        this.mouse = {
            x: evt.clientX - left,
            y: evt.clientY - top
        }

        return this.mouse
    }


    /**
     * Handle DragStart
     */
    addMouseDownListener() {
        document.addEventListener('mousedown', (evt) => {
            this.setMouse(evt)
            this.isDragging = true
            this.calcMove()
        }, false)
    }


    /**
     * 
     * Handle DragStop
     */
    addMouseUpListener() {
        document.addEventListener('mouseup', (evt) => {
            this.isDragging = false
            // this.setMouseCoordinates(evt)
            this.mouse = { x: 0, y: 0 }
            this.paddle.stop()

        }, false)
    }

    /**
     * handle Drag
     */
    addMouseMoveListener() {
        document.addEventListener('mousemove', (evt) => {
            this.setMouse(evt)
            if (this.isDragging)
            {
                this.calcMove()
            } else
            {

                this.paddle.stop()
            }

        }, false)
    }

    calcMove() {
        const mouse = this.mouse
        const paddle = this.paddle
        if (this.isDragging && paddle.isInside(mouse))
        {

            paddle.x = mouse.x - (paddle.width / 2)

        } else
        {
            paddle.stop()
        }
    }






    //KEYBOARD EVENTS

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