# 金融图表项目

## 项目介绍

这是一个基于 Vue 3 开发的金融图表项目，使用原生实现图表功能，不依赖第三方图表库。项目支持国际化（i18n）和 SVG 图标功能。

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **包管理**: pnpm
- **状态管理**: Pinia
- **工具库**: Radash (替代 Lodash)
- **国际化**: Vue I18n
- **SVG 图标**: Vite Plugin SVG Icons

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

## 项目结构

```
financial-chart/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 图片、样式等
│   │   └── icons/       # SVG 图标
│   ├── components/      # 组件
│   │   ├── charts/      # 图表相关组件
│   │   └── ui/          # UI组件
│   ├── composables/     # 组合式API
│   ├── i18n/            # 国际化配置
│   │   └── locales/     # 语言包
│   ├── services/        # 数据服务
│   │   └── api/         # API请求
│   ├── store/           # 状态管理
│   ├── utils/           # 工具函数
│   │   ├── indicators/  # 技术指标计算
│   │   └── formatters/  # 数据格式化
│   ├── views/           # 页面
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── tasks/               # 任务管理
├── .gitignore
├── .npmrc              # 淘宝镜像配置
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js
```

## 功能特性

### 核心功能
- [x] 项目初始化和依赖配置
- [ ] 基础图表组件实现
  - [ ] K线图
  - [ ] 分时图
  - [ ] 技术指标叠加
- [ ] 数据处理和模拟
- [ ] 高级交互功能
- [ ] 技术指标和分析工具
- [ ] 响应式设计和布局
- [ ] 性能优化和测试
- [ ] 项目文档和部署

### 技术特性
- [x] 国际化支持 (i18n)
- [x] SVG 图标支持
- [x] 淘宝镜像配置

## 国际化

项目支持中英文两种语言，默认语言为中文。

### 添加新语言
1. 在 `src/i18n/locales/` 目录下创建新的语言包文件
2. 在 `src/i18n/index.js` 中注册新语言
3. 修改 `locale` 属性切换默认语言

## SVG 图标

### 添加新图标
1. 在 `src/assets/icons/` 目录下添加 SVG 图标文件
2. 使用 `<SvgIcon name="图标文件名" />` 组件引用

### 使用示例

```vue
<template>
  <SvgIcon name="chart" size="24" color="#333" />
</template>

<script setup>
import SvgIcon from './components/ui/SvgIcon.vue'
</script>
```

## 开发规范

### 代码风格
- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 Vue 3 组合式 API 最佳实践

### 提交规范
- 使用 conventional commits 规范提交信息

## 性能优化

- 使用 Vue 3 的 Composition API 减少不必要的渲染
- 图表渲染使用 Canvas 或 SVG 原生实现
- 数据处理考虑使用 Web Worker 处理大量计算

## 浏览器兼容性

- 支持现代浏览器（Chrome, Firefox, Safari, Edge）
- 不支持 IE11 及以下版本

## 许可证

MIT

## 更新日志

### 2026-03-24
- 项目初始化
- 添加国际化支持
- 添加 SVG 图标支持
- 配置淘宝镜像
- 实现核心图表功能（K线图、分时图）
- 实现技术指标（MA、MACD、RSI）
- 配置 ESLint 和 Prettier
- 添加 Vue 组件属性顺序规范
- 优化项目结构
- 将 .vscode 目录添加到版本控制

### 2026-03-23
- 项目创建
