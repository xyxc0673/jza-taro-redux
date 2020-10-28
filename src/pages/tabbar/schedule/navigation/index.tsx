import React, { useState } from "react";
import { View, Text, Image } from "@tarojs/components"
import ComponentWithNavigation from "@/components/navigation"
import "./index.scss"

interface IProps {
  title: string
  onWeekClick: Function
  onSettingClick: Function
}

const Navigation: React.FC<IProps> = props => {
  const [isWeekBarVisible, toggleWeekBar] = useState(false)

  const handleWeekClick = () => {
    props.onWeekClick && props.onWeekClick()
    toggleWeekBar(!isWeekBarVisible)
  }

  const handleSettingClick = () => {
    props.onSettingClick && props.onSettingClick()
  }

  const arrowImage = isWeekBarVisible
    ? require("../../../../assets/images/arrow-up-s-line.svg")
    : require("../../../../assets/images/arrow-down-s-line.svg")

  return (
    <ComponentWithNavigation>
      <View className='navigation'>
        <View
          hoverClass='setting__active'
          hoverStayTime={150}
          onClick={handleSettingClick}
        >
          <Image
            className='setting'
            src={require("../../../../assets/images/settings-3-line.svg")}
          />
        </View>
       
        <View className='week-container' onClick={handleWeekClick}>
          <Text className='week-title'>{props.title}</Text>
          <Image className='arrow' src={arrowImage} />
        </View>
      </View>
    </ComponentWithNavigation>
  )
}

export default Navigation
