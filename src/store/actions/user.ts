import { USER_SET_SETTING, USER_SET_SETTING_SCHEDULE } from "../constants/user"
import { createApiAction, createAction } from "."

export const setUserSetting = createAction(USER_SET_SETTING)

export const setUserSettingSchedule = createAction(USER_SET_SETTING_SCHEDULE)
