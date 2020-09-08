import React from 'react'
import './game.css'
import Game from './game/Game'

//CONFIG
const CANVASWIDTH = 800
const CANVASHEIGHT = 600
const BallImageUrl = "/assets/ball.png"
const BallImageId = 'ball-image'
const BrickImageUrl = "/assets/brick.png"
const BrickImageId = 'brick-image'

interface Props {

}

// function clear(ctx: CanvasRenderingContext2D) {
//     ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
// }

let lastTime = 0
let tick: number | undefined
function cancelTick() {
    if (tick)
    {

        cancelAnimationFrame(tick)
    }
}
function start(ctx: CanvasRenderingContext2D) {
    const game = new Game(CANVASWIDTH, CANVASHEIGHT, BallImageId, BrickImageId)
    cancelTick()
    function gameLoop(timestamp: number) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH)
        game.update(deltaTime)
        game.draw(ctx)
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

const GameComponent = (props: Props) => {
    const CanvasEl = React.useRef<HTMLCanvasElement>(null)

    //MAYBE A REF React.useRef ?
    const [gameInfo, setGameInfo] = React.useState<GameInfo>({
        livesLeft: 5,
        state: "START",
        level: 1,
        totalLevels: 0,
        totalLives: 0
    })

    const Init = React.useCallback(() => {
        const ctx = CanvasEl.current!.getContext('2d')!
        const game = start(ctx)
        game.onChange((updatedGame) => {
            const newInfo: GameInfo = {
                livesLeft: updatedGame.livesLeft,
                state: updatedGame.gameState,
                level: updatedGame.currentLevel,
                totalLevels: updatedGame.totalLevels,
                totalLives: updatedGame.totalGameLives
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
            <canvas id='game-screen' ref={CanvasEl} width={CANVASWIDTH} height={CANVASHEIGHT}>

            </canvas>
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