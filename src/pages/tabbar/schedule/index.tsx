import React, { useCallback, useEffect, useState } from "react";
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import { useI18n } from "@i18n-chain/react";

import Route from '@/route'
import Messages from '@/messages'
import Edu from '@/services/edu'
import { scheduleSettingList } from '@/services/constant'
import ScheduleTable from '@/components/schedule-table'
import CourseModal from '@/components/course-modal'

import {
  setEditingCourse,
  setCustomSchedule,
  setMySchedule
} from '@/store/actions/edu'
import { EditMode } from '@/data/enums/edit-mode'
import Tip from '@/tip'
import { CourseType } from '@/data/enums/course-type'
import { ICourse } from '@/interfaces/couese'
import i18n from '@/i18n'

import './index.scss'

import Navigation from './navigation'
import WeekTab from './week-tab'

const weekList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
]

const TabbarSchedule: React.FC = () => {
  useI18n(i18n)
  
  const currWeek = useSelector<any, any>(state => state.edu.currWeek)
  const mySchedule = useSelector<any, any>(state => state.edu.mySchedule)
  const customSchedule = useSelector<any, any>(
    state => state.edu.customSchedule
  )
  const systemInfo = useSelector<any, any>(
    state => state.common.systemInfo
  )
  const setting = useSelector<any, any>(state => state.user.setting)

  const [schedule, setSchedule] = useState([] as Array<any>)
  const [dayDateList, setDayDateList] = useState([] as Array<any>)
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [showWeekTab, setShowWeekTab] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState({} as ICourse)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const sessionList = Edu.initSessionList()

  const dispatch = useDispatch()

  const initSchedule = useCallback(
    week => {
      const _dayDateList = Edu.getDayDate(week)

      const _schedule = Edu.initSchedule(
        [...mySchedule, ...customSchedule],
        week
      )
      setSchedule(_schedule)
      setDayDateList(_dayDateList)
    },
    [customSchedule, mySchedule]
  )

  const switchWeek = useCallback(
    week => {
      initSchedule(week)
      setSelectedWeek(week)
    },
    [initSchedule]
  )

  useEffect(() => {
    if (!currWeek) {
      return
    }

    initSchedule(currWeek)
    switchWeek(currWeek)
  }, [currWeek, initSchedule, switchWeek])

  useEffect(() => {
    initSchedule(currWeek)
  }, [mySchedule, customSchedule, setting, initSchedule, currWeek])

  const selectedWeekStr = selectedWeek >= 1 && selectedWeek <= 20
  ? i18n.eduSchedule.editCourse.week({ week: selectedWeek })
  : i18n.tabbarSchedule.holiday

  const handleWeekBar = () => {
    setShowWeekTab(!showWeekTab)
  }

  const handleSetting = async () => {
    try {
      const res = await Taro.showActionSheet({
        itemList: [
          i18n.route.scheduleSetting,
          i18n.route.scheduleManage,
          i18n.route.scheduleRecommend,
          i18n.route.scheduleAdvanced
        ]
      })

      switch (res.tapIndex) {
        case scheduleSettingList.changeSchedule:
          Route.navTo(Route.path.eduScheduleSetting)
          break
        case scheduleSettingList.manageCourse:
          Route.navTo(Route.path.eduScheduleManage)
          break
        case scheduleSettingList.recommendSchedule:
          Route.navTo(Route.path.eduRecommendIndex)
          break
        case scheduleSettingList.advancedSchedule:
          Route.navTo(Route.path.eduAdvancedSchedule)
          break
        default:
          break
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleCourseClick = (course: ICourse) => {
    if (course.courseName) {
      setSelectedCourse(course)
      setShowCourseModal(true)
      setShowWeekTab(false)
    } else {
      setShowWeekTab(false)
      Route.navTo(Route.path.eduScheduleEdit, {
        day: course.index[0],
        session: course.index[1]
      })
    }
  }

  const closeCourseModal = () => {
    setShowCourseModal(false)
  }

  const navToEdit = () => {
    dispatch(setEditingCourse({ course: selectedCourse }))
    closeCourseModal()
    Route.navTo(Route.path.eduScheduleEdit, { mode: EditMode.edit })
  }

  const handleDelete = async () => {
    const course = selectedCourse
    const res = await Tip.showModal(
      Messages.modalDefaultTitle,
      Messages.eduSchedule.manage.deleteCourse.replace(
        '${courseName}',
        course.courseName
      )
    )

    if (!res.confirm) {
      return
    }

    const storageSchedule =
      course.type === CourseType.user ? mySchedule : customSchedule

    const filteredSchedule = storageSchedule.filter(
      item => item.id !== course.id
    )

    if (course.type === CourseType.custom) {
      dispatch(setCustomSchedule({ customSchedule: filteredSchedule }))
    } else {
      dispatch(setMySchedule({ mySchedule: filteredSchedule }))
    }

    closeCourseModal()
  } 

  const scheduleHeaderClass = className('schedule-header', {
    'schedule-header__with-week-tab': showWeekTab
  })

  return (
    <View className='schedule-page'>
      {selectedCourse && (
        <CourseModal
          isOpened={showCourseModal}
          course={selectedCourse}
          onClose={closeCourseModal}
          onEdit={navToEdit}
          onDelete={handleDelete}
        />
      )}

      <Navigation
        title={selectedWeekStr}
        onSettingClick={handleSetting}
        onWeekClick={handleWeekBar}
      />

      <WeekTab
        currWeek={currWeek}
        selectedWeek={selectedWeek}
        showWeekTab={showWeekTab}
        weekList={weekList}
        switchWeek={switchWeek}
      />

      <ScheduleTable
        dayDateList={dayDateList}
        schedule={schedule}
        headerClass={scheduleHeaderClass}
        customHeaderStyle={{
          top: showWeekTab ? `${systemInfo.navigationHeight + systemInfo.statusBarHeight + 50}PX` : `${systemInfo.navigationHeight + systemInfo.statusBarHeight}PX`
        }}
        sessionList={sessionList}
        background={
          setting.schedule.customBackground && setting.schedule.imageUrl
        }
        backgroundStyle={setting.schedule.imageStyle}
        onCourseClick={handleCourseClick}
      />
    </View>
  )
}

export default TabbarSchedule
