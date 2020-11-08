import React, { useState } from "react";
import { View, Image, Text } from '@tarojs/components'
import className from 'classnames'

import Common from '@/services/common'
import { BACKGROUND_IMAGE_STYLE } from '@/services/constant'
import { ICourse } from '@/interfaces/couese'

import './index.scss'

interface IDayDate {
  date: string
  day: string
}

interface IProps {
  schedule: Array<Array<ICourse>>
  sessionList: Array<any>
  dayDateList: Array<IDayDate>
  customHeaderStyle?: any
  background?: string
  backgroundStyle?: number
  onCourseClick: Function,
  headerClass?: any
}

const ScheduleTable: React.FC<IProps> = props => {
  const {
    schedule = [],
    sessionList = [],
    dayDateList = [],
    customHeaderStyle,
    background,
    backgroundStyle = 0,
    onCourseClick
  } = props

  const [currDate, setCurrDate] = useState(
    `${new Date().getMonth() + 1}/${new Date().getDate()}`
  )
  const createCourseElem = course => {
    if (course.flex !== 0) {
      return (
        <View
          hoverClass='course__hover'
          hoverStayTime={100}
          key={course}
          className='course'
          style={{
            flex: course.flex,
            backgroundColor: course.color,
            padding: `${course.flex > 1 ? (course.flex - 1) * 2 : 0}rpx 0.25rem`
          }}
          onClick={() => onCourseClick(course)}
        >
          <Text className='course-title'>{course.courseName}</Text>
          <Text className='course-location'>{course.location}</Text>
        </View>
      )
    }
  }

  const renderSidebar = sessionList => {
    return (
      <View className='schedule-column schedule-column-sidebar'>
        {sessionList.map(session => {
          return (
            <View className='cell session' key={session}>
              <Text>{session}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  const renderScheduleHeader = () => {
    const scheduleHeaderClass = className('schedule-header', {
      [props.headerClass]: true
    })

    return (
      <View className={scheduleHeaderClass} style={customHeaderStyle}>
        <View className='month'>
          <Text></Text>
        </View>
        {dayDateList.map(item => {
          const dateColor = date =>
            className('weekday', {
              weekday__curr: date === currDate
            })
          return (
            <View className={dateColor(item.date)} key={item.date}>
              <Text className='weekday-day'>{item.day}</Text>
              <Text className='weekday-date'>{item.date}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  const scheduleBodyClass = className('schedule-body', {})

  const backgroundClass = className('schedule-background', {
    'schedule-background__blur': backgroundStyle === BACKGROUND_IMAGE_STYLE.BLUR
  })
  return (
    <View className='schedule'>
      {background && (
        <Image
          className={backgroundClass}
          src={background}
          style={{ top: `${Common.getNavbarHeight() + 40}PX` }}
          mode='aspectFill'
        />
      )}

      {renderScheduleHeader()}

      <View className={scheduleBodyClass}>
        {renderSidebar(sessionList)}

        {schedule.map((sectionList, index) => {
          return (
            <View
              className='schedule-column schedule-column-course'
              key={`column-${index}`}
            >
              {sectionList.map(
                (course, index) =>
                  course.flex !== 0 && (
                    <View
                      hoverClass='course__hover'
                      hoverStayTime={100}
                      key={index}
                      className='cell course'
                      style={{
                        flex: course.flex,
                        backgroundColor: course.color,
                        padding: `${
                          course.flex > 1 ? (course.flex - 1) * 2 : 0
                        }rpx 0.25rem`
                      }}
                      onClick={() => onCourseClick(course)}
                    >
                      <Text className='course-break-word course-name'>
                        {course.courseName}
                      </Text>
                      <Text className='course-break-word'>
                        {course.location}
                      </Text>
                    </View>
                  )
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default ScheduleTable
