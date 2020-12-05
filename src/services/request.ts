import Taro from "@tarojs/taro"

import Tip from "@/tip"
import Messages from "@/messages"
import util from "@/util"
import store from "@/store/index"
import Route from "@/route"
import { CARD_INIT } from "@/services/constant"
import { User } from "./user"
import i18n from "@/i18n"
import { LoginType } from "@/data/enums/login-type"

const checkHttpStatus = res => {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data
  }
  throw new Error(Messages.serverErrorText)
}

const checkSuccess = (res, slientMode) => {
  if (
    res.data === Messages.sessionExpiredServer ||
    res.data === Messages.notLogin
  ) {
    throw new Error(Messages.sessionExpiredServer)
  }

  if (res.code.toString() === "-1") {
    if (slientMode) {
      Tip.showToast(`${res.msg}`)
    } else {
      Tip.showModal(
        res.msg || Messages.modalDefaultTitle,
        res.data || Messages.serverErrorText,
        false
      )
    }
  }

  return res
}

const genAuth = (id, pwd) => {
  const auth = util.str2ab(`${id}:${pwd}`)
  return `Basic ` + Taro.arrayBufferToBase64(auth)
}

export default {
  baseRequest(params, method?): any {
    const options = {
      isShowLoading: false,
      loadingText: Messages.loadingText,
      method: method ? method : "GET",
      ...params
    }

    Tip.showLoading({ slientMode: params.slientMode })

    console.log("params", params)
    return Taro.request(options)
      .then(checkHttpStatus)
      .then(async data => {
        Tip.hideLoading({ slientMode: params.slientMode })

        console.log("baseRequest", options, data)
        return checkSuccess(data, params.slientMode)
      })
      .catch(
        (err): PromiseLike<never> => {
          Tip.hideLoading({ slientMode: params.slientMode })

          console.error(`[${new Date()}][Error][Request.ts]: ${err}`)

          if (err.message === Messages.sessionExpiredServer) {
            return Promise.reject({
              message: Messages.sessionExpiredServer,
              ...err
            })
          }

          if (err.errMsg === "request:fail timeout") {
            Tip.showToast(Messages.networkTimeout)
          } else {
            Tip.showToast(Messages.serverErrorText)
          }

          return Promise.reject({ message: Messages.serverErrorText, ...err })
        }
      )
  },
  authRequest({ url, params }) {
    params.header = params.header || {}
    params.header.token = params.data.token || ""
    params.header.Authorization = genAuth(params.data.id, params.data.pwd) // Todo: Remove account info from params.data

    let options = {
      url: url,
      ...params
    }

    return this.baseRequest(options, "GET")
  },
  async eduAuthRequest({ url, params }) {
    const { id = "", eduPwd = "" } = Taro.getStorageSync("account")

    if (!id || !eduPwd) {
      const res = await Tip.showModal(
        i18n.modalDefaultTitle,
        i18n.commonBind.noBindDetect,
        true
      )

      if (res.confirm) {
        Route.navTo(Route.path.commonBind, { type: LoginType.edu })
      }

      throw "Error：账号未绑定"
    }

    params.header = params.header || {}
    params.header.Authorization = genAuth(id, eduPwd)

    return this.baseRequest({ url, ...params })
  },
  async eduTokenRequest({ url, params }) {
    params.header = params.header || {}
    params.header.Token = params.Token || store.getState().edu.token

    return this.baseRequest({ url, ...params })
  },
  async cardAuthRequest({ url, params }) {
    const { id = "", cardPwd = "" } = Taro.getStorageSync("account")

    if (!id || !cardPwd) {
      // const isFirst = User.getSetting("first:bindTip")
      // console.log("g", isFirst !== undefined, !isFirst)
      // if (!isFirst) {
      //   return
      // }

      // User.setSetting(false, "first:bindTip")

      const res = await Tip.showModal(
        i18n.modalDefaultTitle,
        i18n.commonBind.noBindDetect,
        true
      )

      if (res.confirm) {
        Route.navTo(Route.path.commonBind, { type: LoginType.card })
      }

      throw "Error：账号未绑定"
    }

    params.header = params.header || {}
    params.header.Authorization = genAuth(id, cardPwd)

    return this.baseRequest({ url, ...params })
  },
  libraryTokenRequest({ url, data }) {
    let options = { url, data, header: { Token: "" } }
    options.header.Token =
      store.getState().library.opacToken || Taro.getStorageSync("opacToken")
    return this.baseRequest(options, "GET")
  }
}
