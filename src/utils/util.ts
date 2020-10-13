/*
function str2ab()
Convert string to array buffer
See https://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
*/
import Messages from '@/messages'
import i18n from '@/i18n'

const str2ab = str => {
  let buf = new ArrayBuffer(str.length * 1)
  let bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const getDayList = () => {
  return [
    i18n.day.monday,
    i18n.day.Tuesday,
    i18n.day.Wednesday,
    i18n.day.Thursday,
    i18n.day.Friday,
    i18n.day.Saturday,
    i18n.day.Sunday
  ]
}

const transformWeekType = (num: number): string => {
  const dayList = getDayList()
  return dayList[num]
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const deltaDate = (deltaDay: number): Date => {
  let now: Date = new Date()
  now.setDate(now.getDate() + deltaDay)
  return now
}

const getCurrDay = () => {
  const day = new Date().getDay()
  const currDay = day === 0 ? 6 : day - 1
  return currDay
}

export default {
  str2ab,
  transformWeekType,
  formatNumber,
  formatTime,
  deltaDate,
  getCurrDay,
  getDayList
}
