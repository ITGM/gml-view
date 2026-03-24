import G_Axis from './Axis.js'

// X 轴类
class G_XAxis extends G_Axis {
  constructor(canvas, options = {}) {
    super(canvas, {
      tickCount: 10,
      ...options,
    })
  }

  // 绘制 X 轴
  render() {
    if (this.data.length === 0) return

    this.clear()

    const { width, height, padding, tickCount } = this.options
    const ctx = this.ctx

    // 绘制轴线条
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, padding.top)
    ctx.lineTo(width, padding.top)
    ctx.stroke()

    // 计算刻度数量
    const actualTickCount = Math.min(tickCount, this.data.length)
    const step = Math.floor(this.data.length / actualTickCount)

    // 绘制刻度和标签
    ctx.fillStyle = '#666'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    for (let i = 0; i < this.data.length; i += step) {
      const item = this.data[i]
      const x = padding.left + (i / (this.data.length - 1)) * (width - padding.left - padding.right)
      
      // 绘制刻度线
      ctx.beginPath()
      ctx.moveTo(x, padding.top) 
      ctx.lineTo(x, padding.top + 5)
      ctx.stroke()

      // 绘制标签
      const label = this.formatLabel(item)
      ctx.fillText(label, x, padding.top + 8)
    }
  }

  // 格式化标签
  formatLabel(item) {
    if (item.time) {
      return item.time
    } else if (item.date) {
      return item.date
    }
    return ''
  }
}

export default G_XAxis