import Taro from "@tarojs/taro"

const {
  windowHeight,
  windowWidth,
  screenWidth,
  screenHeight,
  pixelRatio
} = Taro.getSystemInfoSync()

export { windowWidth, windowHeight, screenWidth, screenHeight, pixelRatio }
