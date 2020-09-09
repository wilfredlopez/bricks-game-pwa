import Game from "./Game";
import Paddle from "./Paddle";
import { detectCollisionOnObject } from "./detectCollision";


const LeftListeners: { [key: string]: string } = {
    'ArrowLeft': 'ArrowLeft', 'Left': 'Left', 'a': 'a', 'A': 'A'
}

const RightListeners: { [key: string]: string } = {
    'ArrowRight': 'ArrowRight', 'Right': 'Right', 's': 's', 'S': 'S'
}

export default class InputHandler {
    draging = false
    mouseCoordinates = { x: 0, y: 0 }
    constructor(public game: Game, public paddle: Paddle) {
        this.addkeyDownListener()
        this.addkeyUpListener()
        // this.addMouseDownListener()
        // this.addMouseUpListener()
        // this.addMouseMoveListener()
    }



    //THIS IS THE ISSUE
    getPaddleCoords() {
        const paddle = this.paddle

        const offsetLeft = 31
        const offsetRight = 45

        const leftX = paddle.position.x + offsetLeft
        // const leftX = paddle.position.x
        const rightX = paddle.position.x + paddle.width + offsetRight
        // const rightX = leftX + paddle.width
        const paddleCoords = {
            topY: paddle.position.y + paddle.height,
            bottomY: paddle.position.y,
            leftX: leftX,
            rightX: rightX,
        }
        return paddleCoords
    }


    setMouseCoordinates(evt: MouseEvent) {
        const canvas = this.game.canvas
        const { left, top } = canvas.getBoundingClientRect()
        const x = evt.clientX - left
        // const x = evt.clientX - canvas.offsetLeft
        const y = evt.clientY - top
        // const y = evt.clientY - canvas.offsetTop
        this.mouseCoordinates = { x, y }
        return this.mouseCoordinates
    }

    /**
     * Handle DragStart
     */
    addMouseDownListener() {
        document.addEventListener('mousedown', (evt) => {
            this.setMouseCoordinates(evt)
            this.draging = true
            // if (this.isIn())
            // {

            //     this.draging = true
            // } else
            // {
            //     this.draging = false
            //     this.paddle.stop()
            // }

        }, false)
    }


    /**
     * 
     * Handle DragStop
     */
    addMouseUpListener() {
        document.addEventListener('mouseup', (evt) => {
            // if (this.draging && this.isIn())
            // {
            //     this.calcMove()

            // } else
            // {
            //     this.mouseCoordinates = { x: 0, y: 0 }
            //     this.draging = false
            //     this.paddle.stop()
            // }
            this.draging = false
            this.setMouseCoordinates(evt)
            // this.mouseCoordinates = { x: 0, y: 0 }
            this.paddle.stop()

        }, false)
    }

    /**
     * handle Drag
     */
    addMouseMoveListener() {
        document.addEventListener('mousemove', (evt) => {
            this.setMouseCoordinates(evt)
            if (this.draging && this.isIn())
            {
                this.calcMove()
            } else
            {

                this.paddle.stop()
            }

        }, false)
    }

    calcMove() {
        const coords = this.mouseCoordinates
        const paddleCoords = this.getPaddleCoords()
        //coords.x >= paddleCoords.leftX && coords.x <= paddleCoords.rightX true
        if (this.draging)
        {

            const toLeft = coords.x < (paddleCoords.leftX + this.paddle.width / 2)
            if (toLeft)
            {
                this.paddle.moveLeft()
            } else
            {
                this.paddle.moveRight()
            }
        } else
        {
            this.paddle.stop()
        }
    }

    isIn() {
        const coords = this.mouseCoordinates
        const mouseObject = {
            height: 1,
            width: 5,
            x: coords.x,
            y: coords.y
        }
        const pObject = {
            height: this.paddle.height,
            width: this.paddle.width,
            x: this.paddle.position.x,
            y: this.paddle.position.y
        }
        const collition = detectCollisionOnObject(mouseObject, pObject,)
        const paddleCoords = this.getPaddleCoords()
        const isInX = coords.x >= paddleCoords.leftX && coords.x <= paddleCoords.rightX
        const isInY = coords.y >= paddleCoords.bottomY && coords.y <= paddleCoords.topY
        console.log(coords, paddleCoords)
        console.log("IS IN X: ", isInX)
        console.log("COLITION: ", collition)
        return isInX && isInY
        // return collition
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