import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import "./index.scss"

interface IProps {
  statusBarHeight?: number
  backgroundColor?: string
  color?: string
}

interface IState {
  statusBarHeight: number
  menuButtonHeight: number
  menuButtunPadding: number
  menuButtunRight: number
  screenWidth: number
}

const ComponentWithNavigation: React.FC<IProps> = props => {
  const [config, setConfig] = useState<IState>(() => {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButton = Taro.getMenuButtonBoundingClientRect()
    console.log("menuButton", menuButton)
    return {
      statusBarHeight: systemInfo.statusBarHeight,
      menuButtonHeight: menuButton.height,
      menuButtunPadding: menuButton.top - systemInfo.statusBarHeight,
      menuButtunRight: menuButton.right,
      screenWidth: systemInfo.screenWidth
    }
  })

  const [style, setStyle] = useState({})

  useEffect(() => {
    setStyle({
      paddingTop: `${config.statusBarHeight}PX`,
      backgroundColor: props.backgroundColor,
      color: props.color,
      height: `${config.menuButtonHeight + config.menuButtunPadding * 2}PX`,
      paddingLeft: `${config.screenWidth - config.menuButtunRight}PX`,
    })
  }, [props, config])

  return (
    <View className="navigation">
      <View className="navigation-bar" style={style}>
        {props.children}
      </View>
      <View className="navigation-placeholder" style={style} />
    </View>
  )
}

ComponentWithNavigation.defaultProps = {
  statusBarHeight: 20,
  backgroundColor: "#fff",
  color: "#000"
}

export default ComponentWithNavigation
