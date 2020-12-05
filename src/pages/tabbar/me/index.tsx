import React from "react";
import Taro from '@tarojs/taro'
import { useSelector } from "react-redux";
import { Image, OpenData, Text, View } from '@tarojs/components'
import className from 'classnames'
import { useI18n } from "@i18n-chain/react";

import Route from '@/route'

import i18n from '@/i18n'

import './index.scss'
import { LoginType } from "@/data/enums/login-type";

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
  const account = useSelector(state => state.edu.account)
  useI18n(i18n)

  const handleListItemClick = key => {
    switch (key) {
      case 'about':
        Route.navTo(Route.path.commonAbout)
        break
      case 'feedback':
        Route.navTo(Route.path.commonFeedback)
        break
      default:
        break
    }
  }

  const { pwd: opacPwd = '' } = Taro.getStorageSync('opacAccount')

  const navToCommonBind = (type: LoginType) => {
    Route.navTo(Route.path.commonBind, { type })
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
        <View className='user-info' onClick={() => navToCommonBind(LoginType.edu)}>
          <OpenData className='user-avatar' type='userAvatarUrl' />
          <View className='user-info-left'>
            <OpenData className='user-nickname' type='userNickName' />
            <Text className='user-account'>
              {account.id || i18n.tabbarMe.bindTip}
            </Text>
          </View>
        </View>
        <View className='section-binding'>
          <View className='binding-item' onClick={() => navToCommonBind(LoginType.edu)}>
            <Image
              className='binding-item__img'
              src={account.eduPwd ? ICON.edu.active : ICON.edu.inactive}
            ></Image>
            <Text
              className={className('binding-item__text', {
                'binding-item__text__active': account.eduPwd
              })}
            >
              {i18n.tabbarMe.edu}
            </Text>
          </View>
          <View className='binding-item' onClick={() => navToCommonBind(LoginType.card)}>
            <Image
              className='binding-item__img'
              src={account.cardPwd ? ICON.card.active : ICON.card.inactive}
            ></Image>
            <Text
              className={className('binding-item__text', {
                'binding-item__text__active': account.cardPwd
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
          <View
            className='list-item'
            hoverClass='list-item_active'
            hoverStayTime={100}
            onClick={() => handleListItemClick('feedback')}
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
          </View>
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
