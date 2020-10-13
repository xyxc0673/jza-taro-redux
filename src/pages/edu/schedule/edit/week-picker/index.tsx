import React, { useState, useCallback, useEffect } from "react";
import Taro from '@tarojs/taro'
import { Picker, View } from '@tarojs/components'
import { WeekType } from '@/data/enums/week-type'
import i18n from '@/i18n'
import { useI18n } from '@i18n-chain/react'

const weekList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25
].map(item => ({
  title: i18n.eduSchedule.editCourse.week({ week: item }),
  value: item
}))

interface IProps {
  onChange: Function
  value: Array<number>
}

const genWeekArray = (start, end, step) => {
  const weekArray: Array<any> = []
  for (let i = start; i <= 25; i += step) {
    weekArray.push({
      title: i18n.eduSchedule.editCourse.week({ week: i }),
      value: i
    })
  }
  return weekArray
}

const WeekPicker: React.FC<IProps> = props => {

  const [value, setValue] = useState(() => {
    if (props.value[0] === WeekType.ALL) {
      return [
        props.value[0],
        props.value[1] - 1,
        props.value[2] - props.value[1]
      ]
    }
    if (props.value[0] === WeekType.ODD) {
      return [
        props.value[0],
        (props.value[1] + 1) / 2 - 1,
        (props.value[2] - props.value[1]) / 2
      ]
    }
    if (props.value[0] === WeekType.EVEN) {
      return [
        props.value[0],
        props.value[1] / 2 - 1,
        (props.value[2] - props.value[1]) / 2
      ]
    }
    return props.value
  })

  const [range, setRange] = useState([
    [i18n.weekType.all, i18n.weekType.odd, i18n.weekType.even].map(
      (item, index) => ({
        title: item,
        value: index
      })
    ),
    weekList,
    weekList
  ])
  const [weekType, setWeekType] = useState(props.value[0])
  const [secondColumnValue, setSecondColumnValue] = useState(props.value[1])
  console.log('p', range)
  const handleChange = e => {
    const args = [...e.detail.value]
    setValue(value)
    console.log('r', range[2], args)
    const tmpValue = [args[0], range[1][args[1]].value, range[2][args[2]].value]
    props.onChange([...tmpValue])
  }

  const handleColumnChange = e => {
    const { column, value } = e.detail
    console.log('d', column, value)
    if (column === 0) {
      setWeekType(range[0][value].value)
    } else if (column === 1) {
      setSecondColumnValue(range[1][value].value)
    }
  }

  useEffect(() => {
    generateRange()
  }, [generateRange])

  const generateRange = useCallback(() => {
    const newRange = [...range]
    const step = weekType === WeekType.ALL ? 1 : 2

    let start = weekType === WeekType.EVEN ? 2 : 1
    const firstWeekArray = genWeekArray(start, 25, step)

    start = secondColumnValue === 0 ? 1 : secondColumnValue
    const secondWeekArray = genWeekArray(start, 25, step)

    newRange[1] = firstWeekArray
    newRange[2] = secondWeekArray
    setRange(newRange)
    console.log('s', weekType, secondColumnValue, newRange)

    if (weekType !== props.value[0]) {
      setValue([weekType, 0, 0])
    }
  }, [props.value, range, secondColumnValue, weekType])

  // useEffect(() => {
  //   const newRange = [...range]
  //   const step = weekType === WeekType.ALL ? 1 : 2
  //   const start = secondColumnValue === 0 ? 1 : secondColumnValue
  //   const weekArray = genWeekArray(start, 25, step)
  //   console.log("secondColumnValue", secondColumnValue, weekArray)
  //   newRange[2] = weekArray
  //   setRange(newRange)
  // }, [secondColumnValue])

  return (
    <Picker
      mode='multiSelector'
      range={range}
      value={value}
      onChange={handleChange}
      onColumnChange={handleColumnChange}
      rangeKey='title'
    >
      {props.children}
    </Picker>
  )
}

WeekPicker.defaultProps = {
  value: [0, 0, 0]
}

export default WeekPicker
