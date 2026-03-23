<template>
  <div class="financial-chart">
    <div class="chart-controls">
      <button @click="switchChartType('kline')" :class="{ active: chartType === 'kline' }">
        {{ $t('chart.kline') }}
      </button>
      <button @click="switchChartType('time')" :class="{ active: chartType === 'time' }">
        {{ $t('chart.time') }}
      </button>
      <button @click="addMA">
        {{ $t('indicators.ma') }}
      </button>
      <button @click="addMACD">
        {{ $t('indicators.macd') }}
      </button>
      <button @click="addRSI">
        {{ $t('indicators.rsi') }}
      </button>
      <button @click="clearIndicators">
        {{ $t('common.reset') }}
      </button>
    </div>
    <canvas ref="chartCanvas" width="800" height="400"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { FinancialChart, MovingAverage, MACD, RSI } from '@/charts'

const chartCanvas = ref(null)
const chartType = ref('kline')
let chart = null

// 模拟数据
const generateMockData = (days = 30) => {
  const data = [];
  let price = 100;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const open = price;
    const high = price + Math.random() * 5;
    const low = price - Math.random() * 5;
    const close = low + Math.random() * (high - low);
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    });
    
    price = close;
  }
  
  return data;
};

const mockData = generateMockData();

onMounted(() => {
  // 初始化图表
  chart = new FinancialChart(chartCanvas.value)
    .setData(mockData)
    .setChartType(chartType.value)
    .render();
});

// 切换图表类型
const switchChartType = (type) => {
  chartType.value = type;
  chart.setChartType(type).render();
};

// 添加均线
const addMA = () => {
  const ma = new MovingAverage(20, '#FF0000');
  chart.addIndicator(ma).render();
};

// 添加 MACD
const addMACD = () => {
  const macd = new MACD();
  chart.addIndicator(macd).render();
};

// 添加 RSI
const addRSI = () => {
  const rsi = new RSI();
  chart.addIndicator(rsi).render();
};

// 清除指标
const clearIndicators = () => {
  chart.clearIndicators().render();
};
</script>

<style scoped>
.financial-chart {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.chart-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.chart-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.chart-controls button:hover {
  background-color: #e0e0e0;
}

.chart-controls button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

canvas {
  width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>