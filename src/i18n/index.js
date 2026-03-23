import { createI18n } from 'vue-i18n'
import cn from './locales/cn'
import en from './locales/en'

const messages = {
  cn: cn,
  en: en,
}

const i18n = createI18n({
  locale: 'cn', // 默认语言
  fallbackLocale: 'cn', // 回退语言
  messages,
})

export default i18n
