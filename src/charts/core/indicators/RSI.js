import G_Indicator from '../Indicator.js';

// RSI 指标
class G_RSI extends G_Indicator {
  constructor(period = 14, color = '#9B59B6', lineWidth = 1) {
    super({ color, lineWidth });
    this.period = period;
  }

  // 计算 RSI 数据
  calculate(data) {
    if (data.length < this.period + 1) return [];
    
    const rsi = [];
    let gains = 0;
    let losses = 0;
    
    // 计算第一个周期的涨跌
    for (let i = 1; i <= this.period; i++) {
      const change = data[i].close - data[i - 1].close;
      if (change > 0) {
        gains += change;
      } else {
        losses += Math.abs(change);
      }
    }
    
    // 计算第一个 RSI 值
    const firstRS = gains / losses;
    const firstRSI = 100 - (100 / (1 + firstRS));
    rsi.push(firstRSI);
    
    // 计算后续 RSI 值
    for (let i = this.period + 1; i < data.length; i++) {
      const change = data[i].close - data[i - 1].close;
      let currentGain = 0;
      let currentLoss = 0;
      
      if (change > 0) {
        currentGain = change;
      } else {
        currentLoss = Math.abs(change);
      }
      
      gains = (gains * (this.period - 1) + currentGain) / this.period;
      losses = (losses * (this.period - 1) + currentLoss) / this.period;
      
      const rs = gains / losses;
      const rsiValue = 100 - (100 / (1 + rs));
      rsi.push(rsiValue);
    }
    
    return rsi;
  }

  // 渲染 RSI
  render(ctx, data, options) {
    const rsiData = this.calculate(data);
    if (rsiData.length < 2) return;
    
    const { width, height, padding } = options;
    
    // 计算坐标映射
    const xScale = (width - padding.left - padding.right) / (data.length - 1);
    const yScale = (height - padding.top - padding.bottom) / 100; // RSI 范围 0-100
    
    // 绘制 RSI 线
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    
    rsiData.forEach((value, index) => {
      const x = padding.left + (index + this.period) * xScale;
      const y = padding.top + (height - padding.top - padding.bottom) - value * yScale;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // 绘制超买超卖线
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([5, 5]);
    
    // 70 线（超买）
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + (height - padding.top - padding.bottom) - 70 * yScale);
    ctx.lineTo(width - padding.right, padding.top + (height - padding.top - padding.bottom) - 70 * yScale);
    ctx.stroke();
    
    // 30 线（超卖）
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + (height - padding.top - padding.bottom) - 30 * yScale);
    ctx.lineTo(width - padding.right, padding.top + (height - padding.top - padding.bottom) - 30 * yScale);
    ctx.stroke();
    
    ctx.setLineDash([]);
  }

  // 获取指标名称
  getName() {
    return `RSI${this.period}`;
  }
}

export default G_RSI;