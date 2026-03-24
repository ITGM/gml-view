# 技术指标实现规范 Skill

## 概述
本 skill 定义了在金融图表项目中实现技术指标的标准规范和流程。

## 已实现的指标参考
- ✅ 移动平均线 (MA)
- ✅ MACD
- ✅ RSI

## 实现步骤

### 1. 创建指标文件
在 `src/charts/core/indicators/` 目录下创建新的指标文件：
- 文件名格式：`{指标名}.js`
- 类名格式：`G_{指标名}`

### 2. 继承基类
所有指标必须继承自 `G_Indicator` 基类：
```javascript
import G_Indicator from './Indicator.js'

class G_KDJ extends G_Indicator {
  constructor(options = {}) {
    super(options)
    // 初始化指标特有属性
  }
}
```

### 3. 实现 calculate 方法
实现指标数据计算方法：
```javascript
calculate(data) {
  // 计算指标数据
  // 返回计算结果
}
```

### 4. 实现 render 方法
实现指标绘制方法：
```javascript
render(ctx, data, options) {
  // 绘制指标
}
```

### 5. 导出指标
在 `src/charts/core/indicators/index.js` 中添加新指标的导出：
```javascript
import G_KDJ from './KDJ.js'

export {
  // ... 其他指标
  G_KDJ
}
```

### 6. 更新图表模块导出
在 `src/charts/index.js` 中添加新指标的导出：
```javascript
import { G_KDJ } from './core/indicators'

export {
  // ... 其他指标
  G_KDJ as KDJ
}
```

### 7. 添加语言翻译
在 `src/i18n/locales/cn.js` 和 `src/i18n/locales/en.js` 中添加指标名称翻译：
```javascript
// cn.js
indicators: {
  // ... 其他指标
  kdj: 'KDJ',
}

// en.js
indicators: {
  // ... 其他指标
  kdj: 'KDJ',
}
```

### 8. 添加 UI 按钮
在 `src/components/charts/FinancialChart.vue` 中添加指标按钮：
```vue
<button @click="addKDJ">
  {{ $t('indicators.kdj') }}
</button>
```

```javascript
const addKDJ = () => {
  if (chart) {
    const kdj = new KDJ()
    chart.addIndicator(kdj)
    renderAll()
  }
}
```

## 代码规范

### 命名规范
- 类名：使用 PascalCase，前缀为 `G_`
- 文件名：使用 PascalCase
- 方法名：使用 camelCase

### 个人标记
- 所有核心类名使用 `G_` 前缀（GML 个人标记）

### 代码风格
- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 Vue 3 组合式 API 最佳实践
- 使用 ES6+ 语法

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

## 测试验证
1. 确保指标能正确计算数据
2. 确保指标能正确绘制在图表上
3. 确保按钮点击能正常添加指标
4. 确保清除指标功能正常工作
5. 确保语言切换功能正常

## 常见指标实现清单

### KDJ 指标
- [ ] 创建 KDJ.js 文件
- [ ] 继承 G_Indicator 基类
- [ ] 实现 KDJ 计算逻辑
- [ ] 实现 KDJ 绘制逻辑
- [ ] 在 index.js 中导出
- [ ] 在 charts/index.js 中导出
- [ ] 添加 i18n 翻译
- [ ] 添加 UI 按钮
- [ ] 测试功能

### BOLL 指标
- [ ] 创建 BOLL.js 文件
- [ ] 继承 G_Indicator 基类
- [ ] 实现 BOLL 计算逻辑
- [ ] 实现 BOLL 绘制逻辑
- [ ] 在 index.js 中导出
- [ ] 在 charts/index.js 中导出
- [ ] 添加 i18n 翻译
- [ ] 添加 UI 按钮
- [ ] 测试功能

### OBV 指标
- [ ] 创建 OBV.js 文件
- [ ] 继承 G_Indicator 基类
- [ ] 实现 OBV 计算逻辑
- [ ] 实现 OBV 绘制逻辑
- [ ] 在 index.js 中导出
- [ ] 在 charts/index.js 中导出
- [ ] 添加 i18n 翻译
- [ ] 添加 UI 按钮
- [ ] 测试功能

### DMI 指标
- [ ] 创建 DMI.js 文件
- [ ] 继承 G_Indicator 基类
- [ ] 实现 DMI 计算逻辑
- [ ] 实现 DMI 绘制逻辑
- [ ] 在 index.js 中导出
- [ ] 在 charts/index.js 中导出
- [ ] 添加 i18n 翻译
- [ ] 添加 UI 按钮
- [ ] 测试功能

### WR 指标
- [ ] 创建 WR.js 文件
- [ ] 继承 G_Indicator 基类
- [ ] 实现 WR 计算逻辑
- [ ] 实现 WR 绘制逻辑
- [ ] 在 index.js 中导出
- [ ] 在 charts/index.js 中导出
- [ ] 添加 i18n 翻译
- [ ] 添加 UI 按钮
- [ ] 测试功能
