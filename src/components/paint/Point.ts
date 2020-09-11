
export default class Point {

    position = { x: 0, y: 0 }
    constructor(position: { x: number, y: number }) {
        // this.position = position
        this.position = {
            x: Math.round(position.x),
            y: Math.round(position.y)
        }
    }
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
    // draw(ctx: CanvasRenderingContext2D) { }

    // update(deltaTime: number) { }
}