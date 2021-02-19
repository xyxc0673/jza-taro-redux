import {
  EDU_LOGIN,
  EDU_SCORE,
  EDU_SET_MY_SCHEDULE,
  EDU_SET_CUSTOM_SCHEDULE,
  EDU_SET_CURR_WEEK,
  EDU_RECOMMEND_COLLEGE,
  EDU_RECOMMEND_MAJOR,
  EDU_RECOMMEND_CLASS,
  EDU_RECOMMEND_SCHEDULE,
  EDU_LOGIN_FOR_TOKEN,
  EDU_RECOMMEND_GRADE,
  EDU_SET_RECOMMEND_SCHEDULE,
  EDU_SET_RECOMMEND_SCHEDULE_LIST,
  EDU_SET_EDITING_COURSE,
  EDU_SET_ACCOUNT,
  EDU_SCHOOL_START_DATE
} from '@/store/constants/edu'
import Edu from '@/services/edu'
import { SCORE_LEVEL, SCORE_LEVEL_VALUE } from '@/data/enums/score-level'

const initialState = {
  account: {},
  token: '',
  scoreList: [],
  mySchedule: [],
  customSchedule: [],
  currWeek: 0,
  recommendGrade: [],
  recommendCollege: [],
  recommendMajor: [],
  recommendClass: [],
  recommendSchedule: [],
  recommendScheduleList: [],
  editCourse: {},
  schoolStartDate: ''
}

export default function edu(state = initialState, action) {
  switch (action.type) {
    case EDU_LOGIN:
      return {
        ...state
      }
    case EDU_LOGIN_FOR_TOKEN:
      return {
        ...state,
        token: action.payload.data.token
      }
    case EDU_SCORE:
      const scores = action.payload.data.scores
      for (const scoreItem of scores) {
        if (scoreItem.score === SCORE_LEVEL.A) {
          scoreItem.scoreValue = SCORE_LEVEL_VALUE.A
        } else if (scoreItem.score === SCORE_LEVEL.B) {
          scoreItem.scoreValue = SCORE_LEVEL_VALUE.B
        } else if (scoreItem.score === SCORE_LEVEL.C) {
          scoreItem.scoreValue = SCORE_LEVEL_VALUE.C
        } else if (scoreItem.score === SCORE_LEVEL.D) {
          scoreItem.scoreValue = SCORE_LEVEL_VALUE.D
        } else if (scoreItem.score === SCORE_LEVEL.E) {
          scoreItem.scoreValue = SCORE_LEVEL_VALUE.E
        } else {
          scoreItem.scoreValue = scoreItem.score
        }
      }
      return {
        ...state,
        scoreList: scores
      }
    case EDU_SET_MY_SCHEDULE:
      Edu.setMySchedule(action.payload.mySchedule)
      return {
        ...state,
        mySchedule: [...action.payload.mySchedule]
      }
    case EDU_SET_CUSTOM_SCHEDULE:
      Edu.setCustomSchedule(action.payload.customSchedule)
      return {
        ...state,
        customSchedule: action.payload.customSchedule
      }
    case EDU_SET_CURR_WEEK:
      return {
        ...state,
        currWeek: action.payload.currWeek
      }
    case EDU_RECOMMEND_GRADE:
      return {
        ...state,
        recommendGrade: action.payload.data.grade
      }
    case EDU_RECOMMEND_COLLEGE:
      return {
        ...state,
        recommendCollege: action.payload.data.college
      }
    case EDU_RECOMMEND_MAJOR:
      return {
        ...state,
        recommendMajor: action.payload.data.major
      }
    case EDU_RECOMMEND_CLASS:
      return {
        ...state,
        recommendClass: action.payload.data.class
      }
    case EDU_RECOMMEND_SCHEDULE:
      return {
        ...state,
        recommendSchedule: Edu.preprocessSchedule(action.payload.data.schedule)
      }
    case EDU_SET_RECOMMEND_SCHEDULE_LIST:
      Edu.setRecommendScheduleList(action.payload.scheduleList)
      return {
        ...state,
        recommendScheduleList: action.payload.scheduleList
      }
    case EDU_SET_RECOMMEND_SCHEDULE:
      return {
        ...state,
        recommendSchedule: action.payload.schedule
      }
    case EDU_SET_EDITING_COURSE:
      return {
        ...state,
        editingCourse: action.payload.course
      }
    case EDU_SET_ACCOUNT:
      Edu.setAccount(action.payload)
      return {
        ...state,
        account: action.payload
      }
    case EDU_SCHOOL_START_DATE:
      const schoolStartDate = action.payload.data.date
      Edu.setSchoolStartDate(schoolStartDate)
      return {
        ...state,
        schoolStartDate: schoolStartDate,
        currWeek: Edu.getCurrWeek(schoolStartDate)
      }
    default:
      return state
  }
}
