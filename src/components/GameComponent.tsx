import React from 'react'
import './game.css'
import Game, { GAMESTATES } from './game/Game'

//CONFIG

let CANVASWIDTH = getWidth()

const CANVASHEIGHT = 600
const BallImageUrl = "/assets/ball.png"
const BallImageId = 'ball-image'
const BrickImageUrl = "/assets/brick.png"
const BrickImageId = 'brick-image'

function getWidth() {
    const cw = document.body.clientWidth
    return Math.min(cw, 800)
}

interface Props {

}

let lastTime = 0
let tick: number | undefined
function cancelTick() {
    if (tick)
    {

        cancelAnimationFrame(tick)
    }
}
let game: Game | undefined = undefined




function start(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    document.addEventListener('resize', () => {
        CANVASWIDTH = getWidth()
    })
    game = new Game(canvas, CANVASWIDTH, CANVASHEIGHT, BallImageId, BrickImageId)

    cancelTick()
    function gameLoop(timestamp: number) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
        game!.update(deltaTime)
        game!.draw(ctx)
        tick = requestAnimationFrame(gameLoop)
    }
    tick = requestAnimationFrame(gameLoop)
    return game
}



const ImageStyle = {
    display: 'none'
}



interface GameInfo {
    livesLeft: number,
    totalLives: number
    state: string
    level: number
    totalLevels: number
    isStarted: boolean
}


function shouldRerenderGameInfo(currentInfo: GameInfo, newInfo: GameInfo) {

    for (let key of Object.keys(currentInfo))
    {
        if (currentInfo[key as keyof GameInfo] !== newInfo[key as keyof GameInfo])
        {
            return true
        }
    }


    return false
}

const DEFAULT_GAME_INFO: GameInfo = {
    livesLeft: 5,
    state: GAMESTATES.MENU,
    level: 1,
    totalLevels: 0,
    totalLives: 0,
    isStarted: false
}


const CanvasStyles = {
    border: '1px solid #928c8c',
    margin: '0 auto',
    width: CANVASWIDTH,
    height: CANVASHEIGHT,
    background: 'white'
}

function handleStart() {
    if (game)
    {
        game.start()
    }
}
function handlePause() {
    if (game)
    {
        game.togglePause()
    }
}






const GameComponent = (props: Props) => {
    const CanvasEl = React.useRef<HTMLCanvasElement>(null)

    const [i, s] = React.useState<GameInfo>(DEFAULT_GAME_INFO)
    const { gameInfo, setGameInfo } = React.useMemo(() =>
        ({
            gameInfo: i,
            setGameInfo: s
        })
        , [
            i, s
        ])

    const Init = React.useCallback(() => {
        const ctx = CanvasEl.current!.getContext('2d')!
        const game = start(ctx, CanvasEl.current!)

        game.onChange((updatedGame) => {
            const newInfo: GameInfo = {
                livesLeft: updatedGame.livesLeft,
                state: updatedGame.gameState,
                level: updatedGame.currentLevel,
                totalLevels: updatedGame.totalLevels,
                totalLives: updatedGame.totalGameLives,
                isStarted: updatedGame.isStarted
            }
            if (shouldRerenderGameInfo(gameInfo, newInfo))
            {
                setGameInfo(() => (newInfo))
            }
        })
        //eslint-disable-next-line
    }, [])


    React.useLayoutEffect(() => {
        Init()
        //eslint-disable-next-line
    }, [])





    return (
        <>
            <div>
                <h1 className="game-title">Bricks Game</h1>
                <div className="game-info-container">
                    <div
                        className="game-info-bar"
                        style={{
                            display: 'flex',
                            justifyContent: "space-between"
                            , padding: '0 23px'
                        }}>
                        <p><b>Game State:</b> {gameInfo.state[0] + gameInfo.state.slice(1).toLowerCase()}</p>
                        <p>Lives Left: {gameInfo.livesLeft}/{gameInfo.totalLives}</p>
                        <p>Level: {gameInfo.level}/{gameInfo.totalLevels}</p>
                    </div>
                </div>
            </div>
            <img src={BallImageUrl} id={BallImageId} style={ImageStyle} aria-hidden="true" alt="ball" />
            <img src={BrickImageUrl} id={BrickImageId} style={ImageStyle} aria-hidden="true" alt="brick" />
            <div id="canvas-container">

                <canvas
                    ref={CanvasEl}
                    width={CANVASWIDTH}
                    height={CANVASHEIGHT}
                    style={CanvasStyles}
                >

                </canvas>
            </div>
            <div className="controls">

                <button className="btn start" onClick={handleStart} disabled={gameInfo.isStarted}>Start Game</button>
                <button className="btn pause" onClick={handlePause} disabled={gameInfo.state === GAMESTATES.MENU}>Toggle Pause</button>
            </div>
            <div className="key-shortcuts-info">
                <h5>KEYBOARD SHORTCUTS</h5>
                <ShortCutItem shortcut="ENTER or 1" description={'Start Game'} />
                <ShortCutItem shortcut="Left Arrow or a" description={'Go left'} />
                <ShortCutItem shortcut="Right Arrow or s" description={'Go Right.'} />
                <ShortCutItem shortcut="ESC or SPACEBAR" description={'Pause/UnPause'} />
                <ShortCutItem shortcut="R" description={'Restart Game'} />
            </div>
            <br />
            <br />
            <br />
        </>
    )
}


function ShortCutItem({ shortcut, description }: { shortcut: string, description: string }) {

    return <div className="shortcut-item">
        <p className="left-s">
            {shortcut}
        </p>
        <p className="equal-s">
            {" "} ={" "}
        </p>
        <p className="right-s">
            {description}
        </p>
    </div>
}

export default GameComponent