import React, { useEffect } from "react";
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import i18n, { switchLanguage } from '@/i18n'
import { User } from '@/services/user'
import { SETTING, LANGUAGE, LANGUAGE_CHAR_LIST } from '@/services/constant'

import { setUserSetting } from '@/store/actions/user'

import './index.scss'

const Setting: React.FC = () => {
  const setting = useSelector<any, any>(state => state.user.setting)

  const dispatch = useDispatch()

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.route.commonSetting })
    return () => {
      User.setTabbar()
    }
  }, [])

  const LANGUAGE_MAP = {
    [LANGUAGE.AUTO]: i18n.commonSetting.language.system,
    [LANGUAGE.ZH]: i18n.commonSetting.language.cn,
    [LANGUAGE.EN]: i18n.commonSetting.language.en
  }

  const chooseLanguage = () => {
    Taro.showActionSheet({
      itemList: Object.values(LANGUAGE_MAP)
    }).then(res => {
      switchLanguage(LANGUAGE_CHAR_LIST[res.tapIndex])
      console.log(
        'bb',
        Object.assign(setting, { language: LANGUAGE_CHAR_LIST[res.tapIndex] })
      )
      dispatch(
        setUserSetting({
          setting: Object.assign(setting, {
            language: LANGUAGE_CHAR_LIST[res.tapIndex]
          })
        })
      )
      // Taro.reLaunch({ url: Route.path.tabbarIndex })
    })
  }
  return (
    <View>
      <View className='list'>
        <View className='list-item'>
          <Text>{i18n.commonSetting.language.title}</Text>
          <Text onClick={chooseLanguage}>
            {LANGUAGE_MAP[setting[SETTING.LANGUAGE]]}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Setting
