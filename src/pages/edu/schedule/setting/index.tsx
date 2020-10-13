import React, { useState, useEffect, useCallback } from "react";
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'

import Tip from '@/tip'
import Route from '@/route'
import Messages from '@/messages'
import User from '@/services/user'

import {
  fetchEduSchedule,
  fetchSchollStartDate,
  setMySchedule,
  setRecommendScheduleList,
  setRecommendSchedule
} from '@/store/actions/edu'
import SemesterPicker from '@/components/semester-picker'
import Edu from '@/services/edu'
import { CourseType } from '@/data/enums/course-type'
import { ICourse } from '@/interfaces/couese'
import i18n from '@/i18n'

import pinLineSvg from '../../../../assets/images/pushpin-line.svg'
import pinFillSvg from '../../../../assets/images/pushpin-fill.svg'

import './index.scss'


const ScheduleSetting: React.FC = () => {
  const [grade, setGrade] = useState('')
  const [semester, setSemester] = useState('')
  const recommendScheduleList = useSelector<any, any>(
    state => state.edu.recommendScheduleList
  )
  const account = useSelector<any, any>(
    state => state.edu.account
  )
  const [scheduleList, setScheduleList] = useState([] as Array<any>)

  useEffect(() => {
    const filterMap = {}

    recommendScheduleList.forEach(item => {
      const key = `${item.yearValue} ${item.semesterValue}(${item.yearKey}-${item.semesterKey})`

      if (filterMap[key]) {
        filterMap[key].push(item)
      } else {
        filterMap[key] = [item]
      }
    })

    const filterList = [] as Array<any>

    for (let key in filterMap) {
      filterList.push({
        key: key,
        scheduleList: filterMap[key]
      })
    }
    setScheduleList(filterList)
  }, [recommendScheduleList])

  const dispatch = useDispatch()

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.eduSchedule.setting.title })
  }, [])

  const handleSubmit = async () => {
    const res = await dispatch<any>(fetchEduSchedule({ year: grade, semester }))

    if (!res || res.code !== 1) {
      return
    }

    if (res.data.schedule.length === 0) {
      Tip.showToast(i18n.eduSchedule.setting.emptySchedule)
      return
    }

    const res2 = await dispatch<any>(fetchSchollStartDate())

    if (res2.code !== 1) {
      return
    }

    const schedule = res.data.schedule.map((course: ICourse) =>
      Object.assign(
        {},
        {
          ...course,
          type: CourseType.user,
          id: Edu.generateCourseId(course)
        }
      )
    )

    Edu.setSchoolStartDate(res2.data.date)
    dispatch(setMySchedule({ mySchedule: schedule }))

    Taro.switchTab({ url: Route.path.tabbarSchedule })
  }

  const handlePickerChange = useCallback(e => {
    setGrade(User.gradeRange[e[0]].key)
    setSemester(User.semesterRange[e[1]].key)
  }, [])

  const navToRecommend = () => {
    Route.navTo(Route.path.eduRecommendIndex)
  }

  const navToSchedule = item => {
    dispatch(setRecommendSchedule({ schedule: item.schedule }))
    Route.navTo(Route.path.eduRecommendSchedule, {
      info: JSON.stringify({
        ...item,
        ...{ schedule: [] }
      })
    })
  }

  const pinSchedule = (schedule: number) => {
    const index = Edu.uniqueRecommendSchedule(schedule)
    const newList = [...recommendScheduleList]
    newList[index].pin = !newList[index].pin
    dispatch(setRecommendScheduleList({ scheduleList: [...newList] }))
  }

  return (
    <View className='schedule-page'>
      <View className='form'>
        <View className='form-control'>
          <SemesterPicker userId={account.id} onPickerChange={handlePickerChange} />
        </View>
        <Button className='btn' onClick={handleSubmit}>
          {i18n.confirm}
        </Button>
      </View>
      <View className='recommend'>
        <View className='recommend-header'>
          <Text className='recommend-title'>
            {i18n.eduSchedule.setting.recommend.title}
          </Text>
          <Text className='recommend-nav' onClick={navToRecommend}>
            {i18n.eduSchedule.setting.recommend.search}
          </Text>
        </View>
        <View className='recommend-body'>
          {scheduleList.length === 0 && (
            <View className='empty-view'>
              <Image className='empty-view__img' src={require('../../../../assets/images/undraw_friends.svg')}></Image>
              <Text>{i18n.eduSchedule.setting.emptyList}</Text>
            </View>
          )}
          {scheduleList.map(item => (
            <View key={item.key} className='recommend-schedule-list'>
              <View className='recommend-schedule-list__header'>
                <Text>{item.key}</Text>
              </View>
              <View className='recommend-schedule-list__body'>
                {item.scheduleList.map(schedule => (
                  <View
                    key={schedule.classKey}
                    className='recommend-schedule-item__container'
                  >
                    <View
                      className='recommend-schedule-item'
                      onClick={() => navToSchedule(schedule)}
                    >
                      {schedule.classValue}
                    </View>
                    <Image
                      onClick={() => pinSchedule(schedule)}
                      className='pin-class-btn'
                      src={schedule.pin ? pinFillSvg : pinLineSvg}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default ScheduleSetting
