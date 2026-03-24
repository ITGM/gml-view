<template>
  <div class="app">
    <header class="app-header">
      <h1><SvgIcon name="chart" size="24" /> {{ $t('app.header') }}</h1>
      <div class="language-switcher">
        <button
          :class="{ active: $i18n.locale === 'cn' }"
          @click="switchLanguage('cn')"
        >
          中文
        </button>
        <button
          :class="{ active: $i18n.locale === 'en' }"
          @click="switchLanguage('en')"
        >
          English
        </button>
      </div>
    </header>
    <main class="app-main">
      <FinancialChart />
    </main>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SvgIcon from './components/ui/SvgIcon.vue'
import FinancialChart from './components/charts/FinancialChart.vue'

const { locale } = useI18n()

const switchLanguage = (lang) => {
  locale.value = lang
}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.language-switcher button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.language-switcher button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.language-switcher button.active {
  background-color: #4caf50;
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
