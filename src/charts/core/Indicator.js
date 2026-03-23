// 指标基类
class G_Indicator {
  constructor(options = {}) {
    this.color = options.color || '#000000';
    this.lineWidth = options.lineWidth || 1;
  }

  // 计算指标数据（子类必须实现）
  calculate(data) {
    throw new Error('子类必须实现 calculate 方法');
  }

  // 渲染指标（子类必须实现）
  render(ctx, data, options) {
    throw new Error('子类必须实现 render 方法');
  }

  // 获取指标名称（子类可以覆盖）
  getName() {
    return this.constructor.name.replace('G_', '');
  }

  // 设置颜色
  setColor(color) {
    this.color = color;
    return this;
  }

  // 设置线宽
  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
    return this;
  }
}

export default G_Indicator;