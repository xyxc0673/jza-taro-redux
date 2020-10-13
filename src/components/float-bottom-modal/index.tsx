import React from "react";
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

interface IProps {
  title: string
  visible: boolean
  onClose: Function
}

const FloatBottomModal: React.FC<IProps> = props => {
  return (
    <View
      className={classNames('modal-background', {
        'modal-background__active': props.visible
      })}
      onClick={() => props.onClose()}
    >
      <View className='modal-container' onClick={e => e.stopPropagation()}>
        {props.title && (
          <View className='modal-title'>{props.title.toUpperCase()}</View>
        )}
        <ScrollView
          scrollY
          className='modal-scrollview'
        >
          {props.children}
        </ScrollView>
      </View>
    </View>
  )
}

export default FloatBottomModal
