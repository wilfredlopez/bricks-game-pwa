import { throttle } from '@wilfredlopez/react-utils'
import Ball from "./Ball"
import Brick from "./Brick"
import GameObject from "./GameObject"
import InputHandler from "./InputHandler"
import Paddle from "./Paddle"
import { buildLevel, level0, Level, level1, level2, level3 } from './levels'


export const GAMESTATES = {
    PAUSED: 'PAUSED',
    RUNNING: 'PLAYING',
    MENU: 'WAITING',
    GAMEOVER: 'GAMEOVER',
    NEWLEVEL: 'NEW LEVEL'
} as const

const FONT_FAMILY = 'Press Start 2P'

const FONT_SIZE_LG = 25
const FONT_SIZE_MD = 18

export type GameState = typeof GAMESTATES[keyof typeof GAMESTATES]

export default class Game {
    private gameObjects: GameObject[] = []
    private _gameState: GameState
    private _levels: Array<Level[]>
    private _currentLevel = 0
    private _outcome = "YOU LOST"
    private _eventListeners: Array<(game: this) => void> = []
    ball: Ball
    paddle: Paddle
    bricks: Brick[]
    lives: number
    constructor(public canvas: HTMLCanvasElement, public gameWidth: number, public gameHeight: number, public BallImageId: string, public BrickImageId: string) {
        this.bricks = []
        this._gameState = GAMESTATES.MENU
        this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        this.lives = this.totalGameLives
        this._levels = [level0, level1, level2, level3]
        new InputHandler(this, this.paddle)
    }


    get isStarted() {
        return this.gameState !== GAMESTATES.MENU
    }

    get isActive() {
        return this.gameState !== GAMESTATES.MENU && this.gameState !== GAMESTATES.PAUSED && this.gameState !== GAMESTATES.GAMEOVER
    }

    get currentLevel() {
        return this._currentLevel + 1
    }
    get totalLevels() {
        return this._levels.length
    }

    get totalGameLives() {
        return 5
    }

    get gameState() {
        return this._gameState
    }

    get livesLeft() {
        return this.lives
    }


    onChange(callback: (game: this) => void) {
        this._eventListeners.push(callback)
    }

    private _callEvents = throttle(() => {
        for (let listener of this._eventListeners)
        {
            listener(this)
        }
    }, 100, this)





    restart() {
        this._currentLevel = 0
        this._outcome = "YOU LOST"
        this.bricks = []
        this._gameState = GAMESTATES.MENU
        this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        this.lives = this.totalGameLives
        this.start()
    }

    start() {
        if (this._gameState !== GAMESTATES.MENU && this._gameState !== GAMESTATES.NEWLEVEL) return
        const level = this._levels[this._currentLevel]
        if (!level)
        {
            this._gameState = GAMESTATES.GAMEOVER
            this._outcome = 'YOU WIN!'
            return
        }
        this.bricks = buildLevel(this, level)
        this.ball.levelSpeed += this.ball.speedIncrementor
        this.ball.reset()
        this.gameObjects = [this.paddle, this.ball]
        this._gameState = GAMESTATES.RUNNING
    }


    update(deltaTime: number) {
        if (this.isActive)
        {

            this._callEvents()
        }
        if (this.lives === 0) this._gameState = GAMESTATES.GAMEOVER
        if (this._gameState === GAMESTATES.PAUSED ||
            this._gameState === GAMESTATES.MENU ||
            this._gameState === GAMESTATES.GAMEOVER
        )
        {
            return
        }

        if (this.bricks.length === 0)
        {
            this._currentLevel++
            this._gameState = GAMESTATES.NEWLEVEL
            this.start()
        }


        for (let gameObject of [...this.gameObjects, ...this.bricks])
        {
            gameObject.update(deltaTime)
        }
        this.bricks = this.bricks.filter(obj => !obj.markedForDeletion)
    }

    togglePause() {
        if (this._gameState === GAMESTATES.MENU) return
        if (this._gameState === GAMESTATES.PAUSED)
        {
            this._gameState = GAMESTATES.RUNNING
        } else
        {
            this._gameState = GAMESTATES.PAUSED
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        for (let gameObject of [...this.gameObjects, ...this.bricks])
        {
            gameObject.draw(ctx)
        }
        if (this._gameState === GAMESTATES.PAUSED)
        {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.fill()
            ctx.font = `${FONT_SIZE_LG}px '${FONT_FAMILY}'`
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2)
        }
        if (this._gameState === GAMESTATES.MENU)
        {

            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()
            ctx.font = `${FONT_SIZE_LG}px '${FONT_FAMILY}'`
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText('Press ENTER or 1 To Start', this.gameWidth / 2, this.gameHeight / 2)
        }
        if (this._gameState === GAMESTATES.GAMEOVER)
        {

            const color = this._outcome.toLowerCase().includes('win') ? 'rgba(0,220,0,1)' : 'rgba(225,0,0,1)'
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = color
            ctx.fill()
            ctx.font = `${FONT_SIZE_LG}px '${FONT_FAMILY}'`
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            const middleX = this.gameWidth / 2
            const middleY = this.gameHeight / 2
            ctx.fillText(`GAMEOVER ${this._outcome}.`, middleX, middleY)
            ctx.font = `${FONT_SIZE_MD}px '${FONT_FAMILY}'`
            ctx.fillText(`Press R (shift + r) to restart`, middleX, middleY + 50)
        }
    }


}