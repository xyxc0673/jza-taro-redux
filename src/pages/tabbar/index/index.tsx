import Taro, { usePullDownRefresh } from '@tarojs/taro'
import React, { useState, useEffect, useCallback } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import {
  setMySchedule,
  setCustomSchedule,
  setCurrWeek,
  setAccount,
  setRecommendScheduleList,
  setRecommendSchedule,
} from '@/store/actions/edu'
import { setUserSetting } from '@/store/actions/user'
import { setSystemInfo } from '@/store/actions/common'

import Route from '@/route'
import Edu from '@/services/edu'
import { User } from '@/services/user'
import Common from '@/services/common'

import { } from '@/store/actions/'
import i18n from '@/i18n'
import IDayDate from '@/interfaces/day-date'

import { ICourse } from '@/interfaces/couese'

import MagicBox from './magic-box'
import ScheduleCard from './schedule-card'

import BalanceCard from './balance-card'

import './index.scss'
import WelcomeCard from './welcome-card'

const Index = () => {
  const [schedule, setSchedule] = useState([] as Array<ICourse>)
  const [currDay, setCurrDay] = useState(0)
  const [dayDateList, setDayDateList] = useState([] as Array<IDayDate>)
  const [timestamp, setTimestamp] = useState(new Date().getTime())
  const currWeek = useSelector((state) => state.edu.currWeek)
  const mySchedule = useSelector<any, any>((state) => state.edu.mySchedule)
  const customSchedule = useSelector<any, any>(
    (state) => state.edu.customSchedule
  )
  const recommendScheduleList = useSelector<any, any>(
    (state) => state.edu.recommendScheduleList
  )
  const [recommendRenderedScheduleList, setRenderedScheduleList] = useState(
    [] as Array<any>
  )

  const dispatch = useDispatch()

  const getInfo = useCallback(async () => {
    const _mySchedule = Edu.getMySchedule()
    const _customSchedule = Edu.getCustomSchedule()
    const _currWeek = await Edu.getCurrWeek()
    const _systemInfo = Common.getSystemInfo()
    const _setting = User.getSetting()

    const _account = Taro.getStorageSync('account')
    const _recommendScheduleList = Edu.getRecommendScheduleList()

    const day = new Date().getDay()

    setCurrDay(day === 0 ? 7 : day)
    dispatch(setAccount(_account))

    dispatch(setCurrWeek({ currWeek: _currWeek }))
    dispatch(setMySchedule({ mySchedule: _mySchedule }))
    dispatch(setCustomSchedule({ customSchedule: _customSchedule }))
    dispatch(setSystemInfo({ systemInfo: _systemInfo }))
    dispatch(setUserSetting({ setting: _setting }))
    dispatch(setRecommendScheduleList({ scheduleList: _recommendScheduleList }))

    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
      animation: {
        duration: 50,
        timingFunc: 'easeIn',
      },
    })
  }, [dispatch])

  useEffect(() => {
    getInfo()
  }, [getInfo])

  useEffect(() => {
    const scheduleList = [] as Array<any>

    for (let item of recommendScheduleList) {
      if (!item.pin) {
        continue
      }
      const _daySchedule = Edu.initSchedule(
        [...item.schedule],
        currWeek,
        currDay
      )
      scheduleList.push({
        id: item.id,
        title: `${item.classValue} ${item.yearValue} ${item.semesterValue}`,
        schedule: _daySchedule,
      })
    }
    setRenderedScheduleList(scheduleList)
  }, [recommendScheduleList, currWeek, currDay])

  useEffect(() => {
    console.log('timestamp', timestamp)
    const _dayDateList = Edu.getDayDate(currWeek)

    const _schedule = Edu.initSchedule(
      [...mySchedule, ...customSchedule],
      currWeek,
      currDay
    )
    console.log('initSchedule', currWeek, currDay)
    setSchedule(_schedule)
    setDayDateList(_dayDateList)
    Taro.stopPullDownRefresh()
  }, [mySchedule, customSchedule, currWeek, currDay, timestamp])

  usePullDownRefresh(() => {
    setTimestamp(new Date().getTime())
  })

  const navToLibrary = () => {
    Route.navTo(Route.path.libraryBookSearch)
  }

  const navToCard = () => {
    Route.navTo(Route.path.cardIndex)
  }

  const navToEdu = () => {
    Taro.switchTab({ url: Route.path.tabbarSchedule })
  }

  const navToRecommend = (id) => {
    const _schedule = recommendScheduleList.filter((item) => item.id === id)
    dispatch(setRecommendSchedule({ schedule: _schedule[0].schedule }))
    Route.navTo(Route.path.eduRecommendSchedule, {
      info: JSON.stringify({
        ..._schedule[0],
        ...{ schedule: [] },
      }),
    })
  }

  const getHello = () => {
    const date = dayjs(new Date())
    const hour = date.hour()
    if (hour > 1) {
      return
    }
  }

  return (
    <View className='page-index'>
      <View className='top'>
        <View className='user-info'>
          <View className='user-sayhi'>
            <Text className='hello'>
              {dayjs()
                .locale(i18n._.getLocaleName() === 'zh' ? 'zh-cn' : 'en')
                .format('A好')}
            </Text>
            <Button></Button>
          </View>
        </View>
        <View className='date'>
          {`${dayjs()
            .locale(i18n._.getLocaleName() === 'zh' ? 'zh-cn' : 'en')
            .format('MMM D dddd')}`}
        </View>
      </View>
      <View className='panel'>
        <MagicBox></MagicBox>
        <WelcomeCard onClick={() => Route.navTo(Route.path.eduScheduleSetting)}></WelcomeCard>
        {/* <BalanceCard
          balance={balance}
          onClick={navToCard}
          isBinded={account.cardPwd}
        /> */}
        <ScheduleCard
          schedule={schedule}
          onClick={navToEdu}
          title={i18n.tabbarIndex.scheduleCard.title}
        />
        {recommendRenderedScheduleList.map((item) => (
          <ScheduleCard
            key={item.id}
            schedule={item.schedule}
            onClick={() => navToRecommend(item.id)}
            title={item.title}
          />
        ))}
      </View>
    </View>
  )
}

Index.config = {
  enablePullDownRefresh: true,
}

export default Index
