import Taro from "@tarojs/taro"

export default class Common {
  static getSystemInfo(): any {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButton = Taro.getMenuButtonBoundingClientRect()

    const menuButtonHeight = menuButton.height
    const menuButtunPadding = menuButton.top - systemInfo.statusBarHeight
    const screenWidth = systemInfo.screenWidth
    const menuButtunRight = menuButton.right
    const statusBarHeight = systemInfo.statusBarHeight

    return {
      statusBarHeight: statusBarHeight,
      menuButtonHeight:menuButtonHeight,
      menuButtunPadding: menuButtunPadding,
      menuButtunRight: menuButtunRight,
      screenWidth: screenWidth,
      navigationPaddingTop: statusBarHeight,
      navigationPaddingLeft: screenWidth - menuButtunRight,
      navigationHeight: menuButtonHeight + menuButtunPadding * 2
    }
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
