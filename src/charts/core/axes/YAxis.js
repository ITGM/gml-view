import G_Axis from './Axis.js'

// Y 轴类
class G_YAxis extends G_Axis {
  constructor(canvas, options = {}) {
    super(canvas, {
      tickCount: 5,
      ...options,
    })
  }

  // 绘制 Y 轴
  render() {
    if (this.data.length === 0) return

    this.clear()

    const { width, height, padding, tickCount } = this.options
    const ctx = this.ctx

    // 计算价格范围
    const prices = this.data.flatMap((d) => [d.open, d.high, d.low, d.close])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // 绘制轴线条
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(width - padding.right, padding.top)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // 绘制刻度和标签
    ctx.fillStyle = '#666'
    ctx.font = '12px Arial'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    for (let i = 0; i <= tickCount; i++) {
      const y = padding.top + (i / tickCount) * (height - padding.top - padding.bottom)
      const price = maxPrice - (i / tickCount) * priceRange
      
      // 绘制刻度线
      ctx.beginPath()
      ctx.moveTo(width - padding.right - 5, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // 绘制标签
      const label = this.formatLabel(price)
      ctx.fillText(label, width - padding.right - 8, y)
    }
  }

  // 格式化标签
  formatLabel(price) {
    return price.toFixed(2)
  }
}

export default G_YAxis