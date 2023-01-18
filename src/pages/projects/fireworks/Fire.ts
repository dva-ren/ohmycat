export class Fire {
  private speed: number
  private radius: number
  size: number
  hue: number
  brightness: number
  alpha: number
  state: 'up' | 'boom' = 'up'
  constructor(public x: number, public y: number, public radian: number, public h: number, public height: number) {
    this.speed = (Math.random() * 5) + 0.4
    this.radius = this.speed
    this.size = 1
    const hue = Math.floor(Math.random() * h)
    const hueVariance = 40
    this.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance)
    this.brightness = Math.floor(Math.random() * 31) + 50
    this.alpha = (Math.floor(Math.random() * 61) + 40) / 100
  }

  move() {
    if (this.state === 'boom') {
      this.x = this.x + Math.cos(this.radian) * this.radius
      this.y = this.y + Math.sin(this.radian) * this.radius + 0.4
      this.radius *= 1 - this.speed / 100
      this.alpha -= 0.005
    }
    else {
      if (this.y > this.height) {
        this.y -= 10
      }
      else {
        this.state = 'boom'
        this.size = Math.floor(Math.random() * 2) + 1
      }
    }
  }
}

export class Fires {
  points: Fire[] = []
  private canvas: HTMLCanvasElement
  public count: number
  constructor(canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D, startX: number, startY: number, count: number, size: number) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.count = count
    for (let i = 0; i < count; i++)
      this.points.push(new Fire(startX, canvas.height, Math.PI * 2 * (i / count), Math.random() * 100, startY))
  }

  clearCanvas() {
    this.ctx.fillStyle = '#00000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    // this.clearCanvas()
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
      this.ctx.fillStyle = `hsla(${p.hue}, 100%,${p.brightness}%, ${p.alpha})`
      this.ctx.fill()
      this.ctx.closePath()
      this.points[i].move()
      if (p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height || p.alpha <= 0)
        this.points.splice(i, 1)
    }
  }
}
