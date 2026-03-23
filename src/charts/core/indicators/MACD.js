import G_Indicator from '../Indicator.js'

// MACD 指标
class G_MACD extends G_Indicator {
  constructor(
    fastPeriod = 12,
    slowPeriod = 26,
    signalPeriod = 9,
    colors = {
      macd: '#FF6B6B',
      signal: '#4ECDC4',
      histogram: '#FFD166',
    }
  ) {
    super()
    this.fastPeriod = fastPeriod
    this.slowPeriod = slowPeriod
    this.signalPeriod = signalPeriod
    this.colors = colors
  }

  // 计算 EMA
  calculateEMA(data, period) {
    const ema = []
    const multiplier = 2 / (period + 1)

    // 计算第一个 EMA（使用简单平均值）
    let sum = 0
    for (let i = 0; i < period; i++) {
      sum += data[i].close
    }
    ema.push(sum / period)

    // 计算后续 EMA
    for (let i = period; i < data.length; i++) {
      const currentEMA =
        (data[i].close - ema[i - period]) * multiplier + ema[i - period]
      ema.push(currentEMA)
    }

    return ema
  }

  // 计算 MACD 数据
  calculate(data) {
    const fastEMA = this.calculateEMA(data, this.fastPeriod)
    const slowEMA = this.calculateEMA(data, this.slowPeriod)

    // 计算 MACD 线
    const macdLine = []
    for (let i = 0; i < fastEMA.length; i++) {
      macdLine.push(fastEMA[i] - slowEMA[i])
    }

    // 计算信号线
    const signalLine = []
    const signalMultiplier = 2 / (this.signalPeriod + 1)

    // 计算第一个信号线值（使用简单平均值）
    let signalSum = 0
    for (let i = 0; i < this.signalPeriod; i++) {
      signalSum += macdLine[i]
    }
    signalLine.push(signalSum / this.signalPeriod)

    // 计算后续信号线值
    for (let i = this.signalPeriod; i < macdLine.length; i++) {
      const currentSignal =
        (macdLine[i] - signalLine[i - this.signalPeriod]) * signalMultiplier +
        signalLine[i - this.signalPeriod]
      signalLine.push(currentSignal)
    }

    // 计算柱状图
    const histogram = []
    for (let i = 0; i < signalLine.length; i++) {
      histogram.push(macdLine[i + this.signalPeriod - 1] - signalLine[i])
    }

    return {
      macdLine,
      signalLine,
      histogram,
    }
  }

  // 渲染 MACD
  render(ctx, data, options) {
    if (data.length < this.slowPeriod + this.signalPeriod) return

    const macdData = this.calculate(data)
    const { width, height, padding } = options

    // 计算 MACD 范围
    const allValues = [
      ...macdData.macdLine,
      ...macdData.signalLine,
      ...macdData.histogram,
    ]
    const minValue = Math.min(...allValues)
    const maxValue = Math.max(...allValues)
    const valueRange = maxValue - minValue || 1

    // 计算坐标映射
    const xScale = (width - padding.left - padding.right) / (data.length - 1)
    const yScale = (height - padding.top - padding.bottom) / valueRange

    // 绘制 MACD 线
    ctx.strokeStyle = this.colors.macd
    ctx.lineWidth = 1
    ctx.beginPath()

    macdData.macdLine.forEach((value, index) => {
      const x = padding.left + (index + this.slowPeriod - 1) * xScale
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        (value - minValue) * yScale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // 绘制信号线
    ctx.strokeStyle = this.colors.signal
    ctx.lineWidth = 1
    ctx.beginPath()

    macdData.signalLine.forEach((value, index) => {
      const x =
        padding.left +
        (index + this.slowPeriod + this.signalPeriod - 2) * xScale
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        (value - minValue) * yScale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // 绘制柱状图
    macdData.histogram.forEach((value, index) => {
      const x =
        padding.left +
        (index + this.slowPeriod + this.signalPeriod - 2) * xScale
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        (0 - minValue) * yScale
      const barHeight = value * yScale

      ctx.fillStyle = value >= 0 ? this.colors.histogram : '#FF6B6B'
      ctx.fillRect(x - 2, y, 4, barHeight)
    })
  }
}

export default G_MACD
