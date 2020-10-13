import React, { useEffect, useState } from "react";
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import './index.scss'

interface IProps {
  title: string
  isOpen: boolean
  onClose: Function
}

const CustomModal: React.FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)

  useEffect(() => {
    if (props.isOpen !== isOpen) {
      setIsOpen(props.isOpen)
      !props.isOpen && props.onClose()
    }
  }, [props.isOpen])

  return (
    <View className={classNames('custom-modal', { 'active': isOpen })}>
      <View className='container'>
        <View className='header'>
          <Text className='title'>{props.title}</Text>
          <View className='close' onClick={() => {
            setIsOpen(false)
            props.onClose()
          }}></View>
        </View>
        <View className='body'>
          {props.children}
        </View>
      </View>
    </View>
  )
}

export default CustomModal