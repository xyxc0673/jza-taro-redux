import React, { useState } from "react";
import { View, Image, Text, ScrollView } from '@tarojs/components'
import Route from '@/utils/route'
import i18n from '@/i18n'

import './index.scss'

const MagicBox = props => {
  const [scrollLeft, setScrollLeft] = useState(0)

  const navToScore = () => {
    Route.navTo(Route.path.eduScore)
  }

  const navToRecommendSchedule = () => {
    Route.navTo(Route.path.eduRecommendIndex)
  }

  const navToCard = () => {
    Route.navTo(Route.path.cardIndex)
  }

  const navToLibrary = () => {
    Route.navTo(Route.path.libraryBookSearch)
  }

  const navToLibraryReader = () => {
    Route.navTo(Route.path.libraryReaderCenter)
  }

  const handleScroll = (e) => {
    setScrollLeft(e.detail.scrollLeft)
  }

  return (
    <View className='comp-magic-box'>
      <ScrollView className='function-list' scrollX onScroll={handleScroll}>
        <View className='function-list__container'>
          <View className='function-item' onClick={navToScore}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/pencil-ruler-2-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.score}</Text>
          </View>
          <View className='function-item' onClick={navToRecommendSchedule}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/calendar-2-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.recommendSchedule}</Text>
          </View>
          <View className='function-item' onClick={navToCard}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/bank-card-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.card}</Text>
          </View>
          <View className='function-item' onClick={navToLibrary}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/book-2-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.librarySeach}</Text>
          </View>
          <View className='function-item' onClick={navToLibraryReader}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/slideshow-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.myLibrary}</Text>
          </View>
          <View className='function-item' onClick={navToLibraryReader}>
            <Image
              className='function-img'
              src={require('../../../../assets/images/calendar-check-line.svg')}
            />
            <Text className='function-title'>{i18n.tabbarIndex.magicBox.calendar}</Text>
          </View>
        </View>
      </ScrollView>
      {/* <View className='progress'>
        <View className='progress-bar' style={{width: `${50 * (scrollLeft / 178)}rpx`}}></View>
      </View> */}
    </View>
  )
}

export default MagicBox
