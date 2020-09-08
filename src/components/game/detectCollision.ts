import GameObject from "./GameObject"

export default function detectCollision(ballOrBrick: GameObject, gameObject: GameObject) {

    //paddle collition
    const bottomOfBall = ballOrBrick.position.y + ballOrBrick.height
    const topOfBall = ballOrBrick.position.y

    const topOfObject = gameObject.position.y || 0
    const leftSideOfObject = gameObject.position.x || 0
    const rightSideOfObject = leftSideOfObject + (gameObject.width || 0)
    const bottomOfObject = gameObject.position.y + gameObject.height


    if (
        bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ballOrBrick.position.x >= leftSideOfObject &&
        ballOrBrick.position.x + ballOrBrick.width <= rightSideOfObject)
    {
        return true
    }
    return false
}