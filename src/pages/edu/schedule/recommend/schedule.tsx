import React, { useEffect, useState } from 'react'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { useI18n } from "@i18n-chain/react";

import ScheduleTable from '@/components/schedule-table'
import ScheduleTab from '@/components/schedule-tab'
import Edu from '@/services/edu'
import { useSelector, useDispatch } from 'react-redux'

import { SCHEDULE_TABLE, SCHEDULE_TAB, SAVE } from '@/services/constant'
import Tip from '@/tip'
import {
  setRecommendScheduleList,
  setCustomSchedule,
  setRecommendSchedule,
} from '@/store/actions/edu'
import { ICourse } from '@/interfaces/couese'
import i18n from '@/i18n'
import ISCheduleInfo from '@/interfaces/schedule-info'
import Route from '@/utils/route'

import './schedule.scss'

const RecommendSchedule = () => {
  useI18n(i18n)
  
  const recommendSchedule = useSelector<any, any>(
    (state) => state.edu.recommendSchedule
  )
  const currWeek = useSelector<any, any>((state) => state.edu.currWeek)
  const recommendScheduleList = useSelector<any, any>(
    (state) => state.edu.recommendScheduleList
  )
  const router = useRouter()

  const dispatch = useDispatch()

  const [selectedCourse, setSelectedCourse] = useState({} as ICourse)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [id, setId] = useState('')
  const [routerParams, setRouterParams] = useState({
    info: {
      id: '',
      classValue: '',
      yearValue: '',
      semesterValue: '',
    } as ISCheduleInfo,
  })
  const [scheduleTable, setScheduleTable] = useState([] as Array<any>)
  const [scheduleTab, setScheduleTab] = useState([] as Array<any>)
  const [dayDateList, setDayDateList] = useState([] as Array<any>)
  const [type, setType] = useState(SCHEDULE_TABLE)
  const [sessionList, setSessionList] = useState(Edu.initSessionList())

  const [saved, setSaved] = useState(false)

  useShareAppMessage((res) => {
    const _info = encodeURIComponent(JSON.stringify(routerParams.info))
    const _schedule = encodeURIComponent(JSON.stringify(recommendSchedule))

    return {
      title: `${routerParams.info.classValue} ${routerParams.info.yearValue} ${routerParams.info.semesterValue}`,
      path: `${Route.path.eduRecommendSchedule}?scene=share&info=${_info}&schedule=${_schedule}`,
    }
  })

  useEffect(() => {
    const { params } = router
    if (params.scene === 'share') {
      setRouterParams({
        info: JSON.parse(decodeURIComponent(params.info)),
      })
      dispatch(
        setRecommendSchedule({
          schedule: JSON.parse(decodeURIComponent(params.schedule)),
        })
      )
    } else {
      setRouterParams({
        info: JSON.parse(params.info),
      })
    }
  }, [dispatch, router])

  useEffect(() => {
    const { info } = routerParams

    if (!info.classValue) {
      return
    }

    Taro.setNavigationBarTitle({ title: info.classValue })
    setId(`${info.classKey}-${info.yearKey}-${info.semesterKey}`)
  }, [routerParams])

  useEffect(() => {
    const _dayDateList = Edu.getDayDate(currWeek)
    const _scheduleTable = Edu.initSchedule(
      [...recommendSchedule],
      currWeek,
      -1,
      true
    )
    const _scheduleTab = Edu.initSchedule(
      [...recommendSchedule],
      currWeek,
      -1,
      false,
      true
    )

    setScheduleTable(_scheduleTable)
    setScheduleTab(_scheduleTab)
    setDayDateList(_dayDateList)
  }, [currWeek, recommendSchedule])

  useEffect(() => {
    setSaved(
      recommendScheduleList.filter((item) => item.id === id).length === 1
    )
  }, [recommendScheduleList, id])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setShowCourseModal(true)
  }

  const saveSchedule = () => {
    const data = {
      ...routerParams.info,
      id: id,
      schedule: recommendSchedule,
      pin: true,
    }

    dispatch(
      setRecommendScheduleList({
        scheduleList: [...recommendScheduleList, { ...data }],
      })
    )
    Tip.showToast(i18n.saveSuccess)
  }

  const switchType = () => {
    setType(type === SCHEDULE_TABLE ? SCHEDULE_TAB : SCHEDULE_TABLE)
  }

  const showInformation = () => {
    Tip.showModal(
      i18n.modalDefaultTitle,
      `${routerParams.info.classValue} \\ ${routerParams.info.majorName} \\ ${routerParams.info.yearValue} \\ ${routerParams.info.semesterValue}`,
      false
    )
  }

  const handleSaveCourse = (course) => {
    const newCourse = { ...course, custom: true }
    Edu.saveCustomCourse(newCourse)
    dispatch(setCustomSchedule({ customSchedule: Edu.getCustomSchedule() }))
    Tip.showToast(i18n.saveSuccess)
  }

  const deleteSchedule = () => {
    const afterList = recommendScheduleList.filter((item) => {
      return routerParams.info.id !== item.id
    })
    dispatch(setRecommendScheduleList({ scheduleList: afterList }))
  }

  const handlePin = () => {
    const index = recommendScheduleList.findIndex(
      (item) => routerParams.info.id === item.id
    )
    const newRecommendScheduleList = [...recommendScheduleList]
    newRecommendScheduleList[index] = Object.assign(
      newRecommendScheduleList[index],
      {
        pin: !routerParams.info.pin,
      }
    )
    dispatch(
      setRecommendScheduleList({ scheduleList: newRecommendScheduleList })
    )
    const newParams = { ...routerParams }
    newParams.info.pin = !routerParams.info.pin
    setRouterParams(newParams)
    Tip.showToast(
      newParams.info.pin
        ? i18n.eduSchedule.recommend.pin
        : i18n.eduSchedule.recommend.unpin
    )
  }

  return (
    <View className='page'>
      {/* // Todo
      {selectedCourse && (
        <CourseModal
          isOpened={showCourseModal}
          course={selectedCourse}
          onClose={() => setShowCourseModal(false)}
        />
      )} */}
      <View className='float-container'>
        <View className='float-btn' hoverClass='btn__hover'>
          <Button openType='share'>
            <Image
              src={require('../../../../assets/images/share-circle-line.svg')}
            />
          </Button>
        </View>
        <View
          className='float-btn'
          hoverClass='btn__hover'
          onClick={showInformation}
        >
          <Image
            src={require('../../../../assets/images/information-line.svg')}
          />
        </View>
        <View
          className='float-btn switch'
          hoverClass='btn__hover'
          onClick={switchType}
        >
          <Image src={require('../../../../assets/images/table-line.svg')} />
        </View>
        {saved && routerParams.info.pin && (
          <View
            className='float-btn save'
            hoverClass='btn__hover'
            onClick={handlePin}
          >
            <Image src={require('../../../../assets/images/pushpin-fill.svg')} />
          </View>
        )}
        {saved && !routerParams.info.pin && <View
          className='float-btn save'
          hoverClass='btn__hover'
          onClick={handlePin}
        >
          <Image src={require('../../../../assets/images/pushpin-line.svg')} />
        </View>}

        {!saved && <View
          className='float-btn save'
          hoverClass='btn__hover'
          onClick={saveSchedule}
        >
          <Image src={require('../../../../assets/images/save-line.svg')} />
        </View>}
        {saved && <View
          className='float-btn save'
          hoverClass='btn__hover'
          onClick={deleteSchedule}
        >
          <Image
            src={require('../../../../assets/images/delete-bin-line.svg')}
          />
        </View>}
      </View>
      {type === SCHEDULE_TAB && (
        <ScheduleTab
          schedule={scheduleTab}
          btnList={[SAVE]}
          onSave={handleSaveCourse}
        />
      )}
      {type === SCHEDULE_TABLE && (
        <ScheduleTable
          header-class='schedule-header'
          dayDateList={dayDateList}
          schedule={scheduleTable}
          sessionList={sessionList}
          onCourseClick={handleCourseClick}
        />
      )}
    </View>
  )
}

export default RecommendSchedule
