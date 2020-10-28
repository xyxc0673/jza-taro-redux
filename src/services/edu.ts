import Taro from '@tarojs/taro'
import Util from '@/utils/util'
import { ICourse, ICourseBase } from '@/interfaces/couese'
import IDayDate from '@/interfaces/day-date'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { CourseType } from '@/data/enums/course-type'

import api from './api'
import { User } from './user'
import {
  CUSTOM_SCHEDULE,
  MY_SCHEDULE,
  SCHOOL_START_DATE,
  SETTING_SCHEDULE,
  SETTING,
  RECOMMEND_SCHEDULE
} from './constant'

dayjs.extend(isBetween)

const SECONDS_OF_A_WEEK = 1000 * 3600 * 24 * 7

const COURSE_COLORS = [
  'rgb(196, 98, 67)', // 照柿
  'rgb(208, 16, 76)', // 韓紅花
  'rgb(0, 137, 108)', // 青竹
  'rgb(180, 165, 130)', // 利休白茶
  'rgb(58, 143, 183)', // 千草
  'rgb(138, 107, 190)', // 藤紫
  'rgb(148, 122, 109)', // 胡桃
  'rgb(147, 150, 80)', // 柳茶
  'rgb(144, 180, 75)', // 鶸萌黄
  'rgb(51, 103, 116)', // 錆御納戸
  'rgb(38, 135, 133)', // 青碧
  'rgb(34, 125, 81)' // 緑
]

const NOT_CURR_WEEK_COURSE_COLOR = '#c5c5c5' // 素鼠

const SPECIAL_TIMETABLE = [[], [], ['10:30', '11:15'], ['11:25', '12:10']]

const TIMETABLE = [
  ['08:20', '09:05'],
  ['09:15', '10:00'],

  ['10:20', '11:05'],
  ['11:15', '12:00'],

  ['14:00', '14:45'],
  ['14:55', '15:40'],

  ['16:00', '16:45'],
  ['16:55', '17:40'],

  ['18:40', '19:25'],
  ['19:35', '20:20'],

  ['20:30', '21:15'],
  ['21:25', '22:10']
]

class Edu {
  static setAccount(account) {
    Taro.setStorageSync('account', account)
  }

  static setSchoolStartDate(schoolStartDate) {
    Taro.setStorageSync(SCHOOL_START_DATE, schoolStartDate)
  }

  static getSchoolStartDate() {
    return Taro.getStorageSync(SCHOOL_START_DATE)
  }

  static setMySchedule(mySchedule) {
    Taro.setStorageSync(MY_SCHEDULE, mySchedule)
  }

  static getMySchedule() {
    return Taro.getStorageSync(MY_SCHEDULE)
  }

  static generateCourseId(course: ICourse) {
    return `${course.id}:${course.oddOrEven}:${course.day}:(${course.session}):(${course.during})`
  }

  static saveCustomCourse(course: ICourse) {
    const customSchedule = Edu.getCustomSchedule()
    customSchedule.push(course)
    Edu.setCustomSchedule(customSchedule)
  }

  static getRecommendScheduleList() {
    const scheduleList = Taro.getStorageSync(RECOMMEND_SCHEDULE) || []
    return scheduleList
  }

  static uniqueRecommendSchedule(schedule) {
    const scheduleList = Edu.getRecommendScheduleList()
    const keys = [
      'yearKey',
      'yearValue',
      'semesterKey',
      'semesterValue',
      'majorKey',
      'majorValue',
      'gradeKey',
      'gradeValue',
      'classKey',
      'classValue'
    ]
    for (let i = 0; i < scheduleList.length; i += 1) {
      const item = scheduleList[i]
      let sameKeyCount = 0
      for (let key of keys) {
        if (item[key] === schedule[key]) {
          sameKeyCount += 1
        }
      }
      if (sameKeyCount === keys.length) {
        return i
      }
    }
    return -1
  }

  static setRecommendScheduleList(scheduleList) {
    Taro.setStorageSync(RECOMMEND_SCHEDULE, scheduleList)
  }

  static setCustomSchedule(customSchedule = []) {
    Taro.setStorageSync(CUSTOM_SCHEDULE, customSchedule)
  }

  static getCustomSchedule() {
    return Taro.getStorageSync(CUSTOM_SCHEDULE) || []
  }

  static async getCurrWeek(forceUpdate = false) {
    /**
     * Get the current week from school start date
     */
    let schoolStartDate = this.getSchoolStartDate()

    if (forceUpdate || !schoolStartDate) {
      const res = await api.eduSchoolStartDate()

      if (!res) {
        return -1
      }

      schoolStartDate = res.data.date
    }

    this.setSchoolStartDate(schoolStartDate)

    return Math.ceil(
      (new Date().getTime() - new Date(schoolStartDate).getTime()) /
        SECONDS_OF_A_WEEK
    )
  }

  static getDayDate(week: number) {
    /*
     * Get the day date of the week, such as [{date: '07-17', day: 'Wed', dayInt: 17}, ***]
     */
    const schoolStartDate = new Date(this.getSchoolStartDate())
    const days: Array<IDayDate> = []

    // if (schoolStartDate.getDay() )

    schoolStartDate.setDate(schoolStartDate.getDate() + (week - 1) * 7 - 1)

    for (let i = 0; i < 7; i++) {
      const datetime = new Date(
        schoolStartDate.setDate(schoolStartDate.getDate() + 1)
      )

      const obj = {
        date: `${datetime.getMonth() + 1}/${datetime.getDate()}`,
        day: Util.transformWeekType(i),
        dayInt: datetime.getDay()
      }
      days.push(obj)
    }

    return days
  }

  static isCurrCourse(course: ICourse) {
    const startTime = course.startTime.split(':')
    const endTime = course.endTime.split(':')
    const startDate = dayjs()
      .set('hour', parseInt(startTime[0]))
      .set('minute', parseInt(startTime[1]))
    const endDate = dayjs()
      .set('hour', parseInt(endTime[0]))
      .set('minute', parseInt(endTime[1]))
    const isCurrCourse = dayjs().isBetween(startDate, endDate)
    return isCurrCourse
  }

  static initSessionList() {
    let sessionList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return sessionList
  }

  static initScheduleFrame() {
    /*
     * 生成一个 8 * 12 的矩阵
     * 行均是 ICourse * 12 的数组
     */
    let schedule: Array<any> = []
    for (let i = 0; i < 7; i++) {
      let courseBlock: Array<ICourseBase> = []
      for (let j = 0; j < 12; j++) {
        courseBlock[j] = {
          index: [i + 1, j + 1],
          courseName: '',
          flex: 1
        }
      }
      schedule.push(courseBlock)
    }
    return schedule
  }

  static preprocessSchedule(rawSchedule: Array<ICourse>, custom = false) {
    const schedule: Array<ICourse> = []
    const scheduleColorCache = {}
    let colorIndex = 0

    for (const course of  rawSchedule) {
      course.id = Edu.generateCourseId(course)

      course.type = custom ? CourseType.custom : CourseType.user

      course.dayInt = parseInt(course.day)

      const weekList = course.during.split(',')
      const sessionList = course.session.split(',')

      course.firstWeek = parseInt(weekList[0])
      course.lastWeek = parseInt(weekList[weekList.length - 1])

      course.firstSession = parseInt(sessionList[0])
      course.lastSession = parseInt(sessionList[sessionList.length - 1])

      const { startTime, endTime } = this.getTimeTable(course)
      course.startTime = startTime
      course.endTime = endTime

      if (scheduleColorCache[course.courseName]) {
        course.color = scheduleColorCache[course.courseName]
      } else {
        course.color = COURSE_COLORS[colorIndex++ % COURSE_COLORS.length]
        scheduleColorCache[course.courseName] = course.color
      }

      schedule.push(course)
    }

    return schedule
  }

  static initScheduleTab() {
    /*
     * 生成一个 8 * N 的矩阵
     * 其余行均是 ICourse * 12 的数组
     */
    let schedule: Array<any> = []
    for (let i = 0; i < 7; i++) {
      const courseBlock: Array<ICourse> = []
      schedule.push(courseBlock)
    }
    return schedule
  }

  static initSchedule(
    rawSchedule: Array<ICourse>,
    currWeek: number,
    currDay: number = -1,
    forceRender: boolean = false,
    forTab: boolean = false
  ) {
    const isGettingOneDaySchedule = currDay !== -1
    const setting = User.getSetting(SETTING.SCHEDULE)

    let schedule =  this.initScheduleFrame()

    if (forTab) {
      schedule = this.initScheduleTab()
    } else if (isGettingOneDaySchedule) {
      schedule = []
    }

    const _doFlex = (course, sessionList) => {
      course.flex = sessionList.length

      sessionList.forEach(session => {
        schedule[course.day - 1][session - 1].flex = 0
      })
    }

    for (let course of rawSchedule) {
      if (forTab) {
        schedule[course.dayInt].push(course)
        continue
      }

      course.isCurrWeekCourse = false

      if (!course.during) {
        continue
      }

      const weekList = course.during.split(',')
      const sessionList = course.session.split(',')

      for (let w of weekList) {
        let week = parseInt(w)
        if (week === currWeek) {
          course.isCurrWeekCourse = true
          break
        } else if (week > currWeek) {
          break
        }
      }

      course.isCurrDayCourse =
        course.isCurrWeekCourse && course.dayInt === currDay

      course.isCurrTimeCourse = this.isCurrCourse(course)

      // 判断是否为获取一天课程模式且是否为当天课程
      if (isGettingOneDaySchedule) {
        if (!course.isCurrDayCourse) {
          continue
        }
        schedule.push(course)
        continue
      }
      // 判断是否为当前周课程 且 开启 显示非当前周课程 设置
      if (
        !course.isCurrWeekCourse &&
        !setting.showNotCurrWeekCourse &&
        !forceRender
      ) {
        continue
      }

      // 开始进行课程表的显示调整和优化
      const courseInCurrCell =
        schedule[course.dayInt - 1][course.firstSession - 1]

      // 计算课程首周与本周的周差
      const currIterCourseDistance = Math.abs(course.firstWeek - currWeek)
      const currCellCourseDistance = Math.abs(
        (courseInCurrCell.firstWeek || 0) - currWeek
      )

      // 课程矩阵中将要放置的格子已经有课程，以下两个情况跳过渲染
      // 1. 格子中的课程是本周要上的课
      // 2. 格子中的课程首周比当前课程的要晚
      if (
        courseInCurrCell.courseName &&
        (courseInCurrCell.isCurrWeekCourse ||
          currIterCourseDistance > currCellCourseDistance)
      ) {
        continue
      }

      let x = parseInt(course.day) - 1
      let y = course.firstSession

      // 判断当前cell是否已经被划分为不显示的格子，即已经被某个课程撑开而隐藏
      // 但是有可能该课程撑开的大小会占用到当前循环课程的位置
      if (courseInCurrCell.flex === 0) {
        // 跳过虽然格子被占用，但是当前课程不是本周课程
        if (!course.isCurrWeekCourse) {
          continue
        }

        // 向上寻找占用格子的课程
        while (--y >= 0) {
          if (schedule[x][y].flex > 1 && course.flex) {
            // 缩小课程格子，计算公式为：target course's flex - current course's flex
            schedule[x][y].flex = schedule[x][y].flex - course.flex
          }
        }
      }

      if (!course.isCurrWeekCourse) {
        course.color = NOT_CURR_WEEK_COURSE_COLOR
      }

      // 对被当前 course 影响的 cell(s) 的 flex 置为 0（即不可见）
      _doFlex(course, sessionList)

      // 替换目标 cell 为当前 course（cell of the first session）
      schedule[course.dayInt - 1][course.firstSession - 1] = course
    }

    return schedule
  }

  static getTimeTable(course: ICourse) {
    const isSpecialCourse =
      course.location.match(/二教|实验|室/g) === null ? 0 : 1

    const _getTime = (session, isStart) => {
      const isStartTime = isStart ? 0 : 1
      let timeList = TIMETABLE[session - 1]

      if (
        isSpecialCourse &&
        (session.toString() === '3' || session.toString() === '4')
      ) {
        timeList = SPECIAL_TIMETABLE[session - 1]
      }

      return timeList[isStartTime]
    }

    const startTime = _getTime(course.firstSession, true)
    const endTime = _getTime(course.lastSession, false)

    return { startTime, endTime }
  }
}

export default Edu
