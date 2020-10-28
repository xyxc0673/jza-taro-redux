import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro"
import { View, Text, Picker, Image } from "@tarojs/components"

import User from "@/services/user"
import { ITouchEvent } from "@tarojs/components/types/common"

import "./index.scss"

interface IProps {
  userId: ''
  onPickerChange: Function
  onPickerClick?: (event: ITouchEvent) => any
}

interface IRange {
  key: string
  name: string
}

enum TERM {
  LAST_TERM = 0,
  NEXT_TERM = 1
}

const SemesterPicker: React.FC<IProps> = props => {
  const { onPickerChange } = props

  const [gradeTermValue, setGradeTermValue] = useState([0, 0])
  const [gradeTermText, setGradeTermText] = useState({
    gradeText: "",
    termText: " "
  })

  const [gradeRange, setGradeRange] = useState(() => {
    return User.gradeRange
  })
  const [semesterRange, setSemesterRange] = useState(() => {
    return User.semesterRange
  })

  useEffect(() => {
    setGradeRange(User.gradeRange)
    setSemesterRange(User.semesterRange)
    console.log("User", User.gradeRange, props.userId)
  }, [props.userId])

  useEffect(() => {
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth() + 1
    const termSelectedKey =
      thisMonth >= 2 && thisMonth <= 8 ? TERM.NEXT_TERM : TERM.LAST_TERM

    const schoolYear =
      termSelectedKey === TERM.LAST_TERM ? thisYear : thisYear - 1

    let gradeSelectedKey = 0 // 以防 undefined

    for (let k in gradeRange) {
      if (gradeRange[k].key === schoolYear.toString()) {
        gradeSelectedKey = parseInt(k)
        break
      }
    }

    setGradeTermValue([gradeSelectedKey, termSelectedKey])
    onPickerChange([gradeSelectedKey, termSelectedKey])
  }, [onPickerChange, gradeRange])

  useEffect(() => {
    const [gradeValue, termValue] = gradeTermValue
    const gradeText = gradeRange[gradeValue].name
    const termText = semesterRange[termValue].name
    setGradeTermText({ gradeText, termText })
  }, [gradeTermValue, gradeRange, semesterRange])

  const handleChange = useCallback(e => {
    setGradeTermValue(e.detail.value)
    onPickerChange(e.detail.value)
  }, [onPickerChange])

  const handleClick = (e: ITouchEvent) => {
    props.onPickerClick && props.onPickerClick(e)
  }

  return (
    <Picker
      className='picker'
      mode='multiSelector'
      value={gradeTermValue}
      range={[gradeRange, semesterRange]}
      rangeKey='name'
      onChange={handleChange}
      onClick={handleClick}
    >
      <View className='picker-container' hoverClass='picker--hover'>
        <View className='picker-left'>
          <Text className='picker-text'>
            {`${gradeTermText.gradeText} ${gradeTermText.termText}`}
          </Text>
        </View>
        <Image
          className='picker-icon'
          src={require("../../assets/images/arrow-down-s-line.svg")}
        />
      </View>
    </Picker>
  )
}

export default SemesterPicker
