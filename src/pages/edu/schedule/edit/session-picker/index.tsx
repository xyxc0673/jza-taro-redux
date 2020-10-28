import React, { useState, useCallback, useEffect } from "react";
import { Picker } from '@tarojs/components'
import util from '@/util'
import i18n from '@/i18n'

const multiArray = [
  [...util.getDayList()],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(num =>
    i18n.eduSchedule.editCourse.session({ session: num })
  ),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(num =>
    i18n.eduSchedule.editCourse.session({ session: num })
  )
]

interface IProps {
  children: React.ReactNode
  onChange: Function
  value: Array<number>
}

const SessionPicker: React.FC<IProps> = props => {
  const [value, setValue] = useState(() => {
    return [props.value[0], props.value[1], props.value[2] - props.value[1]]
  })
  const [range, setRange] = useState(multiArray)
  const [secondColumnValue, setSecondColumnValue] = useState(props.value[1])

  const handleChange = useCallback(
    e => {
      const _value = [...e.detail.value]
      setValue(_value)
      value[2] += secondColumnValue
      props.onChange([..._value])
    },
    [props, secondColumnValue, value]
  )

  const handleColumnChange = useCallback(e => {
    const { column, value: _value } = e.detail
    if (column === 1) {
      setSecondColumnValue(_value)
    }
  }, [])

  useEffect(() => {
    const newRange = [...range]
    const lastColumnArray: Array<string> = []
    for (let i = secondColumnValue + 1; i <= 13; i++) {
      lastColumnArray.push(i18n.eduSchedule.editCourse.session({ session: i }))
    }
    newRange[2] = lastColumnArray
    console.log("newRange",newRange)
    setRange(newRange)
  }, [secondColumnValue])

  return (
    <Picker
      mode='multiSelector'
      range={range}
      value={value}
      onChange={handleChange}
      onColumnChange={handleColumnChange}
    >
      {props.children}
    </Picker>
  )
}

SessionPicker.defaultProps = {
  value: [0, 0, 0]
}

export default SessionPicker
