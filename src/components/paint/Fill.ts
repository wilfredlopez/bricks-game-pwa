import Point from "./Point";
export type RGBAArray = [r: number, g: number, b: number, a: number]

export default class Fill {
    context: CanvasRenderingContext2D
    imageData: ImageData
    fillStack: [point: Point, targetColor: RGBAArray, fillColor: RGBAArray][] = []
    constructor(public canvas: HTMLCanvasElement, point: Point, color: string) {
        this.context = canvas.getContext('2d')!
        this.imageData = this.context.getImageData(0, 0,
            this.context.canvas.width,
            this.context.canvas.height)
        point = this.normalizePoint(point)
        const targetColor = this.getPixel(point)
        const fillColor = this.hexToRgba(color)
        this.floorFill(point, targetColor, fillColor)
        this.fillColor()
    }

    normalizePoint(p: Point) {
        return new Point({ x: Math.round(p.x), y: Math.round(p.y) })
    }

    hexToRgba(hex: string): RGBAArray {

        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

        const result = regex.exec(hex)

        if (!result)
        {
            return [-1, -1, -1, -1]
        }
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255,
        ]
    }

    floorFill(point: Point, targetColor: RGBAArray, fillColor: RGBAArray) {
        if (this.isSameColor(targetColor, fillColor))
        {
            return
        }
        const currentColor = this.getPixel(point)
        if (this.isSameColor(currentColor, targetColor))
        {
            this.setPixel(point, fillColor) //replace color

            const pRight = new Point({ x: point.x + 1, y: point.y })
            const pLeft = new Point({ x: point.x - 1, y: point.y })
            const pTop = new Point({ x: point.x, y: point.y - 1 })
            const pBottom = new Point({ x: point.x, y: point.y + 1 })
            this.fillStack.push([
                pRight,
                targetColor,
                fillColor])
            this.fillStack.push([
                pLeft,
                targetColor,
                fillColor])
            this.fillStack.push([
                pTop,
                targetColor,
                fillColor])
            this.fillStack.push([
                pBottom,
                targetColor,
                fillColor])
        } else
        {
            return
        }
    }


    fillColor() {
        if (this.fillStack.length)
        {
            let range = this.fillStack.length
            for (let i = 0; i < range; i++)
            {
                const [point, targetColor, fillColor] = this.fillStack[i]
                this.floorFill(point, targetColor, fillColor)
            }
            this.fillStack.splice(0, range)
            this.fillColor()
        } else
        {
            this.context.putImageData(this.imageData, 0, 0)
            this.fillStack = []
        }
    }

    isSameColor(targetColor: RGBAArray, fillColor: RGBAArray) {
        return targetColor[0] === fillColor[0] &&
            targetColor[1] === fillColor[1] &&
            targetColor[2] === fillColor[2]
            &&
            targetColor[3] === fillColor[3]
    }


    setPixel(point: Point, fillColor: RGBAArray) {
        const offset = (point.y * this.imageData.width + point.x) * 4
        this.imageData.data[offset + 0] = fillColor[0] //red
        this.imageData.data[offset + 1] = fillColor[1] // green
        this.imageData.data[offset + 2] = fillColor[2] //blue
        this.imageData.data[offset + 3] = fillColor[3] //alpha
    }

    getPixel(point: Point): RGBAArray {
        if (point.x < 0 || point.y < 0 || point.x >= this.context.canvas.width || point.y >= this.context.canvas.height)
        {
            return [-1, -1, -1, -1]//null color
        }
        const offset = (point.y * this.imageData.width + point.x) * 4
        return [
            this.imageData.data[offset + 0],
            this.imageData.data[offset + 1],
            this.imageData.data[offset + 2],
            this.imageData.data[offset + 3]
        ]

    }
}