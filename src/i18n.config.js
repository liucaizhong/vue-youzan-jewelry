import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
import axios from 'axios'
import messages from '@/locale/zh-CN'
import zhCN from 'vant/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': messages,
  },
})

Locale.use('zh-CN', zhCN)

const loadedLanguages = ['zh-CN']

const setI18nLanguages = (lang, msgs) => {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.documentElement.lang = lang
  if (msgs) {
    Locale.use(lang, msgs)
  } else {
    import(`vant/lib/locale/lang/${lang}`).then(msgs => {
      Locale.use(lang, msgs.default)
    }).catch(err => {
      console.log(err)
    })
  }
  return lang
}

export const loadLanguageAsync = (lang) => {
  console.log('lang', lang)
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return Promise.all([
        import(`@/locale/${lang}`),
        import(`vant/lib/locale/lang/${lang}`)
      ]).then(msgs => {
        i18n.setLocaleMessage(lang, msgs[0].default)
        loadedLanguages.push(lang)
        return setI18nLanguages(lang, msgs[1].default)
      }).catch(err => {
        console.log(err)
      })
    }
    return Promise.resolve(setI18nLanguages(lang))
  }
  return Promise.resolve(lang)
}
