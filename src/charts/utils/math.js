// 数学工具函数

// 计算数组平均值
export function average(arr) {
  if (arr.length === 0) return 0
  const sum = arr.reduce((acc, val) => acc + val, 0)
  return sum / arr.length
}

// 计算数组最大值
export function max(arr) {
  return Math.max(...arr)
}

// 计算数组最小值
export function min(arr) {
  return Math.min(...arr)
}

// 计算数组总和
export function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0)
}

// 计算标准差
export function standardDeviation(arr) {
  const avg = average(arr)
  const squareDiffs = arr.map((value) => Math.pow(value - avg, 2))
  const variance = average(squareDiffs)
  return Math.sqrt(variance)
}

// 线性插值
export function linearInterpolation(x1, y1, x2, y2, x) {
  if (x1 === x2) return y1
  return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1)
}

// 归一化值到指定范围
export function normalize(value, min, max, newMin, newMax) {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}

// 限制值在指定范围内
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
