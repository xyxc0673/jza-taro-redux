import Taro from '@tarojs/taro'
import Messages from '@/messages'
import i18n from '@/i18n'
import { LANGUAGE } from './constant'

export class User {
  public id = ''
  public enrollmentYear = 0
  public collegeCode = ''
  public fiveSchoolYears = false
  public gradeRange
  public semesterRange
  public selectYearIndex = 0
  public selectSemesterIndex = 0

  constructor(props = { id: '' }) {
    let { id } = props

    if (!id) {
      ;({ id } = Taro.getStorageSync('account'))
    }

    id !== '' && (this.id = id)

    this.makeChoices()
  }

  makeChoices(id?: string) {
    if (id) {
      this.id = id
    }
    this.analyseUserId()
    this.gradeRange = this.generateGradeChoices(this.fiveSchoolYears ? 5 : 4)
    this.semesterRange = this.generateTermChoices()
  }

  analyseUserId() {
    const id = this.id

    let fiveSchoolYears = false

    if (!id) {
      return
    }

    const collegeCode = id.slice(0, 2)
    const enrollmentYear = 2000 + parseInt(id.slice(2, 4))

    if (collegeCode === '') {
      fiveSchoolYears = true
    }

    this.collegeCode = collegeCode
    this.enrollmentYear = enrollmentYear
    this.fiveSchoolYears = fiveSchoolYears
  }

  generateTermChoices() {
    const choices = [] as Array<any>
    const termList = [i18n.term.first, i18n.term.last]
    const thisMonth = new Date().getMonth() + 1
    this.selectSemesterIndex = thisMonth >= 2 && thisMonth <= 8 ? 1 : 0

    for (let i = 0; i < termList.length; i++) {
      choices.push({
        key: `${i + 1}`,
        name: termList[i]
      })
    }

    return choices
  }

  generateGradeChoices(times) {
    const choices = [] as Array<any>
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1
    const enrollmentYear = this.enrollmentYear
    const gradeList = [
      i18n.grade.first,
      i18n.grade.second,
      i18n.grade.third,
      i18n.grade.forth,
      i18n.grade.five
    ]

    for (let i = 0; i < times; i++) {
      const year = enrollmentYear + i
      choices.push({
        key: `${year}`,
        name: gradeList[i]
      })

      if (
        (year === thisYear && thisMonth > 6) ||
        (year === thisYear - 1 && thisMonth <= 6)
      ) {
        this.selectYearIndex = i
      }
    }

    return choices
  }

  static getSetting(field: string = '') {
    const setting = Taro.getStorageSync('setting')
    if (setting && field) {
      return setting[field]
    }
    if (!setting) {
      Taro.setStorageSync('setting', { schedule: {}, language: LANGUAGE.AUTO })
    }
    return setting || { schedule: {} }
  }

  static setSetting(setting, field = '') {
    let localSetting = this.getSetting()
    if (field) {
      localSetting = {
        ...localSetting,
        [field]: setting
      }
    }
    Taro.setStorageSync('setting', localSetting)
  }

  static saveSetting(setting) {
    Taro.setStorageSync('setting', setting)
  }

  static setTabbar() {
    Taro.setTabBarItem({
      index: 0,
      text: i18n.tabbar.time
    })
    Taro.setTabBarItem({
      index: 1,
      text: i18n.tabbar.schedule
    })
    Taro.setTabBarItem({
      index: 2,
      text: i18n.tabbar.me
    })
  }
}

export default new User()
