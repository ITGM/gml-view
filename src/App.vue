<template>
  <div class="app">
    <header class="app-header">
      <h1>
        <SvgIcon name="chart" size="24" /> {{ $t('app.header') }}
      </h1>
    </header>
    <main class="app-main">
      <div class="chart-container">
        <!-- 图表将在这里渲染 -->
        <h2>
          <SvgIcon name="chart" size="20" /> {{ $t('chart.title') }}
        </h2>
        <p>{{ $t('chart.description') }}</p>
      </div>
    </main>
    <footer class="app-footer">
      <p>{{ $t('app.footer') }}</p>
    </footer>
  </div>
</template>

<script setup>
import SvgIcon from './components/ui/SvgIcon.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.app-header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

.app-main {
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.app-footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}
</style>