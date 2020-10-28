import Taro from "@tarojs/taro"

export default class Common {
  static getSystemInfo(): Taro.getSystemInfoSync.Result {
    return Taro.getSystemInfoSync()
  }
  static calNavbarHeight() {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButton = Taro.getMenuButtonBoundingClientRect()

    return (
      systemInfo.statusBarHeight +
      menuButton.height +
      (menuButton.top - systemInfo.statusBarHeight) * 2
    )
  }
  static getNavbarHeight() {
    let { navbarHeight } = Taro.getStorageSync("globalData")
    if (!navbarHeight) {
      navbarHeight = this.calNavbarHeight()
    }
    return navbarHeight
  }
}
