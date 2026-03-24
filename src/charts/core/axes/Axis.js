// 轴基类
class G_Axis {
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
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      ...options,
    }
    
    // 调整 canvas 以支持高分辨率
    this.setupHighResolution()
    
    this.data = []
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

  // 绘制轴
  render() {
    // 子类实现
  }

  // 清空画布
  clear() {
    this.ctx.clearRect(0, 0, this.options.width, this.options.height)
  }
}

export default G_Axis