import React, { useState, useEffect } from 'react'
import { View, Label, Input, Icon } from '@tarojs/components'
import className from 'classnames'
import './index.scss'

const CustomInput = (props: {
  label
  value
  onChange
  placeholder
  password
}) => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState(props.value)

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value, value])

  return (
    <View
      className={className('form-control', { 'form-control__focus': focus })}
    >
      <Label className='form-control__label'>{props.label}</Label>
      <Input
        value={value}
        className='form-control__input'
        onInput={(e) => {
          const v = e.detail.value
          setValue(v)
          props.onChange(v)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={props.placeholder}
        password={props.password}
      />
      {(focus || value !== '') && (
        <Icon type='clear' onClick={() => setValue('')} />
      )}
    </View>
  )
}

export default CustomInput
