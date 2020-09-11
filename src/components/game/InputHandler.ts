import Game from "./Game";
import Paddle from "./Paddle";


const LeftListeners: { [key: string]: string } = {
    'ArrowLeft': 'ArrowLeft', 'Left': 'Left', 'a': 'a', 'A': 'A'
}

const RightListeners: { [key: string]: string } = {
    'ArrowRight': 'ArrowRight', 'Right': 'Right', 's': 's', 'S': 'S'
}

export default class InputHandler {
    private mouse = { x: 0, y: 0 }
    constructor(public game: Game, public paddle: Paddle, autoAddEventListeners = true) {
        if (autoAddEventListeners)
        {
            this.addEventListeners()
        }
    }

    addEventListeners() {
        this.addkeyDownListener()
        this.addkeyUpListener()
        this.addMouseDownListener()
        this.addMouseUpListener()
        this.addMouseMoveListener()
    }


    removeEventListeners() {
        document.removeEventListener('mousedown', this.onMouseDown.bind(this), false)
        document.removeEventListener('mouseup', this.mouseUp.bind(this), false)
        document.removeEventListener('mousemove', this.mouseMove.bind(this), false)
        document.removeEventListener('touchend', this.onMouseDown.bind(this), false)
        document.removeEventListener('touchstart', this.mouseUp.bind(this), false)
        document.removeEventListener('touchmove', this.mouseMove.bind(this), false)
        document.removeEventListener('keyup', this.onKeyUp.bind(this))
        document.removeEventListener('keydown', this.onKeyDown.bind(this))
    }


    private setMouse(evt: MouseEvent | TouchEvent) {
        const canvas = this.game.canvas
        const { left, top } = canvas.getBoundingClientRect()
        let x = 0
        let y = 0
        if (evt instanceof (TouchEvent))
        {

            x = evt.changedTouches[0].clientX || 0
            y = evt.changedTouches[0]?.clientY || 0
        } else
        {
            x = evt.clientX
            y = evt.clientY
        }
        this.mouse = {
            x: x - left,
            y: y - top
        }
        return this.mouse
    }


    /**
     * Handle DragStart
     */
    addMouseDownListener() {
        document.addEventListener('mousedown', this.onMouseDown.bind(this), false)
        document.addEventListener('touchend', this.onMouseDown.bind(this), false)
    }

    private onMouseDown(evt: MouseEvent | TouchEvent) {
        this.setMouse(evt)
        this.calcMove()
    }


    /**
     * 
     * Handle DragStop
     */
    addMouseUpListener() {
        document.addEventListener('mouseup', this.mouseUp.bind(this), false)
        document.addEventListener('touchstart', this.mouseUp.bind(this), false)

    }

    private mouseUp(evt: MouseEvent | TouchEvent) {
        this.setMouse(evt)
        this.calcMove()
        // this.mouse = { x: 0, y: 0 }
        // this.paddle.stop()
    }
    /**
     * handle Drag
     */
    addMouseMoveListener() {
        document.addEventListener('mousemove', this.mouseMove.bind(this), false)
        document.addEventListener('touchmove', this.mouseMove.bind(this), false)
    }

    private mouseMove(evt: MouseEvent | TouchEvent) {
        this.setMouse(evt)
        this.calcMove()
    }

    private calcMove() {
        const mouse = this.mouse
        const paddle = this.paddle
        if (paddle.isInside(mouse))
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