export function adaptDPR(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) { // 在初始化 canvas 的时候就要调用该方法
  const dpr = window.devicePixelRatio
  const { width, height } = canvas
  // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作
  ctx.scale(dpr, dpr)
  // 接下来的绘制操作和往常一样，比如画个矩形 ctx2d.strokeRect(x, y, w, h);原来该怎么算就怎么算，该怎么调用还是怎么调用
}
