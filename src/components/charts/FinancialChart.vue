<template>
  <div class="financial-chart">
    <div class="chart-controls">
      <button :class="{ active: chartType === 'kline' }" @click="switchChartType('kline')">
        {{ $t('chart.kline') }}
      </button>
      <button :class="{ active: chartType === 'time' }" @click="switchChartType('time')">
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
    <div class="chart-container">
      <canvas ref="yAxisCanvas" class="y-axis" width="60" height="360"></canvas>
      <div class="chart-main">
        <canvas ref="chartCanvas" class="main-chart" width="800" height="360"></canvas>
        <canvas ref="xAxisCanvas" class="x-axis" width="800" height="50"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FinancialChart, MovingAverage, MACD, RSI, XAxis, YAxis } from '@/charts'

const chartCanvas = ref(null)
const xAxisCanvas = ref(null)
const yAxisCanvas = ref(null)
const chartType = ref('kline')
let chart = null
let xAxis = null
let yAxis = null

// 模拟数据
const generateMockData = (days = 30) => {
  const data = []
  let price = 100

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))

    const open = price
    const high = price + Math.random() * 5
    const low = price - Math.random() * 5
    const close = low + Math.random() * (high - low)

    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    })

    price = close
  }

  return data
}

const mockData = generateMockData()

// 渲染所有组件
const renderAll = () => {
  if (chart) chart.render()
  if (xAxis) xAxis.render()
  if (yAxis) yAxis.render()
}

onMounted(() => {
  if (chartCanvas.value && xAxisCanvas.value && yAxisCanvas.value) {
    // 初始化图表
    chart = new FinancialChart(chartCanvas.value, {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      }
    })
    
    // 初始化 X 轴
    xAxis = new XAxis(xAxisCanvas.value)
    
    // 初始化 Y 轴
    yAxis = new YAxis(yAxisCanvas.value)
    
    // 设置数据
    chart.setData(mockData).setChartType(chartType.value)
    xAxis.setData(mockData)
    yAxis.setData(mockData)
    
    // 初始渲染
    renderAll()
  }
})

// 切换图表类型
const switchChartType = (type) => {
  chartType.value = type
  chart.setChartType(type)
  renderAll()
}

// 添加均线
const addMA = () => {
  const ma = new MovingAverage(20, '#FF0000')
  chart.addIndicator(ma)
  renderAll()
}

// 添加 MACD
const addMACD = () => {
  const macd = new MACD()
  chart.addIndicator(macd)
  renderAll()
}

// 添加 RSI
const addRSI = () => {
  const rsi = new RSI()
  chart.addIndicator(rsi)
  renderAll()
}

// 清除指标
const clearIndicators = () => {
  chart.clearIndicators()
  renderAll()
}
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
  transition: all 0.3s;
}

.chart-controls button:hover {
  background-color: #e0e0e0;
}

.chart-controls button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.chart-container {
  display: flex;
  gap: 0;
}

.y-axis {
  border-right: none;
  display: block;
  height: 360px;
  width: 60px;
}

.chart-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-chart {
  display: block;
  height: 360px;
  width: 100%;
}

.x-axis {
  display: block;
  height: 50px;
  width: 100%;
}
</style>
