import React from "react";
import { View, Text, ScrollView } from '@tarojs/components'

import './index.scss'
import i18n from "@/i18n";

interface IProps {
  content: string
}

const Summary: React.FC<IProps> = props => {
  const { content } = props

  return (
    <View>
      <View className='title'>{i18n.libraryDetail.summaryTitle}</View>
      <ScrollView className='scroll-view' scrollY>
        <Text className='content'>
          {content || i18n.libraryDetail.summaryEmpty}
        </Text>
      </ScrollView>
    </View>
  )
}

export default Summary
