import Game from "./Game"
import GameObject from "./GameObject"

export default class Paddle extends GameObject {
    position: { x: number, y: number }
    width: number
    height: number
    maxSpeed = 7
    speed = 0
    gameWidth: number
    gameHeight: number
    constructor(public game: Game) {
        super()
        this.width = 150
        this.height = 20
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        const middle = this.gameWidth / 2 - this.width / 2

        this.position = {
            x: middle,
            y: this.gameHeight - this.height - 10
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = '#a71414'
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    stop() {
        this.speed = 0
    }
    update(deltaTime: number) {
        // this.position.x += 5 / deltaTime
        this.position.x += this.speed

        //prevent going over the left position
        if (this.position.x < 0) this.position.x = 0

        //prevent going over rigth position
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width
    }

    moveLeft() {
        this.speed = -this.maxSpeed
    }
    moveRight() {
        this.speed = this.maxSpeed

    }
}