import { findDistance } from "../game/detectCollision"
import { TOOLS, ToolType, colors, PainterColorType } from "./constants"
import Fill from "./Fill"
import Point from "./Point"


export default class Painter {

    private _tool: ToolType
    lineWidth: number = 1
    brushWidth = 4
    mouseCoordinates = { x: 0, y: 0 }
    startPosition: Point
    currentPosition: Point
    savedImageData: ImageData
    _color: PainterColorType = colors[0]
    private _undoStack: ImageData[] = []
    undoLimit = 3
    public context: CanvasRenderingContext2D
    constructor(public canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d')!
        this._tool = TOOLS.LINE
        this.startPosition = new Point(this.mouseCoordinates)
        this.currentPosition = new Point(this.mouseCoordinates)
        this.savedImageData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        this.context.strokeStyle = this._color
    }



    set color(c: PainterColorType) {
        this._color = c
        this.context.strokeStyle = c
    }

    get color() {
        return this._color
    }

    set activeTool(t: ToolType) {
        this._tool = t
    }

    get activeTool() {
        return this._tool
    }

    resetCanvas(canvas: HTMLCanvasElement, image: ImageData) {
        this.canvas = canvas
        this.context = this.canvas.getContext("2d")!
        this._undoStack = []
        this.context.putImageData(image, 0, 0)
    }

    public init() {
        // this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.canvas.onmousedown = this.onMouseDown.bind(this)
        this.canvas.ontouchstart = this.onMouseDown.bind(this)

        document.body.style.overflow = 'hidden'
    }
    public undoPaint() {
        if (this._undoStack.length > 0)
        {
            const imagedata = this._undoStack.pop()!
            this.context.putImageData(imagedata, 0, 0)
        }
    }

    private getMouseCoordinates(evt: MouseEvent | TouchEvent) {
        const canvas = this.canvas
        const { left, top } = canvas.getBoundingClientRect()
        let x = 0
        let y = 0
        if (evt instanceof (TouchEvent))
        {

            x = evt.changedTouches[0].clientX || 0
            y = evt.changedTouches[0]?.clientY || 0
        } else
        {
            x = evt.clientX
            y = evt.clientY
        }
        return {
            x: x - left,
            y: y - top
        }

    }

    private setMouseCoords(evt: MouseEvent | TouchEvent) {
        this.mouseCoordinates = this.getMouseCoordinates(evt)
        return this.mouseCoordinates
    }




    private onMouseDown(evt: MouseEvent | TouchEvent) {
        this.savedImageData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        if (this._undoStack.length >= this.undoLimit)
        {
            this._undoStack.shift()
        }
        this._undoStack.push(this.savedImageData)
        this.canvas.onmousemove = this.onMouseMove.bind(this)
        this.canvas.ontouchmove = this.onMouseMove.bind(this)

        document.onmouseup = this.onMouseUp.bind(this)
        document.ontouchend = this.onMouseUp.bind(this)
        this.startPosition = new Point(this.setMouseCoords(evt))
        if (this._tool === TOOLS.PEN || this._tool === TOOLS.BRUSH)
        {
            this.context.beginPath()
            this.context.moveTo(this.startPosition.x, this.startPosition.y)
        } else if (this._tool === TOOLS.BUCKET)
        {
            //fill color
            new Fill(this.canvas, this.startPosition, this.color)
        } else if (this._tool === TOOLS.ERASER)
        {
            this.erase(this.startPosition)
        }
    }

    private onMouseMove(evt: MouseEvent | TouchEvent) {
        this.currentPosition = new Point(this.setMouseCoords(evt))

        this.switchDraw()
    }


    //REMOVE EVENTS
    private onMouseUp(_evt: MouseEvent | TouchEvent) {
        this.canvas.onmousemove = null
        this.canvas.ontouchmove = null
        document.onmouseup = null
        document.ontouchend = null
    }

    private switchDraw() {
        switch (this._tool)
        {
            case TOOLS.LINE:
                this.drawLine()
                break;
            case TOOLS.RECT:
                this.drawRect()
                break;
            case TOOLS.CIRCLE:
                this.drawCircle()
                break;
            case TOOLS.TRIANGLE:
                this.drawTriangle()
                break;
            case TOOLS.PEN:
                this.drawFreeLine()
                break;
            case TOOLS.BRUSH:
                this.drawBrushLine()
                break;
            case TOOLS.ERASER:
                this.erase(this.currentPosition)
                break;
            default:
                break;
        }
    }


    private erase(position: Point, width = this.brushWidth, height = this.brushWidth) {
        this.context.clearRect(position.x, position.y,
            width, height
        )
    }
    private drawBrushLine() {
        const c = this.context
        const cx = this.currentPosition.x
        const cy = this.currentPosition.y
        c.lineWidth = this.brushWidth
        c.lineTo(cx, cy)
        c.stroke()
    }

    private drawFreeLine() {
        const c = this.context
        const cx = this.currentPosition.x
        const cy = this.currentPosition.y
        c.lineWidth = this.lineWidth
        c.lineTo(cx, cy)
        c.stroke()
    }
    private drawTriangle() {
        const c = this.context
        c.putImageData(this.savedImageData, 0, 0)
        c.beginPath()
        c.lineWidth = this.lineWidth
        const sx = this.startPosition.x
        const sy = this.startPosition.y
        const cx = this.currentPosition.x
        const cy = this.currentPosition.y
        c.moveTo(sx + (cx - sx) / 2, sy)
        c.lineTo(sx, cy)
        c.lineTo(cx, cy)
        c.closePath()
        c.stroke()
    }

    private drawCircle() {
        const c = this.context
        c.putImageData(this.savedImageData, 0, 0)
        c.lineWidth = this.lineWidth
        c.beginPath()
        const sx = this.startPosition.x
        const sy = this.startPosition.y
        const distance = findDistance(this.startPosition, this.currentPosition)
        c.arc(sx, sy, distance, 0, 2 * Math.PI)
        c.stroke()
    }

    private drawLine() {
        const c = this.context
        c.putImageData(this.savedImageData, 0, 0)
        c.beginPath()
        c.lineWidth = this.lineWidth
        const sx = this.startPosition.x
        const sy = this.startPosition.y
        const x = this.currentPosition.x
        const y = this.currentPosition.y
        c.moveTo(sx, sy)
        c.lineTo(x, y)
        c.stroke()
    }
    private drawRect() {
        const c = this.context
        c.putImageData(this.savedImageData, 0, 0)
        c.beginPath()
        c.lineWidth = this.lineWidth
        const sx = this.startPosition.x
        const sy = this.startPosition.y
        const x = this.currentPosition.x
        const y = this.currentPosition.y
        c.rect(sx, sy, x - sx, y - sy)
        c.stroke()
    }


}