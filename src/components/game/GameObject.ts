import collisionUtils from "./collisionUtils"

export default abstract class GameObject {
    abstract update(deltaTime: number): void
    abstract draw(ctx: CanvasRenderingContext2D): void
    abstract position: {
        x: number,
        y: number
    }
    abstract width: number
    abstract height: number

    get x() {
        return this.position.x
    }

    get y() {
        return this.position.y
    }

    set y(y: number) {
        this.position.y = y
    }

    set x(x: number) {
        this.position.x = x
    }

    isInside(object: { x: number, y: number, height?: number, width?: number }) {
        const inrect = collisionUtils
            .rectIntersect(
                {
                    x: object.x,
                    y: object.y,
                    // height: 2,
                    height: object.height || 20, //giving room
                    width: object.width || 4
                },
                this)

        return inrect
    }
    // markedForDeletion?: boolean
    isLeftOrRightWall(gameWidth: number) {
        //left or right wall
        if (this.isRightWall(gameWidth) || this.isLeftWall())
        {
            return true
        }
        return false
    }

    isTopOrBottomWall(gameHeight: number) {
        if (this.isTopWall() || this.isBottomWall(gameHeight))
        {
            return true
        } else
        {
            return false
        }
    }

    isRightWall(gameWidth: number) {
        if (this.position.x + this.width >= gameWidth)
        {
            return true
        }
        return false
    }

    isLeftWall() {
        //left wall
        if (this.position.x <= 0)
        {
            return true
        }
        return false
    }

    isTopWall() {
        //top wall
        if (this.position.y <= 0)
        {
            return true
        } else
        {
            return false
        }

    }
    isBottomWall(gameHeight: number) {
        //bottom of wall
        if (this.position.y + this.height >= gameHeight)
        {
            return true
        }
        return false
    }
}