// import p5, { Vector } from 'p5'
// import P5 from './p5Instance'


// const CANVASWIDTH = 800
// const CANVASHEIGHT = 600
// const particles: Particle[] = []

// P5.setup = () => {
//     P5.createCanvas(CANVASWIDTH, CANVASHEIGHT)
//     for (let i = 0; i < 50; i++)
//     {
//         particles.push(new Particle(P5))
//     }
// }

// P5.draw = () => {
//     P5.background(55, 55, 55)
//     particles.forEach((p, index) => {
//         p.update()
//         p.draw()
//         p.checkParticules(particles.slice(index))
//     })
// }


// export class Particle {
//     position: Vector
//     size = 10
//     gameHeight: number
//     velosity: Vector
//     gameWidth: number
//     instance: p5
//     constructor(instance: p5) {
//         this.instance = instance
//         const width = instance.random(CANVASWIDTH)
//         const height = instance.random(CANVASHEIGHT)
//         this.position = instance.createVector(width, height)
//         this.gameWidth = CANVASWIDTH
//         this.gameHeight = CANVASHEIGHT
//         this.velosity = instance.createVector(instance.random(-2, 2), instance.random(-2, 2))
//     }

//     update() {
//         this.position.add(this.velosity)
//         this.edges()
//     }

//     draw() {
//         this.instance.noStroke()
//         this.instance.fill('rgba(255,255,255,0.5')
//         this.instance.circle(this.position.x, this.position.y, this.size)
//     }

//     edges() {
//         if (this.position.x < 0 || this.position.x > this.gameWidth)
//         {
//             this.velosity.x *= -1
//         }

//         if (this.position.y < 0 || this.position.y < this.gameHeight)
//         {
//             this.velosity.y *= -1
//         }
//     }
//     checkParticules(particules: Particle[]) {
//         for (let p of particles)
//         {
//             const d = this.instance.dist(this.position.x, this.position.y, p.position.x, p.position.y)

//             if (d < 120)
//             {
//                 this.instance.stroke('rgba(255,255,255,0.1)')
//                 this.instance.line(this.position.x, this.position.y, p.position.x, p.position.y)
//             }
//         }
//     }
// }

export { }