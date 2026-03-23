import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const i18n = createI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages
})

export default i18n