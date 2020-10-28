import React, { useState } from "react";
import { View, ScrollView } from '@tarojs/components'
import className from 'classnames'
import i18n from '@/i18n'

import './index.scss'

interface IProps {
  currWeek: number
  selectedWeek: number
  showWeekTab: boolean
  weekList: Array<number>
  switchWeek: (arg: number) => void
}

const WeekTab: React.FC<IProps> = props => {
  const { currWeek, selectedWeek, showWeekTab, weekList, switchWeek } = props
  const [toIndex, setToIndex] = useState(currWeek)
  const currWeekElem = (
    <View
      className='week fixed-week'
      hoverClass='week__active'
      hoverStayTime={150}
      onClick={() => {
        toggleWeek(currWeek)
      }}
    >
      {i18n.tabbarSchedule.currWeek}
    </View>
  )

  const weekTabClass = className('week-tab-scroll-view', {
    'week-tab-scroll-view__active': showWeekTab
  })

  const toggleWeek = (week) => {
    switchWeek(week)
    setToIndex(week)
  }

  // const scrollToCurr = () => {
  //   Taro.pageScrollTo({ selector: '#week-list', sc })
  // }

  return (
    <ScrollView
      className={weekTabClass}
      scrollX
      onScroll={() => setToIndex(-1)}
      scrollIntoView={`week-${toIndex - 2}`}
      scrollWithAnimation
    >
      <View className='week-tab'>
        {showWeekTab && currWeekElem}
        <View className='week-list' id='week-list'>
          {weekList &&
            weekList.map(week => (
              <View
                id={`week-${week}`}
                key={week}
                className={className('week', {
                  week__curr: week === selectedWeek
                })}
                hoverClass='week__active'
                hoverStayTime={150}
                onClick={() => toggleWeek(week)}
              >
                {i18n.eduSchedule.editCourse.week({
                  week: week
                })}
                {week === currWeek
                  ? `(${i18n.tabbarSchedule.currWeek})`
                  : ''}
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default WeekTab
