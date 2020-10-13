import React, { useEffect } from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image, Switch } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'

import { USER_SET_SETTING_SCHEDULE } from '@/store/constants/user'
import { User } from '@/services/user'
import {
  BACKGROUND_IMAGE_STYLE,
  SETTING,
  SETTING_SCHEDULE
} from '@/services/constant'
import { ISettings } from '@/interfaces/couese'
import i18n from '@/i18n'

import './index.scss'

const Advanced = () => {
  const setting: ISettings =
    useSelector<any, any>(state => state.user.setting.schedule) || {}
  const dispatch = useDispatch()

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.route.scheduleAdvanced })
  }, [])

  const handleSetting = (key, value) => {
    const _setting = { ...setting, [key]: value }
    dispatch({
      type: USER_SET_SETTING_SCHEDULE,
      payload: { field: key, value: value }
    })
    User.setSetting(_setting, SETTING.SCHEDULE)
  }

  const handleSwitchChange = (key, e) => {
    handleSetting(key, e.detail.value)
  }

  const IMAGE_STYLE_LIST = [
    i18n.eduSchedule.advanced.origin,
    i18n.eduSchedule.advanced.blur
  ]

  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
      .then(res => {
        if (res.tempFiles.length > 0) {
          handleSetting(SETTING_SCHEDULE.IMAGE_URL, res.tempFiles[0].path)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changeImageStyle = () => {
    Taro.showActionSheet({
      itemList: IMAGE_STYLE_LIST
    }).then(res => {
      if (res.tapIndex === BACKGROUND_IMAGE_STYLE.ORIGIN) {
        handleSetting(
          SETTING_SCHEDULE.IMAGE_STYLE,
          BACKGROUND_IMAGE_STYLE.ORIGIN
        )
      } else if (res.tapIndex === BACKGROUND_IMAGE_STYLE.BLUR) {
        handleSetting(SETTING_SCHEDULE.IMAGE_STYLE, BACKGROUND_IMAGE_STYLE.BLUR)
      }
    })
  }

  return (
    <View className='page-advanced'>
      <View className='section'>
        <Text className='section-title'></Text>
        <View className='section-container'>
          <View className='item'>
            <Text>{i18n.eduSchedule.advanced.showNotCurrWeekCourse}</Text>
            <Switch
              color='#00caa9'
              checked={setting.showNotCurrWeekCourse}
              onChange={e =>
                handleSwitchChange(
                  SETTING_SCHEDULE.SHOW_NOT_CURR_WEEK_COURSE,
                  e
                )
              }
            />
          </View>
          <View className='item'>
            <Text>{i18n.eduSchedule.advanced.customBackground}</Text>
            <Switch
              color='#00caa9'
              checked={setting.customBackground}
              onChange={e =>
                handleSwitchChange(SETTING_SCHEDULE.CUSTOM_BACKGROUND, e)
              }
            />
          </View>
          {setting.customBackground && (
            <View className='item' onClick={chooseImage}>
              <Text>{i18n.eduSchedule.advanced.chooseImage}</Text>
              {setting.imageUrl && (
                <Image className='bg-thumb' src={setting.imageUrl} />
              )}
              {!setting.imageUrl && (
                <View className='bg-thumb' />
              )}
            </View>
          )}
          {setting.customBackground && (
            <View className='item' onClick={changeImageStyle}>
              <Text>{i18n.eduSchedule.advanced.imageStyle}</Text>
              <Text>{IMAGE_STYLE_LIST[setting.imageStyle || 0]}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Advanced
