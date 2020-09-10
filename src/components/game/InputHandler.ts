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
    constructor(public game: Game, public paddle: Paddle, autoStart = false) {
        if (autoStart)
        {
            this.start()
        }
    }

    start() {
        this.addkeyDownListener()
        this.addkeyUpListener()
        this.addMouseDownListener()
        this.addMouseUpListener()
        this.addMouseMoveListener()
    }


    removeEvents() {
        document.removeEventListener('mousedown', this.onMouseDown.bind(this), false)
        document.removeEventListener('mouseup', this.mouseUp.bind(this), false)
        document.removeEventListener('mousemove', this.mouseMove.bind(this), false)
        document.removeEventListener('keyup', this.onKeyUp)
        document.addEventListener('keydown', this.onKeyDown)
    }


    private setMouse(evt: MouseEvent) {
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
        document.addEventListener('mousedown', this.onMouseDown.bind(this), false)
    }

    private onMouseDown(evt: MouseEvent) {
        this.setMouse(evt)
        this.isDragging = true
        this.calcMove()
    }


    /**
     * 
     * Handle DragStop
     */
    addMouseUpListener() {
        document.addEventListener('mouseup', this.mouseUp.bind(this), false)
    }

    private mouseUp(evt: MouseEvent) {
        this.isDragging = false
        // this.setMouseCoordinates(evt)
        this.mouse = { x: 0, y: 0 }
        this.paddle.stop()
    }
    /**
     * handle Drag
     */
    addMouseMoveListener() {
        document.addEventListener('mousemove', this.mouseMove.bind(this), false)
    }

    private mouseMove(evt: MouseEvent) {
        this.setMouse(evt)
        if (this.isDragging)
        {
            this.calcMove()
        } else
        {

            this.paddle.stop()
        }
    }

    private calcMove() {
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
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    private onKeyUp(evt: KeyboardEvent) {
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
    }


    addkeyDownListener() {
        document.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    private onKeyDown(evt: KeyboardEvent) {
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
    }
}