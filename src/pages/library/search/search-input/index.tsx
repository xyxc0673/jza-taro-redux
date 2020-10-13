import React, {useState, useEffect } from "react";
import { View, Form, Input, OpenData } from "@tarojs/components";
import i18n from "@/i18n";

import "./index.scss";


const SearchInput = (props) => {
  const [keyword, setKeyword] = useState('')
  const [inputFocus, setInputFocus] = useState(false)

  useEffect(() => {
    setInputFocus(props.focus)

  }, [props])

  const handleSubmit = () => {
    props.onSubmit && props.onSubmit(keyword);
  }

  const handleInput = (e) => {
    setKeyword(e.currentTarget.value)
  }

  const handleBlur = () => {
    setInputFocus(false)
  }

  const handleFocus = () => {
    setInputFocus(true)
  }

  return (
    <View className='search-input'>
      <Form className='form' onSubmit={handleSubmit}>
        <View className='input-group'>
          <Input
            className='input'
            name='keyword'
            focus={inputFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            onFocus={handleFocus}
            onConfirm={handleSubmit}
            placeholder={i18n.librarySearch.inputPlaceholder}
            placeholderClass='input-placehoder'
          />
        </View>
      </Form>
      <View className='avatar' onClick={props.onAvatarClick}>
        <OpenData type='userAvatarUrl' />
      </View>

    </View>
  )
}

export default SearchInput;
