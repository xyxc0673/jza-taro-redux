import React, { useReducer, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Form,
  Label,
  Input,
  Image,
  Icon,
  Button,
} from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { useI18n } from "@i18n-chain/react";

import QuestionKit from '@/components/question-kit'

import Tip from '@/tip'
import Messages from '@/messages'

import {
  fetchLibraryReaderCaptcha,
  libraryReaderLogin,
} from '@/store/actions/library'
import i18n from '@/i18n'

import './index.scss'

enum InputType {
  ID = 'id',
  PWD = 'pwd',
  CAPTCHA = 'captcha',
}

const { id = '', pwd = '' } = Taro.getStorageSync('opacAccount')

const initialState = {
  id: id,
  pwd: pwd,
  captcha: '',
}

const initialFocusState = {
  idFocus: false,
  pwdFocus: false,
  captchaFocus: false,
}

const loginReducer = (state, action) => {
  console.log('loginReducer', state, action)
  switch (action.type) {
    case 'setId':
      return {
        ...state,
        id: action.id,
      }
    case 'setPwd':
      return {
        ...state,
        pwd: action.pwd,
      }
    case 'setCaptcha':
      return {
        ...state,
        captcha: action.captcha,
      }
    default:
      break
  }
}

const focusReducer = (state, action) => {
  switch (action.type) {
    case 'idFocus':
      return {
        ...state,
        idFocus: action.idFocus,
      }
    case 'pwdFocus':
      return {
        ...state,
        pwdFocus: action.pwdFocus,
      }
    case 'captchaFocus':
      return {
        ...state,
        captchaFocus: action.captchaFocus,
      }
    default:
      break
  }
}

const Bind: React.FC = () => {
  useI18n(i18n)
  
  const [loginState, loginDispatch] = useReducer(loginReducer, initialState)
  const [focusState, focusDispatch] = useReducer(
    focusReducer,
    initialFocusState
  )
  const captchaSource = useSelector<any, any>(
    (state) => state.library.captchaSource
  )
  const captchaToken = useSelector<any, any>(
    (state) => state.library.captchaToken
  )
  const loginFailCount = useSelector<any, any>(
    (state) => state.library.loginFailCount
  )
  const isLogged = useSelector<any, any>((state) => state.library.isLogged)
  const dispatch = useDispatch()

  useEffect(() => {
    loginDispatch({ type: 'setCaptcha', captcha: '' })
    refreshCaptcha()
  }, [loginFailCount, refreshCaptcha])

  useEffect(() => {
    if (isLogged) {
      Taro.navigateBack()
    }
  }, [isLogged])

  const handleSubmit = async () => {
    const { id, pwd, captcha } = loginState

    if (id === '' || pwd === '' || captcha === '') {
      Tip.showToast(Messages.wrongInputTip)
      return
    }

    dispatch(
      libraryReaderLogin({
        id: id,
        pwd: pwd,
        captcha: captcha,
        token: captchaToken,
      })
    )
  }

  const handleInput = (e) => {
    const id = e.currentTarget.id
    const newId = id.charAt(0).toUpperCase() + id.slice(1)
    loginDispatch({ type: `set${newId}`, [id]: e.detail.value })
  }

  const handleFocus = (key: string) => {
    focusDispatch({ type: `${key}Focus`, [key]: true })
  }

  const handleBlur = (key: string) => {
    focusDispatch({ type: `${key}Focus`, [key]: false })
  }

  const handleClear = (key: string) => {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1)
    loginDispatch({ type: `set${newKey}`, [key]: '' })
  }

  const refreshCaptcha = useCallback(() => {
    dispatch(fetchLibraryReaderCaptcha())
  }, [dispatch])

  const focus = (key) => (key ? 'form-control focus' : 'form-control')
  const shouldIconShow = (str, focus) => {
    console.log('shouldIconShow', str, focus, str && focus)
    return str && focus
  }

  return (
    <View className='bind-page'>
      <View className='title'>{i18n.libraryReaderLogin.title}</View>
      <Form className='form' onSubmit={handleSubmit}>
        <View className={focus(focusState.idFocus)}>
          <Label className='form-control__label'>
            {i18n.libraryReaderLogin.idLabel}
          </Label>
          <Input
            id={InputType.ID}
            value={loginState.id}
            className='form-control__input'
            onInput={handleInput}
            onFocus={() => handleFocus(InputType.ID)}
            onBlur={() => handleBlur(InputType.ID)}
            placeholder={i18n.libraryReaderLogin.idPlaceHolder}
          />
          {(loginState.id !== '' || focusState.idFocus) && (
            <Icon type='clear' onClick={() => handleClear(InputType.ID)} />
          )}
        </View>
        <View className={focus(focusState.pwdFocus)}>
          <Label className='form-control__label'>
            {i18n.libraryReaderLogin.pwdLabel}
          </Label>
          <Input
            id={InputType.PWD}
            value={loginState.pwd}
            type='number'
            password
            className='form-control__input'
            placeholder={i18n.libraryReaderLogin.pwdPlaceHolder}
            onInput={handleInput}
            onFocus={() => handleFocus(InputType.PWD)}
            onBlur={() => handleBlur(InputType.PWD)}
          />
          {(loginState.pwd !== '' || focusState.pwdFocus) && (
            <Icon type='clear' onClick={() => handleClear(InputType.PWD)} />
          )}
        </View>
        <View className={focus(focusState.captchaFocus)}>
          <Label className='form-control__label'>
            {i18n.libraryReaderLogin.captchaLabel}
          </Label>
          <Input
            id={InputType.CAPTCHA}
            value={loginState.captcha}
            className='form-control__input'
            placeholder={i18n.libraryReaderLogin.captchaPlaceHolder}
            onInput={handleInput}
            onFocus={() => handleFocus(InputType.CAPTCHA)}
            onBlur={() => handleBlur(InputType.CAPTCHA)}
            onConfirm={handleSubmit}
          />
          <Image
            className='captcha'
            src={`data:image/jpeg;base64,${captchaSource}`}
            onClick={refreshCaptcha}
          />
        </View>
        <QuestionKit
          size='24'
          qaList={[
            {
              id: 1,
              q: i18n.libraryReaderLogin.qaList.q1,
              a: i18n.libraryReaderLogin.qaList.a1,
            },
            {
              id: 2,
              q: i18n.libraryReaderLogin.qaList.q2,
              a: i18n.libraryReaderLogin.qaList.a2,
            },
            {
              id: 2,
              q: i18n.libraryReaderLogin.qaList.q3,
              a: i18n.libraryReaderLogin.qaList.a3,
            },
          ]}
          modalTitle={i18n.modalHelpTitle}
          className='help-btn'
        />
        <Button className='btn' formType='submit'>
          {i18n.confirm}
        </Button>
      </Form>
    </View>
  )
}

export default Bind
