import Taro from '@tarojs/taro'
import { createI18n } from '@i18n-chain/react'
import { LANGUAGE } from '@/services/constant'
import { User } from '@/services/user'
import en_US from './locales/en_US'
import zh_CN from './locales/zh_CN'

const i18n = createI18n({
  defaultLocale: {
    key: 'zh',
    values: zh_CN
  }
})

i18n._.define('zh', zh_CN)
i18n._.define('en', en_US)
i18n._.locale('zh')

export const switchLanguage = language => {
  const res = Taro.getSystemInfoSync()

  const _language = language === LANGUAGE.AUTO ? res.language : language

  switch (_language) {
    case 'zh':
    case 'zh_CN':
      i18n._.locale('zh')
      break
    case 'en':
      i18n._.locale('en')
      break
    default:
      i18n._.locale('zh')
      break
  }
}

export default i18n
