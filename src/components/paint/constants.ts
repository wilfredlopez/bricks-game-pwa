import { FaUndo, FaDownload, FaPen, FaEraser, FaPaintBrush } from 'react-icons/fa';
import { AiOutlineLine } from 'react-icons/ai'
import { FiTriangle, FiSquare, FiCircle } from 'react-icons/fi'
// import { GiPaintBucket } from 'react-icons/all'
import { GiPaintBucket } from 'react-icons/gi'
import { IconType } from 'react-icons/lib';
export const TOOLS = {
    UNDO: 'undo',
    DOWNLOAD: 'download',
    LINE: 'line',
    RECT: 'rectangle',
    TRIANGLE: 'triangle',
    CIRCLE: 'circle',
    PEN: 'pen',
    BRUSH: 'brush',
    BUCKET: 'paint-bucket',
    ERASER: 'eraser'
} as const
export const colors = ['#000000', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#0000ff', '#00ffff', '#FFC300', '#FF5733', '#FA8072', '#92B5A9', '#495D63', '#42213D', '#C2C1C2'] as const


export type PainterColorType = typeof colors[number]
export type ToolType = typeof TOOLS[keyof typeof TOOLS]

export const COMMAND_ICONS: Record<ToolType, IconType> = {
    [TOOLS.UNDO]: FaUndo,
    [TOOLS.DOWNLOAD]: FaDownload,
    [TOOLS.LINE]: AiOutlineLine,
    [TOOLS.RECT]: FiSquare,
    [TOOLS.TRIANGLE]: FiTriangle,
    [TOOLS.CIRCLE]: FiCircle,
    [TOOLS.PEN]: FaPen,
    [TOOLS.BRUSH]: FaPaintBrush,
    [TOOLS.BUCKET]: GiPaintBucket,
    [TOOLS.ERASER]: FaEraser
}


export const COMMAND = {
    'line': [TOOLS.LINE,
    TOOLS.RECT, TOOLS.TRIANGLE,
    TOOLS.CIRCLE, TOOLS.PEN],
    'brush': [TOOLS.BRUSH,],
    'other': [TOOLS.UNDO, TOOLS.DOWNLOAD, TOOLS.BUCKET, TOOLS.ERASER]
}
