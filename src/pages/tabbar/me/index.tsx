import React, { useState } from "react";
import Taro from '@tarojs/taro'
import { Image, OpenData, Text, View, Button } from '@tarojs/components'
import className from 'classnames'

import Tip from '@/tip'
import Route from '@/route'
import Messages from '@/messages'

import {} from '@/store/actions/'
import { useI18n } from '@i18n-chain/react'
import i18n from '@/i18n'

import './index.scss'

const ICON = {
  edu: {
    active: require('../../../assets/images/calendar-todo-line__active.svg'),
    inactive: require('../../../assets/images/calendar-todo-line__inactive.svg')
  },
  card: {
    active: require('../../../assets/images/bank-card-line__active.svg'),
    inactive: require('../../../assets/images/bank-card-line__inactive.svg')
  },
  library: {
    active: require('../../../assets/images/book-2-line__active.svg'),
    inactive: require('../../../assets/images/book-2-line__inactive.svg')
  }
}

const Me: React.FC = () => {
  const [activeKey, setActiveKey] = useState()
  const handleListItemClick = key => {
    switch (key) {
      case 'about':
        Route.navTo(Route.path.commonAbout)
        break
      default:
        break
    }
  }

  const { id = '', eduPwd = '', cardPwd = '' } = Taro.getStorageSync('account')

  const { pwd: opacPwd = '' } = Taro.getStorageSync('opacAccount')

  const navToCommonBind = () => {
    Route.navTo(Route.path.commonBind)
  }

  const navToLibraryBind = () => {
    Route.navTo(Route.path.libraryReaderBind)
  }

  const navToCommonSetting = () => {
    Route.navTo(Route.path.commonSetting)
  }

  return (
    <View className='page-me'>
      <View className='section-user'>
        <View className='user-info' onClick={navToCommonBind}>
          <OpenData className='user-avatar' type='userAvatarUrl' />
          <View className='user-info-left'>
            <OpenData className='user-nickname' type='userNickName' />
            <Text className='user-account'>
              {id || i18n.tabbarMe.bindTip}
            </Text>
          </View>
        </View>
        <View className='section-binding'>
          <View className='binding-item' onClick={navToCommonBind}>
            <Image
              className='binding-item__img'
              src={eduPwd ? ICON.edu.active : ICON.edu.inactive}
            ></Image>
            <Text
              className={className('binding-item__text', {
                'binding-item__text__active': eduPwd
              })}
            >
              {i18n.tabbarMe.edu}
            </Text>
          </View>
          <View className='binding-item' onClick={navToCommonBind}>
            <Image
              className='binding-item__img'
              src={cardPwd ? ICON.card.active : ICON.card.inactive}
            ></Image>
            <Text
              className={className('binding-item__text', {
                'binding-item__text__active': cardPwd
              })}
            >
              {i18n.tabbarMe.card}
            </Text>
          </View>
          <View className='binding-item' onClick={navToLibraryBind}>
            <Image
              className='binding-item__img'
              src={opacPwd ? ICON.library.active : ICON.library.inactive}
            ></Image>
            <Text
              className={className('binding-item__text', {
                'binding-item__text__active': opacPwd
              })}
            >
              {i18n.tabbarMe.library}
            </Text>
          </View>
        </View>
      </View>

      <View className='section-setting'>
        <View className='list'>
          <View
            className='list-item'
            hoverClass='list-item_active'
            hoverStayTime={100}
            onClick={() => navToCommonSetting()}
          >
            <View className='list-item-left'>
              <Text className='list-item-title'>
                {i18n.tabbarMe.setting}
              </Text>
              {/* <Text className="list-item-desc">
                用自己喜欢的方式，搭建属于自己的摩天大厦。
              </Text> */}
              <View className='arrow'></View>
            </View>
            <View className='list-item-right' />
          </View>
          <Button
            className='list-item feedback-btn'
            openType='contact'
            hoverClass='list-item_active'
            hoverStayTime={100}
            // onClick={() => handleListItemClick('about')}
          >
            <View className='list-item-left'>
              <Text className='list-item-title'>
                {i18n.tabbarMe.feedback}
              </Text>
              {/* <Text className='list-item-title'></Text>
              <Text className='list-item-desc'>
                了解这个小项目，提出积极的意见，探索理想乡。
              </Text> */}
              <View className='arrow'></View>
            </View>

            <View className='list-item-right' />
          </Button>
          <View
            className='list-item'
            hoverClass='list-item_active'
            hoverStayTime={100}
            onClick={() => handleListItemClick('about')}
          >
            <View className='list-item-left'>
              <Text className='list-item-title'>
                {i18n.tabbarMe.about}
              </Text>
              {/* <Text className="list-item-desc">
                了解这个小项目，提出积极的意见，探索理想乡。
              </Text> */}
              <View className='arrow'></View>
            </View>
            <View className='list-item-right' />
          </View>
        </View>
      </View>
      {/* <View className='section-quote'>
        <Text className="quote">测试</Text>
      </View> */}
    </View>
  )
}

export default Me
