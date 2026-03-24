# 技术指标开发计划

## 已实现的指标
- ✅ 移动平均线 (MA)
- ✅ MACD
- ✅ RSI

## 待开发的指标

### 高优先级
1. **KDJ 指标** - 随机指标
2. **BOLL 指标** - 布林带
3. **测试所有指标的显示和功能**

### 中优先级
4. **OBV 指标** - 能量潮
5. **DMI 指标** - 动向指标
6. **威廉指标 (WR)**
7. **更新 i18n 语言文件添加新指标翻译**
8. **更新 FinancialChart.vue 组件添加新指标按钮**

## 实现规范
- 所有指标继承 `G_Indicator` 基类
- 实现 `calculate()` 方法计算指标数据
- 实现 `render()` 方法绘制指标
- 在 `src/charts/core/indicators/index.js` 中导出
- 在 i18n 语言文件中添加中英文翻译
- 在 FinancialChart.vue 中添加对应的按钮

## 文件结构
```
src/charts/core/indicators/
├── Indicator.js        # 基类
├── index.js            # 导出文件
├── MovingAverage.js    # 移动平均线
├── MACD.js             # MACD
├── RSI.js              # RSI
├── KDJ.js              # KDJ (待实现)
├── BOLL.js             # BOLL (待实现)
├── OBV.js              # OBV (待实现)
├── DMI.js              # DMI (待实现)
└── WR.js               # WR (待实现)
```
