import React, { useState, useEffect } from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import className from 'classnames'

import { SAVE, EDIT, DELETE } from '@/services/constant'
import { ICourse } from '@/interfaces/couese'
import { CourseType } from '@/data/enums/course-type'
import util from '@/util'
import i18n from '@/i18n'

import './index.scss'

interface IProps {
  schedule: Array<Array<ICourse>>
  btnList: Array<any>
  onSave?: Function
  onEdit?: Function
  onDelete?: Function
}

const ScheduleTab: React.FC<IProps> = props => {
  const { schedule, btnList, onSave, onEdit, onDelete } = props

  const [currDay, setCurrDay] = useState(0)
  const [currDaySchedule, setCurrDaySchedule] = useState([] as Array<ICourse>)
  const [courseLength, setCourseLength] = useState(0)

  const weekTypeList = [
    i18n.weekType.all,
    i18n.weekType.odd,
    i18n.weekType.even
  ]

  useEffect(() => {
    const day = util.getCurrDay()
    setCurrDay(day)
  }, [])

  useEffect(() => {
    setCurrDaySchedule(schedule[currDay] || ([] as Array<ICourse>))
  }, [schedule, currDay])

  useEffect(() => {
    let tempLength = 0
    if (!currDaySchedule) {
      return
    }
    currDaySchedule.forEach(course => {
      tempLength += course.courseName !== '' ? 1 : 0
    })
    setCourseLength(tempLength)
  }, [currDaySchedule])

  const dayClass = day =>
    className('day', {
      day__active: day === currDay
    })

  const handleDayChange = index => {
    setCurrDay(index)
  }

  return (
    <View className='component-schedule-tab'>
      <View className='day-list'>
        {util.getDayList().map((day, index) => (
          <View
            className={dayClass(index)}
            hoverClass='day__hover'
            hoverStayTime={100}
            onClick={() => handleDayChange(index)}
            key={day}
          >
            <Text key={day} className='day-text'>
              {day}
            </Text>
          </View>
        ))}
      </View>
      <View className='schedule'>
        {!courseLength && <View className='empty'>Empty</View>}
        {currDaySchedule.map(
          (item, index) =>
            item.courseName !== '' && (
              <View className='tab-course' key={item.id}>
                <View className='course-info'>
                  <Text className='course-name'>
                    {item.type === CourseType.custom ? '[自定义] ' : ''}
                    {item.courseName}
                  </Text>
                  <View className='course-desc'>
                    <Text className='course-desc__left'>{item.location}</Text>
                    <Text className='course-desc__right'>{item.teacher}</Text>
                  </View>
                  <View className='course-desc'>
                    <Text className='course-desc__left'>
                      {`${i18n.eduSchedule.editCourse.sessions} ${
                        item.firstSession
                      } - ${item.lastSession}`}
                    </Text>
                    <Text className='course-desc__right'>
                      {`${i18n.eduSchedule.editCourse.weeks} ${
                        item.firstWeek
                      } - ${item.lastWeek} (${weekTypeList[item.oddOrEven]})`}
                    </Text>
                  </View>
                </View>
                <View className='course-ctrl'>
                  {btnList.includes(SAVE) && (
                    <View
                      className='course-ctrl-btn'
                      hoverClass='course-ctrl-btn__active'
                      hoverStayTime={100}
                      onClick={() => onSave && onSave(item, index)}
                    >
                      <Image
                        className='course-ctrl-btn__icon'
                        src={require('../../assets/images/save-line-green.svg')}
                      ></Image>
                    </View>
                  )}
                  {btnList.includes(EDIT) && (
                    <View
                      className='course-ctrl-btn'
                      hoverClass='course-ctrl-btn__active'
                      hoverStayTime={100}
                      onClick={() => onEdit && onEdit(item, index)}
                    >
                      <Image
                        className='course-ctrl-btn__icon'
                        src={require('../../assets/images/edit-box-line.svg')}
                      ></Image>
                    </View>
                  )}
                  {btnList.includes(DELETE) && (
                    <View
                      className='course-ctrl-btn'
                      hoverClass='course-ctrl-btn__active'
                      hoverStayTime={100}
                      onClick={() => onDelete && onDelete(item, index)}
                    >
                      <Image
                        className='course-ctrl-btn__icon'
                        src={require('../../assets/images/delete-bin-line.svg')}
                      ></Image>
                    </View>
                  )}
                </View>
              </View>
            )
        )}
      </View>
    </View>
  )
}

export default ScheduleTab
