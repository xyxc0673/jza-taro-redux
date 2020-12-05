import Taro from '@tarojs/taro'
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Picker, Image, Button, Icon } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import { useI18n } from "@i18n-chain/react";

import {
  fetchEduRecommendCollege,
  eduLoginForToken,
  fetchEduRecommendMajor,
  fetchEduRecommendGrade,
  fetchEduRecommendClass,
  fetchEduRecommendSchedule,
} from '@/store/actions/edu'
import { User } from '@/services/user'
import Route from '@/route'
import Tip from '@/tip'
import i18n from '@/i18n'

import './index.scss'

interface IRange {
  name: string
  key: string
  majorCode: string
  majorName: string
}

interface IClass {
  className: string
  classCode: string
}

const Recommend = () => {
  useI18n(i18n)

  const [showBottmPanel, setShowBottmPanel] = useState(false)
  const [gradeValue, setGradeValue] = useState(4)
  const [collegeValue, setCollegeValue] = useState(0)
  const [majorValue, setMajorValue] = useState(-1)
  const [yearSemesterValue, setYearSemesterValue] = useState([0, 0])

  const [gradeKey, setGradeKey] = useState('')
  const [collegeKey, setCollegeKey] = useState('')
  const [majorKey, setMajorKey] = useState('')

  const recommendScheduleList = useSelector<any, any>(
    (state) => state.edu.recommendScheduleList
  )
  const account = useSelector<any, any>((state) => state.edu.account)
  const token = useSelector<any, string>((state) => state.edu.token)
  const grade: Array<IRange> = useSelector<any, any>(
    (state) => state.edu.recommendGrade
  )
  const college: Array<IRange> = useSelector<any, any>(
    (state) => state.edu.recommendCollege
  )
  const major: Array<IRange> = useSelector<any, any>(
    (state) => state.edu.recommendMajor
  )
  const [yearSemester, setYearSemester] = useState([] as Array<any>)
  const classList: Array<IClass> = useSelector<any, any>(
    (state) => state.edu.recommendClass
  )

  const [startY, setStartY] = useState(0)
  const [offsetSize, setOffsetSize] = useState(0)

  const dispatch = useDispatch()

  const handleGradeChange =
    useCallback((e) => {
      setGradeKey(grade[e.detail.value].key)
      setGradeValue(e.detail.value)

      if (collegeKey !== '' && grade[e.detail.value].key) {
        genYearAndSemesterRange(
          collegeKey.slice(0, 2) + grade[e.detail.value].key.slice(2, 4)
        )
      }
    }, [collegeKey, grade])

  const handleCollegeChange = useCallback(
    (e) => {
      setCollegeKey(college[e.detail.value].key)
      setCollegeValue(e.detail.value)

      if (college[e.detail.value].key && gradeKey !== '') {
        genYearAndSemesterRange(
          college[e.detail.value].key.slice(0, 2) +
          gradeKey.toString().slice(2, 4)
        )
      }
    },
    [college, gradeKey]
  )

  const handleMajorChange = useCallback(
    (e) => {
      setMajorKey(major[e.detail.value].majorCode)
      setMajorValue(e.detail.value)
    },
    [major]
  )

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '班级课表' })
  }, [])

  useEffect(() => {
    dispatch(eduLoginForToken())
    dispatch(fetchEduRecommendGrade())
    dispatch(fetchEduRecommendCollege())
  }, [dispatch, account.eduPwd])

  useEffect(() => {
    if (grade.length > 0) {
      handleGradeChange({ detail: { value: gradeValue } })
    }
  }, [grade, gradeValue, handleGradeChange])

  useEffect(() => {
    genYearAndSemesterRange(collegeKey.slice(0, 2) + gradeKey.slice(2, 4))
  }, [gradeKey, collegeKey])

  useEffect(() => {
    if (college.length > 0) {
      handleCollegeChange({ detail: { value: collegeValue } })
    }
  }, [college, collegeValue, handleCollegeChange])

  useEffect(() => {
    if (major.length > 0) {
      handleMajorChange({ detail: { value: 0 } })
    }
  }, [major, handleMajorChange])

  useEffect(() => {
    if (token !== '' && collegeKey !== '') {
      dispatch(fetchEduRecommendMajor({ college: collegeKey, grade: grade }))
    }
  }, [token, collegeKey, dispatch, grade])

  const handleYearSemesterChange = (e) => {
    setYearSemesterValue(e.detail.value)
  }

  const genYearAndSemesterRange = (id: string) => {
    const user = new User({ id: id })
    setYearSemester([user.gradeRange, user.semesterRange])
    setYearSemesterValue([user.selectYearIndex, user.selectSemesterIndex])
  }

  const handleSubmit = async () => {
    await dispatch(
      fetchEduRecommendClass({
        college: collegeKey,
        major: majorKey,
        grade: gradeKey,
      })
    )

    setShowBottmPanel(true)
  }

  const fetchSchedule = async (scheduleObj) => {
    const yearObj = yearSemester[0][yearSemesterValue[0]]
    const semesterObj = yearSemester[1][yearSemesterValue[1]]

    const res = await dispatch<any>(
      fetchEduRecommendSchedule({
        year: yearObj.key,
        semester: semesterObj.key,
        major: majorKey,
        grade: gradeKey,
        class: scheduleObj.classCode,
      })
    )

    if (res.data.schedule.length === 0) {
      Tip.showToast(i18n.eduSchedule.setting.emptySchedule)
      return
    }

    const id = `${scheduleObj.classCode}-${yearObj.key}-${semesterObj.key}`

    const params = {
      info: JSON.stringify({
        id: id,
        yearKey: yearObj.key,
        yearValue: yearObj.name,
        semesterKey: semesterObj.key,
        semesterValue: semesterObj.name,
        majorKey: majorKey,
        majorValue: majorValue,
        majorName: major[majorValue].majorName,
        gradeKey: gradeKey,
        gradeValue: gradeValue,
        classKey: scheduleObj.classCode,
        classValue: scheduleObj.className,
        pin: recommendScheduleList.findIndex(
          (item) => id === item.id
        ) !== -1
      }),
    }

    Route.navTo(Route.path.eduRecommendSchedule, params)
  }

  const renderYearSemester = () => {
    if (yearSemester.length === 0 || yearSemesterValue.length === 0) {
      return i18n.eduSchedule.recommend.loading
    }

    const yearObj = yearSemester[0][yearSemesterValue[0]]
    const semesterObj = yearSemester[1][yearSemesterValue[1]]

    return `${yearObj.name} ${semesterObj.name}(${yearObj.key}-${semesterObj.key})`
  }

  const renderGrade = () => {
    if (!grade[gradeValue]) {
      return i18n.eduSchedule.recommend.loading
    }

    return i18n.eduSchedule.recommend.grade({ grade: grade[gradeValue].name })
  }

  const navToScheduleSetting = () => {
    Route.navTo(Route.path.eduScheduleSetting)
  }

  return (
    <View className='page'>
      <View className='form'>
        <Picker
          className='picker'
          mode='selector'
          range={grade}
          rangeKey='name'
          value={gradeValue}
          onChange={handleGradeChange}
        >
          <View className='picker-container' hoverClass='picker--hover'>
            <View className='picker-left'>
              <Text className='picker-text'>{renderGrade()}</Text>
            </View>
            <Image
              className='picker-icon'
              src={require('../../../../assets/images/arrow-down-s-line.svg')}
            />
          </View>
        </Picker>
        <Picker
          className='picker'
          mode='selector'
          range={college}
          rangeKey='name'
          value={collegeValue}
          onChange={handleCollegeChange}
        >
          <View className='picker-container' hoverClass='picker--hover'>
            <View className='picker-left'>
              {college.length > 0 && college[collegeValue] && (
                <Text className='picker-text'>
                  {college[collegeValue].name}
                </Text>
              )}
            </View>
            <Image
              className='picker-icon'
              src={require('../../../../assets/images/arrow-down-s-line.svg')}
            />
          </View>
        </Picker>
        <Picker
          className='picker'
          mode='selector'
          range={major}
          rangeKey='majorName'
          value={majorValue}
          onChange={handleMajorChange}
        >
          <View className='picker-container' hoverClass='picker--hover'>
            <View className='picker-left'>
              {major.length > 0 && major[majorValue] && (
                <Text className='picker-text'>
                  {major[majorValue].majorName}
                </Text>
              )}
            </View>
            <Image
              className='picker-icon'
              src={require('../../../../assets/images/arrow-down-s-line.svg')}
            />
          </View>
        </Picker>
        <Button
          className='btn'
          onClick={handleSubmit}
          disabled={gradeKey === '' || collegeKey === '' || majorKey === ''}
        >
          {i18n.search}
        </Button>
      </View>
      <View className='storage-schedule' onClick={navToScheduleSetting}>
        <Text>{i18n.eduSchedule.recommend.seeLocalSchedule}</Text>
      </View>
      <View
        className={className('panel-background', {
          'panel-background__active': showBottmPanel,
        })}
      >
        <View
          className={className('panel', { panel__active: showBottmPanel })}
          style={{
            transform: showBottmPanel ? `translate3d(0,${offsetSize},0)` : '',
            WebkitTransform: showBottmPanel
              ? `translate3d(0,${offsetSize}px,0)`
              : '',
          }}
        >
          <View className='panel-header'>
            <Picker
              className='picker grade-semester-picker'
              mode='multiSelector'
              range={yearSemester}
              rangeKey='name'
              value={yearSemesterValue}
              onChange={handleYearSemesterChange}
            >
              <View className='picker-container' hoverClass='picker--hover'>
                <View className='picker-left'>
                  <Text className='picker-text'>{renderYearSemester()}</Text>
                </View>
                <Image
                  className='picker-icon'
                  src={require('../../../../assets/images/arrow-down-s-line.svg')}
                />
              </View>
            </Picker>
            <Icon type='clear'
              onClick={() => setShowBottmPanel(false)}
              size='50px'
              color='#e7e7e7'
              className='panel-close-btn'
            />
          </View>
          <View className='class-list'>
            {classList.map((item: IClass, index) => {
              return (
                <View
                  key={item.classCode}
                  className='class-item'
                  onClick={() => fetchSchedule(item)}
                >
                  <Text className='class-index'>{index + 1}</Text>
                  <Text className='class-name'>{item.className}</Text>
                </View>
              )
            })}
            {classList.length === 0 && (
              <View>{i18n.eduSchedule.recommend.noData}</View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Recommend
