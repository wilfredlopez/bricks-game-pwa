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


interface PositionObject {
    x: number, y: number, height: number, width: number
}
export function detectCollisionOnObject(objectToCheck: PositionObject, paddleOrObject: PositionObject) {

    //Object collition

    //TOP
    const bottom = objectToCheck.y + objectToCheck.height
    const top = objectToCheck.y
    const topOfObject = paddleOrObject.y
    const bottomOfObject = paddleOrObject.y + paddleOrObject.height

    //LEFT/RIGHT
    const leftSideOfObject = paddleOrObject.x
    const rightSideOfObject = paddleOrObject.x + paddleOrObject.width


    if (
        bottom >= topOfObject &&
        top <= bottomOfObject &&
        objectToCheck.x >= leftSideOfObject &&
        objectToCheck.x + objectToCheck.width <= rightSideOfObject)
    {
        return true
    }
    return false
}