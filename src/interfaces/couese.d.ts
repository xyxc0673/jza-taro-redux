import { WeekType } from "@/data/enums/week-type";
import { CourseType } from "@/data/enums/course-type";

export interface ICourseBase {
  index: Array<number>
  flex: number,
  courseName: string,
}

export interface ICourse extends ICourseBase {
  id: string,
  teacher: string,
  location: string,
  color: string,
  time: string,
  startTime: string,
  endTime: string,
  firstWeek: number,
  lastWeek: number,
  oddOrEven: WeekType
  session: string
  firstSession: number
  lastSession: number
  day: string,
  dayInt: number,
  during: string,
  type: CourseType,
  isCurrWeekCourse: boolean,
  isCurrTimeCourse: boolean,
  isCurrDayCourse: boolean,
}

export interface ISettings {
  showNotCurrWeekCourse: boolean,
  customBackground: boolean
  imageUrl: string,
  imageStyle: number,
}