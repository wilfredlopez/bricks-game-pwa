
interface Positioned {
    x: number, y: number,
}

interface Rectangle {
    x: number,
    y: number,
    width: number,
    height: number
}


interface Circle {
    x: number, y: number, radius: number
}
class CollisionUtils {
    norm(value: number, min: number, max: number) {
        return (value - min) / (max - min)
    }

    lerp(norm: number, min: number, max: number) {
        return (max - min) * norm + min
    }

    map(value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number) {
        return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
    }

    clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
    }

    distance(p0: Positioned, p1: Positioned) {
        let dx = p1.x - p0.x
        let dy = p1.y - p0.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    distanceXY(x0: number, y0: number, x1: number, y1: number) {
        const dx = x1 - x0
        const dy = y1 - y0
        return Math.sqrt(dx * dx + dy * dy)
    }

    circleCollision(c0: Circle, c1: Circle) {
        return this.distance(c0, c1) <= c0.radius + c1.radius
    }

    circlePointCollision(x: number, y: number, circle: Circle) {
        return this.distanceXY(x, y, circle.x, circle.y) < circle.radius
    }

    pointInRect(x: number, y: number, rect: Rectangle) {
        return this.inRange(x, rect.x, rect.x + rect.width) && this.inRange(y, rect.y, rect.y + rect.height)
    }

    inRange(value: number, min: number, max: number) {
        return value >= Math.min(min, max) && value <= Math.max(min, max)
    }

    rangeIntersect(min0: number, max0: number, min1: number, max1: number) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
    }

    rectIntersect(r1: Rectangle, r2: Rectangle) {
        return this
            .rangeIntersect(r1.x, + r1.x + r1.width, r2.x, r2.x + r2.width) &&
            this.rangeIntersect(r1.y, + r1.y + r1.height, r2.y, r2.y + r2.height)
    }
}


const collisionUtils = new CollisionUtils()


export default collisionUtils