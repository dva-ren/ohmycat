export default class Snow {
  dia: number
  fill: string
  vy: number
  vx: number
  z: number
  y: number
  x: number
  maxDistance: number
  width: number
  height: number

  constructor(width: number, height: number, maxDistance: number) {
    this.x = Math.random() * (width + maxDistance) - maxDistance / 2
    this.y = Math.random() * (height + maxDistance) - maxDistance / 2
    this.maxDistance = maxDistance
    this.width = width
    this.height = height
    this.z = Math.random() * 0.5 + 0.5
    this.vx = (Math.random() * 2 - 0.5) * this.z
    this.vy = (Math.random() * 1.5 + 1.5) * this.z
    this.fill = `rgba(255,255,255,${0.5 * Math.random() + 0.5})`
    this.dia = (Math.random() * 2.5 + 1.5) * this.z
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.strokeStyle = 'transparent'
    ctx.fillStyle = this.fill
    ctx.arc(this.x, this.y, this.dia, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    return this
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x > this.width + this.maxDistance / 2)
      this.x = -(this.maxDistance / 2)

    else if (this.x < -(this.maxDistance / 2))
      this.x = this.width + this.maxDistance / 2

    if (this.y > this.height + this.maxDistance / 2)
      this.y = -(this.maxDistance / 2)

    else if (this.y < -(this.maxDistance / 2))
      this.y = this.height + this.maxDistance / 2
  }
}
