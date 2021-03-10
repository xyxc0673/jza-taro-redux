import React, { useCallback, useState } from "react";
import { View, Image, Text, ITouchEvent } from '@tarojs/components'
import className from 'classnames'

import Common from '@/services/common'
import { BACKGROUND_IMAGE_STYLE } from '@/services/constant'
import { ICourse } from '@/interfaces/couese'

import './index.scss'
import i18n from "@/i18n";
import Tip from "@/tip";

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
  onCourseClick: Function
  headerClass?: any
  changeWeek: Function
  backWeekVisible: boolean,
  selectedWeek: number
  onGoBack: Function
}

const ScheduleTable: React.FC<IProps> = props => {
  const {
    schedule = [],
    sessionList = [],
    dayDateList = [],
    customHeaderStyle,
    background,
    backgroundStyle = 0,
    onCourseClick,
    backWeekVisible,
    selectedWeek,
    onGoBack,
    changeWeek
  } = props

  const [currDate] = useState(
    `${new Date().getMonth() + 1}/${new Date().getDate()}`
  )

  const [touchStartX, setTouchStartX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchMoveX, setTouchMoveX] = useState(0)
  const [touchMoveY, setTouchMoveY] = useState(0)

  const handleTouchStart = useCallback(
    (e: ITouchEvent) => {
      setTouchStartX(e.touches[0].pageX)
      setTouchStartY(e.touches[0].pageY)
    },
    [],
  )

  const handleTouchMove = useCallback(
    (e: ITouchEvent) => {
      setTouchMoveX(e.touches[0].pageX)
      setTouchMoveY(e.touches[0].pageY)
    },
    [],
  )

  const handleTouchEnd = useCallback(
    () => {
      let deltaX = touchMoveX - touchStartX
      let deltaY = touchMoveY - touchStartY

      if (Math.sign(deltaX) === -1) {
        deltaX *= -1
      }

      if (Math.sign(deltaY) === -1) {
        deltaY *= -1
      }

      const triggerValue = 55

      if (deltaX > deltaY) {
        if (touchMoveX - touchStartX <= -triggerValue) {
          handleChangeWeek(1)
          clearTouchCoor()
        }

        if (touchMoveX - touchStartX >= triggerValue) {
          handleChangeWeek(-1)
          clearTouchCoor()
        }
      }
    },
    [touchMoveX, touchStartX, touchMoveY, touchStartY, handleChangeWeek],
  )

  const handleChangeWeek = useCallback(
    (value) => {
      const afterWeek = selectedWeek + value
      if (afterWeek < 1 || afterWeek > 25) {
        Tip.showToast(i18n.eduSchedule.outOfRange, false)
        return
      }
      changeWeek && changeWeek(value)
    },
    [changeWeek, selectedWeek],
  )

  const clearTouchCoor = () => {
    setTouchStartX(0)
    setTouchStartY(0)
    setTouchMoveX(0)
    setTouchMoveY(0)
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
    <View className='schedule' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <View
        className={className('back-week', {
          'back-week--visible': backWeekVisible
        })}
        onClick={() => onGoBack()}
      >
        <Text className='back-week__current'>{i18n.eduSchedule.editCourse.week({ week: selectedWeek })}</Text>
        <Image className='back-week__image' src={require('../../assets/images/arrow-go-back-fill.svg')} />
      </View>

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
                        backgroundColor: course.currentColor,
                        padding: `${course.flex > 1 ? (course.flex - 1) * 2 : 0
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
