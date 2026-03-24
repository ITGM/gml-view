// 轴基类
class G_Axis {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.options = {
      width: canvas.width,
      height: canvas.height,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      ...options,
    }
    this.data = []
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