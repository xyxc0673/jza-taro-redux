import React, { useState, useEffect, useCallback }  from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { useI18n } from "@i18n-chain/react";

import Tip from '@/tip'
import Route from '@/route'
import Edu from '@/services/edu'
import {
  setMySchedule,
  setCustomSchedule,
  setEditingCourse
} from '@/store/actions/edu'
import { screenWidth } from '@/utils/adapter'
import ScheduleTab from '@/components/schedule-tab'
import { EDIT, DELETE } from '@/services/constant'
import { CourseType } from '@/data/enums/course-type'
import { EditMode } from '@/data/enums/edit-mode'
import { ICourse } from '@/interfaces/couese'
import i18n from '@/i18n'

import './index.scss'

const Manage: React.FC = () => {
  useI18n(i18n)
  
  const [schedule, setSchedule] = useState([] as Array<Array<ICourse>>)
  const mySchedule = useSelector<any, any>(state => state.edu.mySchedule)
  const customSchedule = useSelector<any, any>(
    state => state.edu.customSchedule
  )
  const currWeek = useSelector<any, any>(state => state.edu.currWeek)

  useEffect(() => {
    settingList(mySchedule, customSchedule)
  }, [customSchedule, mySchedule, settingList])

  useEffect(() => {
    settingList(mySchedule, customSchedule)
  }, [mySchedule, customSchedule, settingList])

  const dispatch = useDispatch()

  const settingList = useCallback((_mySchedule, _customSchedule) => {
    const _schedule = Edu.initSchedule(
      [..._mySchedule, ..._customSchedule],
      currWeek,
      -1,
      false,
      true
    )
    setSchedule(_schedule)
  }, [currWeek])

  const editCourse = course => {
    dispatch(setEditingCourse({ course: course }))
    Route.navTo(Route.path.eduScheduleEdit, { mode: EditMode.edit })
  }

  const custom = () => {
    Route.navTo(Route.path.eduScheduleEdit, { mode: EditMode.new })
  }

  const deleteCourse = async (course: ICourse) => {
    const res = await Tip.showModal(
      i18n.modalDefaultTitle,
      i18n.eduSchedule.manage.deleteCourse({
        courseName: course.courseName
      })
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
  }

  return (
    <View className='page'>
      <ScheduleTab
        schedule={schedule}
        btnList={[EDIT, DELETE]}
        onEdit={course => editCourse(course)}
        onDelete={course => deleteCourse(course)}
      />
      <View
        className='btn add'
        hoverClass='add__hover'
        hoverStayTime={100}
        style={{ width: '150px', left: `${(screenWidth - 150) / 2}px` }}
        onClick={custom}
      >
        <Image
          className='add-icon'
          src={require('../../../../assets/images/add-line.svg')}
        ></Image>
        <Text className='add-text'>
          {i18n.eduSchedule.manage.customize}
        </Text>
      </View>
    </View>
  )
}

export default Manage
