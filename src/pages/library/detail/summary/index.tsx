import React from "react";
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import Messages from '@/messages'

import './index.scss'

interface IProps {
  content: string
}

const Summary: React.FC<IProps> = props => {
  const { content } = props

  return (
    <View>
      <View className='title'>{Messages.libraryDetail.summaryTitle}</View>
      <ScrollView className='scroll-view' scrollY>
        <Text className='content'>
          {content || Messages.libraryDetail.summaryEmpty}
        </Text>
      </ScrollView>
    </View>
  )
}

export default Summary
