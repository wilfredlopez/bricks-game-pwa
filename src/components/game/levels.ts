import Brick from "./Brick"
import Game from "./Game"

export type Level = [number, number, number, number, number, number, number, number, number, number]

export function buildLevel(game: Game, levels: Level[]) {
    const bricks: Brick[] = []
    levels.forEach((row, rowIndex) => {
        row.forEach((n, nIndex) => {
            if (n === 1)
            {
                let position = {
                    x: Brick.BrickWidth * nIndex,
                    y: 75 + Brick.BrickHeight * rowIndex
                }
                bricks.push(new Brick(game, position))
            }
        })
    })
    return bricks
}



export const level0: Level[] = [
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
]

export const level1: Level[] = [
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
]

export const level2: Level[] = [
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export const level3: Level[] = [
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]