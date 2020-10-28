import api from "@/api"
import {
  EDU_LOGIN,
  EDU_SCORE,
  EDU_SCHEDULE,
  EDU_SCHOOL_START_DATE,
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
  EDU_SET_ACCOUNT
} from "@/store/constants/edu"

import { createAction, createApiAction } from "."

export const eduLogin = createApiAction(EDU_LOGIN, payload => {
  return api.eduLogin(payload)
})

export const eduLoginForToken = createApiAction(EDU_LOGIN_FOR_TOKEN, payload => {
  return api.eduLoginForToken(payload)
})

export const fetchSchollStartDate = createApiAction(
  EDU_SCHOOL_START_DATE,
  payload => {
    return api.eduSchoolStartDate(payload)
  }
)

export const fetchEduScore = createApiAction(EDU_SCORE, payload => {
  return api.eduScore(payload)
})

export const fetchEduSchedule = createApiAction(EDU_SCHEDULE, payload => {
  return api.eduSchedule(payload)
})

export const fetchEduRecommendGrade = createApiAction(
  EDU_RECOMMEND_GRADE,
  payload => {
    return api.eduRecommendGrade(payload)
  }
)

export const fetchEduRecommendCollege = createApiAction(
  EDU_RECOMMEND_COLLEGE,
  payload => {
    return api.eduRecommendCollege(payload)
  }
)

export const fetchEduRecommendMajor = createApiAction(
  EDU_RECOMMEND_MAJOR,
  payload => {
    return api.eduRecommendMajor(payload)
  }
)

export const fetchEduRecommendClass = createApiAction(
  EDU_RECOMMEND_CLASS,
  payload => {
    return api.eduRecommendClass(payload)
  }
)

export const fetchEduRecommendSchedule = createApiAction(
  EDU_RECOMMEND_SCHEDULE,
  payload => {
    return api.eduRecommendSchedule(payload)
  }
)

export const setMySchedule = createAction(EDU_SET_MY_SCHEDULE)

export const setCustomSchedule = createAction(EDU_SET_CUSTOM_SCHEDULE)

export const setCurrWeek = createAction(EDU_SET_CURR_WEEK)

export const setRecommendScheduleList = createAction(EDU_SET_RECOMMEND_SCHEDULE_LIST)

export const setRecommendSchedule = createAction(EDU_SET_RECOMMEND_SCHEDULE)

export const setEditingCourse = createAction(EDU_SET_EDITING_COURSE)

export const setAccount = createAction(EDU_SET_ACCOUNT)