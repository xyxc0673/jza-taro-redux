import React from "react";
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IProps {
  title: string
  headerRightText?: any
  renderHeaderRight?: any
}

const Panel: React.FC<IProps> = props => {
  return (
    <View className='panel'>
      <View className='panel-header'>
        <View className='panel-header__left'>
          <View className='panel-header__title'>{props.title}</View>
        </View>
        {/* <View className='header__right'>{this.props.headerRightText || this.props.renderHeaderRight}</View> */}
      </View>
      <View className='panel-body'>
        {props.children}
      </View>
    </View>
  )
}

export default Panel