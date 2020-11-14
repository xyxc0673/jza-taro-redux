import React, { useState }  from "react";
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { useI18n } from "@i18n-chain/react";

import Tip from '@/tip'
import Route from '@/route'
import version from "@/data/version";
import FloatBottomModal from '@/components/float-bottom-modal'
import i18n from '@/i18n'

import './index.scss'
import config from "@/utils/config";

const MODAL_TYPE = {
  CHANGELOG: 'Changelog',
  THANKS: 'Thanks 🧚‍♀️',
  VERSION: 'Version'
}

const About: React.FC = () => {
  useI18n(i18n)

  useShareAppMessage(() => {
    return {
      title: i18n.shareTitle,
      path: '/pages/tabbar/index/index',
      imageUrl: config.shareImageUrl
    }
  })

  const [activeModal, setActiveModal] = useState('')
  const [versionClickedTimes, setVersionClickTimes] = useState(0)

  const renderChangeLog = (
    <View className='changelog'>
      <Text className='changelog-date'>{`${version.version} (${version.releaseDate.format('YYYY-MM-DD')})`}</Text>
      <Text className='changelog-item'>{i18n.changeLog}</Text>
    </View>
  )

  const renderThanks = (
    <View className='changelog'>
      <View className='thanks-item'>
        <Text className='thanks-name'>TARO</Text>
        <Text className='thanks-desc'>{i18n.about.thanks.taro}</Text>
      </View>
      <View className='thanks-item'>
        <Text className='thanks-name'>UNDRAW</Text>
        <Text className='thanks-desc'>{i18n.about.thanks.undraw}</Text>
      </View>
      <View className='thanks-item'>
        <Text className='thanks-name'>REMIX ICON</Text>
        <Text className='thanks-desc'>{i18n.about.thanks.remix}</Text>
      </View>
      <View className='thanks-item'>
        <Text className='thanks-name'>{i18n.about.thanks.speical}</Text>
        <Text className='thanks-desc'>{i18n.about.thanks.snoopy}</Text>
      </View>
    </View>
  )

  const renderVersion = (
    <View className='version-modal'>
      <Button type='default' openType='feedback' className='clear-data'>
        反馈意见
      </Button>
      <Button type='default' openType='launchApp' className='clear-data'>
        启动APP
      </Button>
      <Button type='default' openType='lifestyle' className='clear-data'>
        生活方式
      </Button>
      <Button
        type='warn'
        className='clear-data'
        onClick={() => {
          Tip.showModal('三思！', '你确认要清空所有数据吗？', true).then(
            res => {
              if (res.confirm) {
                Taro.clearStorage()
                Taro.reLaunch({ url: Route.path.tabbarIndex })
              }
            }
          )
        }}
      >
        清空所有数据
      </Button>
    </View>
  )

  return (
    <View className='page'>
      <Image
        src={require('../../../assets/images/undraw_walking_outside.svg')}
        mode='aspectFit'
        className='undraw'
      />
      <View className='container'>
        <Text className='program-name'>{i18n.appName}</Text>
        <Text
          className='version'
          onClick={() => {
            if (versionClickedTimes >= 2 && versionClickedTimes < 5) {
              Tip.showToast(
                i18n.about.devModeTip({ times: 6 - versionClickedTimes - 1 }),
                false
              )
            }
            if (versionClickedTimes + 1 >= 6) {
              setActiveModal(MODAL_TYPE.VERSION)
              setVersionClickTimes(0)
            } else {
              setVersionClickTimes(versionClickedTimes + 1)
            }
          }}
        >
          {`${version.version} (${version.releaseDate.format('YYYY-MM-DD')})`}
        </Text>

        <View className='item-container'>
          <View className='item'>
            <Image
              src={require('../../../assets/images/magic-line.svg')}
              mode='aspectFit'
              className='item-img'
            />
            <View className='item-text'>
              <Text className='link-title'>{i18n.about.author}</Text>
              <Text
                className='link-text'
                onClick={() => {
                  Taro.setClipboardData({ data: 'xyxc0673@gmail.com' })
                }}
              >
                ULTRA FUTURE
              </Text>
            </View>
          </View>
          <View className='item'>
            <Image
              src={require('../../../assets/images/github-line.svg')}
              mode='aspectFit'
              className='item-img'
            />
            <View className='item-text'>
              <Text className='link-title'>{i18n.about.openSource}</Text>
              <Text
                className='link-text'
                onClick={() => {
                  Taro.setClipboardData({
                    data: 'https://www.github.com/xyxc0673/jza-taro-redux'
                  })
                }}
              >
                JZA-TARO-REDUX
              </Text>
            </View>
          </View>
          <View className='item'>
            <Image
              src={require('../../../assets/images/sun-line.svg')}
              mode='aspectFit'
              className='item-img'
            />
            <View className='item-text'>
              <Text
                className='link-title'
                onClick={() => setActiveModal(MODAL_TYPE.CHANGELOG)}
              >
                {i18n.about.changeLog}
              </Text>
              <Text className='link-text'></Text>
            </View>
          </View>
          <View className='item'>
            <Image
              src={require('../../../assets/images/star-smile-line.svg')}
              mode='aspectFit'
              className='item-img'
            />
            <View className='item-text'>
              <Text
                className='link-title'
                onClick={() => setActiveModal(MODAL_TYPE.THANKS)}
              >
                {i18n.about.thanksList}
              </Text>
              <Text className='link-text'></Text>
            </View>
          </View>
          <View className='item'>
            <Image
              src={require('../../../assets/images/share-line.svg')}
              mode='aspectFit'
              className='item-img'
            />
            <Button className='item-text item-share' openType='share'>
              <Text className='link-title'>{i18n.about.shareApp}</Text>
              <Text className='link-text'></Text>
            </Button>
          </View>
        </View>
      </View>
      <FloatBottomModal
        visible={activeModal !== ''}
        title={activeModal}
        onClose={() => setActiveModal('')}
      >
        {activeModal === MODAL_TYPE.CHANGELOG && renderChangeLog}
        {activeModal === MODAL_TYPE.THANKS && renderThanks}
        {activeModal === MODAL_TYPE.VERSION && renderVersion}
      </FloatBottomModal>
    </View>
  )
}

export default About
