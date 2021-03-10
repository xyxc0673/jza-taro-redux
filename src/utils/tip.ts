import Taro from '@tarojs/taro'

import i18n from '@/i18n'

class Tip {
  static isLoading: boolean = false

  static showToast(title: string, mask: boolean = true) {
    Taro.showToast({
      title: title,
      icon: 'none',
      mask: mask,
      duration: 2000
    })
  }

  static showLoading({ title = i18n.loading, silentMode = false }) {
    this.isLoading = true
    if (!silentMode && Taro.showLoading) {
      console.log(silentMode, !silentMode && Taro.showLoading)
      Taro.showLoading({
        title: title,
        mask: true
      })
    } else {
      Taro.showNavigationBarLoading()
    }
  }

  static hideLoading({ silentMode = false }) {
    if (!this.isLoading) {
      return
    }

    Taro.hideNavigationBarLoading()

    if (Taro.showLoading) {
      Taro.hideLoading()
    } else {
    }
  }

  static async showModal(
    title: string = i18n.modalDefaultTitle,
    content: string,
    showCancel: boolean = true
  ) {
    return Taro.showModal({
      title,
      content,
      showCancel,
      confirmText: i18n.confirm,
      cancelText: i18n.cancel,
    })
  }
}

export default Tip
