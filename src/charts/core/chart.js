class G_FinancialChart {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.dpr = window.devicePixelRatio || 1
    
    // 获取原始尺寸
    const originalWidth = canvas.width || parseInt(canvas.style.width) || 800
    const originalHeight = canvas.height || parseInt(canvas.style.height) || 400
    
    // 保存原始尺寸
    this.options = {
      width: originalWidth,
      height: originalHeight,
      padding: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60,
      },
      ...options,
    }
    
    // 调整 canvas 以支持高分辨率
    this.setupHighResolution()
    
    this.data = []
    this.indicators = []
    this.chartType = 'kline' // 默认 K 线图
  }
  
  // 设置高分辨率支持
  setupHighResolution() {
    const { width, height } = this.options
    this.canvas.width = width * this.dpr
    this.canvas.height = height * this.dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.scale(this.dpr, this.dpr)
  }

  // 设置数据
  setData(data) {
    this.data = data
    return this
  }

  // 设置图表类型
  setChartType(type) {
    this.chartType = type
    return this
  }

  // 添加技术指标
  addIndicator(indicator) {
    this.indicators.push(indicator)
    return this
  }

  // 清除技术指标
  clearIndicators() {
    this.indicators = []
    return this
  }

  // 绘制图表
  render() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.options.width, this.options.height)

    // 绘制主图表
    if (this.chartType === 'kline') {
      this.renderKLineChart()
    } else if (this.chartType === 'time') {
      this.renderTimeChart()
    }

    // 绘制技术指标
    this.renderIndicators()

    return this
  }

  // 绘制 K 线图
  renderKLineChart() {
    if (this.data.length === 0) return

    const { width, height, padding } = this.options
    const ctx = this.ctx

    // 计算价格范围
    const prices = this.data.flatMap((d) => [d.open, d.high, d.low, d.close])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // 计算坐标映射
    const xScale =
      (width - padding.left - padding.right) / (this.data.length - 1)
    const yScale = (height - padding.top - padding.bottom) / priceRange

    // 绘制 K 线
    this.data.forEach((item, index) => {
      const x = padding.left + index * xScale
      const wickTop =
        padding.top +
        (height - padding.top - padding.bottom) -
        (item.high - minPrice) * yScale
      const wickBottom =
        padding.top +
        (height - padding.top - padding.bottom) -
        (item.low - minPrice) * yScale
      const bodyTop =
        padding.top +
        (height - padding.top - padding.bottom) -
        (Math.max(item.open, item.close) - minPrice) * yScale
      const bodyBottom =
        padding.top +
        (height - padding.top - padding.bottom) -
        (Math.min(item.open, item.close) - minPrice) * yScale
      const bodyWidth = Math.max(2, xScale * 0.8)

      // 绘制影线
      ctx.strokeStyle = item.close >= item.open ? '#00b894' : '#d63031'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, wickTop)
      ctx.lineTo(x, wickBottom)
      ctx.stroke()

      // 绘制实体
      ctx.fillStyle = item.close >= item.open ? '#00b894' : '#d63031'
      ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyBottom - bodyTop)
    })
  }

  // 绘制分时图
  renderTimeChart() {
    if (this.data.length === 0) return

    const { width, height, padding } = this.options
    const ctx = this.ctx

    // 计算价格范围
    const prices = this.data.map((d) => d.close)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // 计算坐标映射
    const xScale =
      (width - padding.left - padding.right) / (this.data.length - 1)
    const yScale = (height - padding.top - padding.bottom) / priceRange

    // 绘制分时线
    ctx.strokeStyle = '#3498db'
    ctx.lineWidth = 1
    ctx.beginPath()

    this.data.forEach((item, index) => {
      const x = padding.left + index * xScale
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        (item.close - minPrice) * yScale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }

  // 绘制技术指标
  renderIndicators() {
    this.indicators.forEach((indicator) => {
      indicator.render(this.ctx, this.data, this.options)
    })
  }
}

export default G_FinancialChart
