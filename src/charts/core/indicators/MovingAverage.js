import G_Indicator from '../Indicator.js';

// 移动平均线指标
class G_MovingAverage extends G_Indicator {
  constructor(period = 20, color = '#FF0000', lineWidth = 1) {
    super({ color, lineWidth });
    this.period = period;
  }

  // 计算均线数据
  calculate(data) {
    const result = [];
    for (let i = this.period - 1; i < data.length; i++) {
      let sum = 0;
      for (let j = 0; j < this.period; j++) {
        sum += data[i - j].close;
      }
      result.push({
        index: i,
        value: sum / this.period
      });
    }
    return result;
  }

  // 渲染均线
  render(ctx, data, options) {
    const maData = this.calculate(data);
    if (maData.length < 2) return;

    const { width, height, padding } = options;
    
    // 计算价格范围
    const prices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // 计算坐标映射
    const xScale = (width - padding.left - padding.right) / (data.length - 1);
    const yScale = (height - padding.top - padding.bottom) / priceRange;

    // 绘制均线
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();

    maData.forEach((point, index) => {
      const x = padding.left + point.index * xScale;
      const y = padding.top + (height - padding.top - padding.bottom) - (point.value - minPrice) * yScale;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }

  // 获取指标名称
  getName() {
    return `MA${this.period}`;
  }
}

export default G_MovingAverage;