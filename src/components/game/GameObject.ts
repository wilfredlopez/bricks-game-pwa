export default abstract class GameObject {
    abstract update(deltaTime: number): void
    abstract draw(ctx: CanvasRenderingContext2D): void
    abstract position: {
        x: number,
        y: number
    }
    abstract width: number
    abstract height: number
    // markedForDeletion?: boolean

}