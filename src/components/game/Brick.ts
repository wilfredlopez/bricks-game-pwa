import detectCollision from "./detectCollision";
import Game from "./Game";
import GameObject from "./GameObject";

export default class Brick extends GameObject {
    static BrickWidth = 80
    static BrickHeight = 24
    image: HTMLImageElement
    imageId: string
    gameWidth: number
    gameHeight: number
    // speed = { x: 2, y: 2 }
    // position = { x: 10, y: 10 }
    width = Brick.BrickWidth
    height = Brick.BrickHeight
    size = this.width
    markedForDeletion = false
    constructor(public game: Game, public position = { x: 10, y: 10 }) {
        super()
        this.imageId = game.BrickImageId
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.image = document.getElementById(this.imageId) as HTMLImageElement
    }

    /**
     * 
     * @param _ deltaTime
     */
    update(_: number) {
        if (detectCollision(this.game.ball!, this))
        {
            this.game.ball!.speed.y = - this.game.ball!.speed.y
            this.markedForDeletion = true
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}