import React from 'react'
import Painter from './Painter'
import './painter.css'
import { COMMAND, ToolType, TOOLS, COMMAND_ICONS, colors, PainterColorType } from './constants'
interface Props { }

//CONFIG
let CANVASWIDTH = getWidth()
const CANVASHEIGHT = 480

function getWidth() {
    const cw = document.body.clientWidth
    return Math.min(cw, 640)
}

let painter: Painter | undefined = undefined
let oldWidth = CANVASWIDTH

const Canvas = document.createElement('canvas')
Canvas.id = "paint-canvas"
Canvas.width = CANVASWIDTH
Canvas.height = CANVASHEIGHT

const CanvasEl = {
    current: Canvas
}

function downloadToFile() {
    const url = CanvasEl.current.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream')
    const random = (Math.random() * Math.random() % 100).toString().replace("0.", "")
    const filename = `canvas-image-${random}.png`
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
    }, 0);
}


function start() {
    document.body.appendChild(Canvas)
    window.addEventListener('resize', () => {
        CANVASWIDTH = getWidth()
        if (painter && CANVASWIDTH !== oldWidth)
        {
            const image = Canvas.getContext('2d')!.getImageData(0, 0, Canvas.clientWidth, Canvas.clientHeight)
            document.body.removeChild(Canvas)
            Canvas.width = CANVASWIDTH
            document.body.appendChild(Canvas)
            painter.resetCanvas(Canvas, image)
        }
        oldWidth = CANVASWIDTH
    })
    painter = new Painter(Canvas)
    return painter
}

function removeCanvas() {
    document.body.removeChild(Canvas)
}

function Init() {
    const painer = start()
    painer.init()
}

const totalLines = Array.from({ length: 5 })
function getCommandClass(command: ToolType, activeTool: ToolType) {
    return activeTool === command ? "item active" : "item"
}

export const PaintComponent = (props: Props) => {
    // const CanvasEl = React.useRef<HTMLCanvasElement>(null)
    const [activeLine, setActiveLine] = React.useState(1)
    const [activeBrushLine, setActiveBrushLine] = React.useState(4)
    const [activeColor, setActiveColor] = React.useState<PainterColorType>(colors[0])
    const [showLines, setShowLines] = React.useState(true)
    const [showGroupLines, setShowGroupLines] = React.useState(false)
    const [activeTool, setActiveTool] = React.useState<ToolType>(TOOLS.LINE)

    React.useLayoutEffect(() => {
        Init()
        return () => removeCanvas()
        //eslint-disable-next-line
    }, [])


    function handleLinesClick(pixels: number) {
        setActiveLine(pixels)
        if (painter)
        {
            painter.lineWidth = pixels
        }
    }

    function handleBrushLinesClick(pixels: number) {
        setActiveBrushLine(pixels)
        if (painter)
        {
            painter.brushWidth = pixels
        }
    }

    function handleComandClick(tool: ToolType) {
        setActiveTool(tool)
        if (painter)
        {
            painter.activeTool = tool
        }
        if (tool === TOOLS.BRUSH || tool === TOOLS.ERASER)
        {
            setShowGroupLines(true)
            setShowLines(false)
        } if (tool === TOOLS.UNDO)
        {
            if (painter)
            {
                painter.undoPaint()
            }
        } if (tool === TOOLS.DOWNLOAD)
        {
            downloadToFile()
        }
        else if (COMMAND['line'].includes(tool as any))
        {
            setShowLines(true)
            setShowGroupLines(false)
        } else
        {
            setShowLines(false)
            setShowGroupLines(false)
        }
    }

    function handleColorClick(color: PainterColorType) {
        setActiveColor(color)
        if (painter)
        {
            painter.color = color
        }
    }


    const brushLines = getBrushLines(activeBrushLine, handleBrushLinesClick)
    const commands = getCommands(activeTool, getCommandClass, handleComandClick)

    return (
        <section>
            <div className="toolbox toolbox-left">
                <div className="group commands">
                    {commands}
                </div>
                <div className="group shapes">

                </div>
                <div className="group tools">
                    <div className="group linewidths"
                        style={{
                            display: showLines ? 'block' : "none"
                        }}
                    >
                        {totalLines.map((_, i) => {
                            return <LineComp
                                key={i + 'lines' + i + 1}
                                active={(i + 1) === activeLine} i={i + 1}
                                handleLinesClick={handleLinesClick} />
                        })}
                    </div>
                    <div className="group linewidths" style={{
                        display: showGroupLines ? 'block' : "none"
                    }}>
                        {brushLines}
                    </div>

                </div>

            </div>
            {/* <canvas id="paint-canvas" ref={CanvasEl} width={CANVASWIDTH} height={CANVASHEIGHT}></canvas> */}
            <div className="toolbox toolbox-right">
                <div className="group swatches">
                    {colors.map(color => {
                        return <SwatcheComp key={"color-" + color + '-swatch'}
                            color={color}
                            handleColorClick={handleColorClick}
                            active={activeColor === color} />
                    })}
                </div>
            </div>
        </section>
    )
}



function getBrushLines(activeBrushLine: number, handleBrushLinesClick: (i: number) => void, { total = 13, start = 4, increment = 2 } = {}) {

    const brushLines: JSX.Element[] = []

    for (let i = start; i <= total; i += increment)
    {

        const el = <div
            key={i + 'brushlines'}
            className={`item ${i === activeBrushLine ? "active" : ""}`}
            data-brush-width={i} title={`${i} pixel`}
            onClick={() => {
                handleBrushLinesClick(i)
            }}
        >
            <span className="linewidth" style={{ width: i, height: i }} />
        </div>
        brushLines.push(el)
    }
    return brushLines
}


function getCommands(activeTool: ToolType, getCommandClass: (key: ToolType, activeTool: ToolType) => string, handleComandClick: (key: ToolType) => void) {
    const commands: JSX.Element[] = []

    for (let [key, Icon] of Object.entries(COMMAND_ICONS))
    {
        commands.push(<Icon
            key={"icon-command" + key}
            className={getCommandClass(key as ToolType, activeTool)}
            data-command={key}
            title={key}
            onClick={() => handleComandClick(key as ToolType)}
        />)
    }
    return commands
}



const SwatcheComp = React.memo(function SwatcheComp({ handleColorClick, active, color }: { handleColorClick: (color: PainterColorType) => void, color: PainterColorType, active: boolean }) {
    return <div
        className={`item ${active ? 'active' : ""}`}
        onClick={() => {
            handleColorClick(color)
        }}
        data-color={color}>
        <div className="swatch" style={{
            backgroundColor: color
        }} />
    </div>
}
)




function LineComp({ active, i, handleLinesClick }: { i: number, active: boolean, handleLinesClick: (i: number) => void }) {
    return <div
        className={`item ${active ? "active" : ""}`}
        data-line-width={i} title={`${i} pixel`}
        onClick={() => {
            handleLinesClick(i)
        }}
    >
        <span className="linewidth" style={{ width: i, height: i }} />
    </div>
}