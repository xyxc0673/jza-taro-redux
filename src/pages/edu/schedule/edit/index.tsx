import React, { useState, useCallback, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Label, Image, Input, Text, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import { WeekType } from '@/data/enums/week-type'
import { EditMode } from '@/data/enums/edit-mode'
import Tip from '@/tip'
import Edu from '@/services/edu'
import { CourseType } from '@/data/enums/course-type'
import { setMySchedule, setCustomSchedule } from '@/store/actions/edu'
import { ICourse } from '@/interfaces/couese'
import Util from '@/util'
import i18n from '@/i18n'

import SessionPicker from './session-picker'
import WeekPicker from './week-picker'
import './index.scss'

const makeStr = (start, end, step) => {
  let str = `${start}`
  for (let i = start + 1; i < end + 1; i += step) {
    str += `,${i}`
  }
  return str
}

const Edit: React.FC = () => {
  const weekTypeList = [
    i18n.weekType.all,
    i18n.weekType.odd,
    i18n.weekType.even,
  ]

  const { params } = useRouter()
  const dispatch = useDispatch()
  const isEditMode = params['mode'] === EditMode.edit

  const { editingCourse, mySchedule, customSchedule } = useSelector<any, any>(
    (state) => state.edu
  )

  const [newCourse, setNewCourse] = useState<ICourse>(
    () => {
      const firstSession = params['session'] || 1
      const lastSession = parseInt(params['session']) + 1 || 2
      return isEditMode
      ? editingCourse
      : {
          courseName: '',
          location: '',
          teacher: '',
          firstSession: firstSession,
          lastSession: lastSession,
          firstWeek: 1,
          lastWeek: 22,
          during: makeStr(1, 22, 1),
          session: makeStr(firstSession, lastSession, 1),
          oddOrEven: WeekType.ALL,
          day: params['day'] || Util.getCurrDay() + 1,
          dayInt: params['day'] || Util.getCurrDay() + 1,
          type: CourseType.custom,
        }
    }
  )
  const [focus, setFocus] = useState('')

  useEffect(() => {
    if (isEditMode) {
      Taro.setNavigationBarTitle({
        title: i18n.eduSchedule.editCourse.title,
      })
    } else {
      Taro.setNavigationBarTitle({
        title: i18n.eduSchedule.addCourse.title,
      })
    }
  }, [isEditMode])

  const handleTimeChange = useCallback(
    (value) => {
      // generate string meet the struct like '1, 2, 3'
      const [day, firstSession, lastSession] = value
      const sessionStr = makeStr(firstSession + 1, lastSession + 1, 1)
      setNewCourse({
        ...newCourse,
        day: day + 1,
        firstSession: firstSession + 1,
        lastSession: lastSession + 1,
        session: sessionStr,
      })
    },
    [newCourse]
  )

  const handleWeekChange = useCallback(
    (value) => {
      // generate string meet the struct like '1, 2, 3'
      const [weekType, firstWeek, lastWeek] = value
      const step = weekType === WeekType.ALL ? 1 : 2
      const weekStr = makeStr(firstWeek, lastWeek, step)
      setNewCourse({
        ...newCourse,
        firstWeek: firstWeek,
        lastWeek: lastWeek,
        oddOrEven: weekType,
        during: weekStr,
      })
    },
    [newCourse]
  )

  const handleSubmit = () => {
    if (!newCourse.courseName) {
      Tip.showToast(i18n.eduSchedule.editCourse.incompleteInformation)
      return
    }
    const courseList =
      newCourse.type === CourseType.user ? mySchedule : customSchedule
    let newCourseList: Array<ICourse> = []

    if (isEditMode) {
      console.log('item', courseList.length)

      newCourseList = courseList.map((item) => {
        if (item.id === newCourse.id) {
          return newCourse
        }
        return item
      })
      console.log('item', newCourseList.length)
    } else {
      newCourseList = [
        ...courseList,
        { ...newCourse, id: `cc-${new Date().getMilliseconds()}` },
      ]
    }
    newCourse.id = Edu.generateCourseId(newCourse)

    if (newCourse.type === CourseType.user) {
      dispatch(setMySchedule({ mySchedule: newCourseList }))
    } else {
      dispatch(setCustomSchedule({ customSchedule: newCourseList }))
    }

    Taro.navigateBack()

    if (isEditMode) {
      Tip.showToast(i18n.eduSchedule.editCourse.success)
    } else {
      Tip.showToast(i18n.eduSchedule.addCourse.success)
    }
  }

  return (
    <View className='page-edit'>
      <View className='form'>
        <View className='form-control'>
          {/* <Label className="form-control__label">课程名称</Label> */}
          <View className='form-control__show'>
            <Input
              className={`form-control__input form-control__input__${focus}`}
              value={newCourse.courseName}
              onFocus={() => setFocus('focus')}
              onBlur={() => setFocus('')}
              placeholder={i18n.eduSchedule.editCourse.courseName}
              onInput={(e) =>
                setNewCourse({ ...newCourse, courseName: e.detail.value })
              }
            />
            <Text className='required-tip'>*</Text>
          </View>
        </View>
        <View className='form-control'>
          <View className='form-control__show'>
            {/* <Label className="form-control__label">任课教师</Label> */}
            <Input
              className='form-control__input'
              value={newCourse.teacher}
              placeholder={i18n.eduSchedule.editCourse.teacher}
              onInput={(e) =>
                setNewCourse({ ...newCourse, teacher: e.detail.value })
              }
            />
          </View>
        </View>
        <View className='form-control'>
          <View className='form-control__show'>
            {/* <Label className="form-control__label">上课地点</Label> */}
            <Input
              className='form-control__input'
              value={newCourse.location}
              placeholder={i18n.eduSchedule.editCourse.location}
              onInput={(e) =>
                setNewCourse({ ...newCourse, location: e.detail.value })
              }
            />
          </View>
        </View>
        <View className='form-control'>
          <SessionPicker
            onChange={handleTimeChange}
            value={[
              newCourse.dayInt - 1,
              newCourse.firstSession - 1,
              newCourse.lastSession - 1,
            ]}
          >
            <View className='form-control__show'>
              <Label className='form-control__input'>
                {`${
                  Util.getDayList()[newCourse.dayInt - 1]
                } ${i18n.eduSchedule.editCourse.session({
                  session: newCourse.firstSession,
                })} - ${i18n.eduSchedule.editCourse.session({
                  session: newCourse.lastSession,
                })}
              `}
              </Label>
              <Image
                className='form-control__icon'
                src={require('../../../../assets/images/arrow-down-s-line.svg')}
              />
            </View>
          </SessionPicker>
        </View>
        <View className='form-control'>
          <WeekPicker
            onChange={handleWeekChange}
            value={[
              newCourse.oddOrEven,
              newCourse.firstWeek,
              newCourse.lastWeek,
            ]}
          >
            <View className='form-control__show'>
              <Label className='form-control__input'>
                {`${
                  weekTypeList[newCourse.oddOrEven]
                } ${i18n.eduSchedule.editCourse.week({
                  week: newCourse.firstWeek,
                })} - ${i18n.eduSchedule.editCourse.week({
                  week: newCourse.lastWeek,
                })}`}
              </Label>
              <Image
                className='form-control__icon'
                src={require('../../../../assets/images/arrow-down-s-line.svg')}
              />
            </View>
          </WeekPicker>
        </View>
        <Button className='btn' onClick={handleSubmit}>
          {i18n.confirm}
        </Button>
      </View>
    </View>
  )
}

export default Edit
