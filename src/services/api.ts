import Taro from "@tarojs/taro"
import config from "../utils/config"
import request from "./request"

const api = apiReset({
  NOTICE: "/notice",

  EDU_AUTH: "/jw/verify",
  EDU_SCORE: "/jw/score",
  EDU_SCHEDULE: "/jw/schedule",
  EDU_SCHOOL_START_DATE: "/jw/date",

  EDU_RECOMMEND_GRADE: "/jw/recommend/grade",
  EDU_RECOMMEND_COLLEGE: "/jw/recommend/college",
  EDU_RECOMMEND_MAJOR: "/jw/recommend/major",
  EDU_RECOMMEND_CLASS: "/jw/recommend/class",
  EDU_RECOMMEND_SCHEDULE: "/jw/recommend/schedule",

  CARD_AUTH: "/card/verify",
  CARD_BALANCE: "/card/balance",
  CARD_TRANSACTION: "/card/transaction",

  LIB_BOOK_SEARCH: "/lib/search",
  LIB_BOOK_INFO: "/lib/book/info",
  LIB_BOOK_DETAIL: "/lib/book/detail",

  LIB_READER_AUTH: "/lib/reader/login",
  LIB_READER_CAPTCHA: "/lib/reader/captcha",
  LIB_READER_INFO: "/lib/reader/info",
  LIB_READER_RENEW: "/lib/reader/renew",
  LIB_READER_RENEW_CHECK: "/lib/reader/renew/check",
  LIB_READER_CHECKOUT_CURRENT: "/lib/reader/checkout/current",
  LIB_READER_CHECKOUT_HISTORY: "/lib/reader/checkout/record"
})

function apiReset<T>(object: T): T {
  const domain = config.apiBaseUrl[config.devType]
  Object.keys(object).forEach(key => {
    object[key] = `${domain}${object[key]}`
  })
  return object
}

export default {
  eduLogin: payload => {
    return request.authRequest({
      url: api.EDU_AUTH,
      params: { data: payload }
    })
  },
  eduLoginForToken: payload => {
    return request.eduAuthRequest({
      url: api.EDU_AUTH,
      params: {
        data: {
          tokenRequired: true
        }
      }
    })
  },
  eduSchoolStartDate: (payload = {}) => {
    return request.baseRequest({
      url: api.EDU_SCHOOL_START_DATE,
      params: {}
    })
  },
  eduScore: payload => {
    return request.eduAuthRequest({
      url: api.EDU_SCORE,
      params: { data: payload }
    })
  },
  eduSchedule: payload => {
    return request.eduAuthRequest({
      url: api.EDU_SCHEDULE,
      params: { data: payload }
    })
  },
  eduRecommendGrade: payload => {
    return request.eduTokenRequest({
      url: api.EDU_RECOMMEND_GRADE,
      params: { data: payload }
    })
  },
  eduRecommendCollege: payload => {
    return request.eduTokenRequest({
      url: api.EDU_RECOMMEND_COLLEGE,
      params: { data: payload }
    })
  },
  eduRecommendMajor: payload => {
    return request.eduTokenRequest({
      url: api.EDU_RECOMMEND_MAJOR,
      params: { data: payload }
    })
  },
  eduRecommendClass: payload => {
    return request.eduTokenRequest({
      url: api.EDU_RECOMMEND_CLASS,
      params: { data: payload }
    })
  },
  eduRecommendSchedule: payload => {
    return request.eduTokenRequest({
      url: api.EDU_RECOMMEND_SCHEDULE,
      params: { data: payload }
    })
  },
  cardLogin: payload => {
    return request.authRequest({
      url: api.CARD_AUTH,
      params: { data: payload }
    })
  },

  cardBalance: payload => {
    return request.cardAuthRequest({
      url: api.CARD_BALANCE,
      params: { silentMode: payload.silentMode }
    })
  },

  cardTransaction: payload => {
    return request.cardAuthRequest({
      url: api.CARD_TRANSACTION,
      params: { data: payload }
    })
  },

  // Library Book Search
  libraryBookList: payload => {
    return request.baseRequest({
      url: api.LIB_BOOK_SEARCH,
      data: payload
    })
  },
  libraryBookInfo: payload => {
    return request.baseRequest({
      url: api.LIB_BOOK_INFO,
      data: payload
    })
  },
  libraryBookDetail: payload => {
    return request.baseRequest({
      url: api.LIB_BOOK_DETAIL,
      data: payload
    })
  },
  // Library Reader Login
  libraryReaderLogin: payload => {
    return request.authRequest({
      url: api.LIB_READER_AUTH,
      params: { data: payload }
    })
  },
  libraryReaderCaptcha: payload => {
    return request.baseRequest({
      url: api.LIB_READER_CAPTCHA,
      data: payload,
      silentMode: true
    })
  },
  libraryReaderInfo: payload => {
    return request.libraryTokenRequest({
      url: api.LIB_READER_INFO,
      data: payload
    })
  },
  libraryReaderCurrentCheckout: payload => {
    return request.libraryTokenRequest({
      url: api.LIB_READER_CHECKOUT_CURRENT,
      data: payload
    })
  },
  libraryReaderHistoryCheckout: payload => {
    return request.libraryTokenRequest({
      url: api.LIB_READER_CHECKOUT_HISTORY,
      data: payload
    })
  }
}
