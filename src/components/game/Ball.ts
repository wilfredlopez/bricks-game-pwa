import detectCollision from "./detectCollision"
import Game from "./Game"
import GameObject from "./GameObject"

export default class Ball extends GameObject {
    image: HTMLImageElement
    speed = { x: 2, y: -2 }
    position = { x: 10, y: 400 }
    width = 16
    height = 16
    size = this.width
    ballImageId: string
    gameWidth: number
    gameHeight: number
    levelSpeed = 3
    speedIncrementor = 0.8
    constructor(public game: Game) {
        super()
        this.ballImageId = game.BallImageId
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.image = document.getElementById(this.ballImageId) as HTMLImageElement
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    reset(speed = this.levelSpeed) {
        this.speed = { x: speed, y: -1 }
        this.position = { x: this.gameWidth - this.width - 2, y: this.gameHeight - this.height - 2 }
    }

    update(deltatime: number) {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        //left or right wall
        if (this.position.x + this.width > this.gameWidth || this.position.x < 0)
        {
            this.speed.x = -this.speed.x
        }
        //top wall
        if (this.position.y < 0)
        {
            this.speed.y = -this.speed.y
        }

        //bottom of wall
        if (this.position.y + this.height > this.gameHeight)
        {
            // this.speed.y = -this.speed.y
            this.game.lives--
            this.reset()
        }

        //paddle collision
        if (detectCollision(this, this.game.paddle!))
        {
            this.speed.y = -this.speed.y
            this.position.y = (this.game.paddle?.position.y || 0) - this.size
        }
    }
}