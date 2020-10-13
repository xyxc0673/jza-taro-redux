import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Form, Button } from '@tarojs/components'
import { useDispatch } from 'react-redux'

import Tip from '@/tip'
import Route from '@/route'
import QuestionKit from '@/components/question-kit'

import { eduLogin, setAccount } from '@/store/actions/edu'
import { cardLogin } from '@/store/actions/card'
import User from '@/services/user'
import i18n from '@/i18n'

import CustomInput from './CustomInput'

import './index.scss'

const Bind = () => {
  const [id, setId] = useState('')
  const [eduPwd, setEduPwd] = useState('')
  const [cardPwd, setCardPwd] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const account = Taro.getStorageSync('account')
    setId(account.id || '')
    setEduPwd(account.eduPwd || '')
    setCardPwd(account.cardPwd || '')
  }, [])

  const handleSubmit = async () => {
    const {
      id: _id = '',
      eduPwd: _eduPwd = '',
      cardPwd: _cardPwd = '',
    } = Taro.getStorageSync('account')

    const eduPwdCheck = ((param) => {
      return param && param.length > 5
    })(eduPwd)

    const cardPwdCheck = ((param) => {
      return param && param.length > 5
    })(cardPwd)

    if (id === '' || (eduPwd === '' && cardPwd === '')) {
      Tip.showToast(i18n.wrongInputTip)
      return
    }

    if (!eduPwdCheck && !cardPwdCheck) {
      Tip.showToast(i18n.wrongInputTip)
      return
    }

    const idCheck = _id != id

    const eduPwdDoubleCheck = eduPwdCheck && _eduPwd != eduPwd

    const cardPwdDoubleCheck = eduPwdCheck && _cardPwd != cardPwd

    console.log(_id, _id != id, idCheck, eduPwdDoubleCheck, cardPwdDoubleCheck)
    if (!idCheck && !eduPwdDoubleCheck && !cardPwdDoubleCheck) {
      Tip.showToast(i18n.commonBind.noChangeDetected)
      return
    }

    console.log('【教务系统鉴权】【开始】')

    const eduRes =
      ((idCheck && eduPwdCheck) || eduPwdDoubleCheck) &&
      (await dispatch<any>(
        eduLogin({
          id: id,
          pwd: eduPwd,
        })
      ))

    const eduBindSuccess = eduRes && eduRes.code === 1

    if (eduRes && eduRes.code === -1) {
      console.log('【教务系统鉴权】【失败】')
      return
    } else if (!eduRes) {
      console.log('【教务系统鉴权】【跳过】')
    } else {
      console.log('【教务系统鉴权】【成功】')
      User.makeChoices(id)
    }

    console.log(
      '【校园卡系统鉴权】【开始】',
      idCheck,
      cardPwdCheck,
      cardPwdDoubleCheck
    )

    const cardRes =
      ((idCheck && cardPwdCheck) || cardPwdDoubleCheck) &&
      (await dispatch<any>(
        cardLogin({
          id: id,
          pwd: cardPwd,
        })
      ))

    const cardBindSuccess = cardRes && cardRes.code === 1

    if (cardRes && cardRes.code === -1) {
      console.log('【校园卡系统鉴权】【失败】')
      return
    } else if (!cardRes) {
      console.log('【校园卡系统鉴权】【跳过】')
    } else {
      console.log('【校园卡系统鉴权】【成功】')
    }

    const accountChanges = { id }

    eduBindSuccess && (accountChanges['eduPwd'] = eduPwd)

    cardBindSuccess && (accountChanges['cardPwd'] = cardPwd)

    dispatch(
      setAccount({
        id: _id,
        eduPwd: _eduPwd,
        cardPwd: _cardPwd,
        ...accountChanges,
      })
    )

    // const router = useRouter()
    // const { event } = router.params

    // if (event) {
    //   Taro.eventCenter.trigger(event)
    // }

    Taro.navigateBack()
  }

  return (
    <View className='bind-page'>
      <View className='title'>{i18n.commonBind.title}</View>
      <Form className='form' onSubmit={handleSubmit}>
        <CustomInput
          label={i18n.commonBind.idLabel}
          value={id}
          onChange={setId}
          placeholder={i18n.commonBind.idPlaceHolder}
          password={false}
        />
        <CustomInput
          label={i18n.commonBind.eduPwdLabel}
          value={eduPwd}
          onChange={setEduPwd}
          placeholder={i18n.commonBind.eduPwdPlaceHolder}
          password
        />
        <CustomInput
          label={i18n.commonBind.cardPwdLabel}
          value={cardPwd}
          onChange={setCardPwd}
          placeholder={i18n.commonBind.cardPwdPlaceHolder}
          password
        />
        <QuestionKit
          size='24'
          qaList={[
            {
              id: 1,
              q: i18n.commonBind.qaList.q1,
              a: i18n.commonBind.qaList.a1,
            },
            {
              id: 2,
              q: i18n.commonBind.qaList.q2,
              a: i18n.commonBind.qaList.a2,
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
