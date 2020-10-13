import { USER_SET_SETTING, USER_SET_SETTING_SCHEDULE } from '../constants/user'
import { User } from '@/services/user'

const initialState = {
  account: {},
  setting: {
    schedule: {
      showNotCurrWeekCourse: false
    }
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SET_SETTING: {
      User.saveSetting(action.payload.setting)
      return {
        ...state,
        setting: {...action.payload.setting}
      }
    }
    case USER_SET_SETTING_SCHEDULE: {
      return {
        ...state,
        setting: {
          ...state.setting,
          schedule: {
            ...state.setting.schedule,
            [action.payload.field]: action.payload.value
          }
        }
      }
    }
    default: {
      return state
    }
  }
}
