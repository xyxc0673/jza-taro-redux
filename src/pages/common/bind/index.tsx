import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Form, Button } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from "@i18n-chain/react";

import Tip from '@/tip'
import Route from '@/route'
import QuestionKit from '@/components/question-kit'

import { eduLogin, setAccount } from '@/store/actions/edu'
import { cardLogin } from '@/store/actions/card'
import User from '@/services/user'
import i18n from '@/i18n'

import CustomInput from './CustomInput'

import './index.scss'
import { NoticeBar } from '@/components/notice-bar';
import { LoginType } from '@/data/enums/login-type';

const Bind = () => {
  useI18n(i18n)

  const router = useRouter()

  const isEdu = (router.params.type || LoginType.edu) === LoginType.edu

  const type = isEdu ? '教务系统' : '校园卡'

  const account = useSelector(state => state.edu.account)

  const [id, setId] = useState(account.id)
  const [pwd, setPwd] = useState(isEdu ? account.eduPwd : account.cardPwd)

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    const {
      id: preId = '',
      eduPwd: preEduPwd = '',
      cardPwd: preCardPwd = '',
    } = account

    const prePwd = isEdu ? preEduPwd : preCardPwd

    const pwdCheck = ((param) => {
      return param && param.length > 5
    })(pwd)

    if (id === '' || (pwd === '')) {
      Tip.showToast(i18n.wrongInputTip)
      return
    }

    if (!pwdCheck) {
      Tip.showToast(i18n.wrongInputTip)
      return
    }

    const idCheck = preId != id

    const pwdDoubleCheck = pwdCheck && prePwd != pwd

    if (!idCheck && !pwdDoubleCheck) {
      Tip.showToast(i18n.commonBind.noChangeDetected)
      return
    }

    console.log('【教务系统鉴权】【开始】')

    const login = isEdu ? eduLogin : cardLogin

    const res =
      ((idCheck && pwdCheck) || pwdDoubleCheck) &&
      (await dispatch<any>(
        login({
          id: id,
          pwd: pwd,
        })
      ))

    const bindSuccess = res && res.code === 1

    if (res && res.code === -1) {
      console.log(`【${type}鉴权】【失败】`)
      return
    } else if (res === undefined) {
      return
    } else if (!res) {
      console.log(`【${type}鉴权】【跳过】`)
    } else {
      console.log(`【${type}鉴权】【成功】`)
      User.makeChoices(id)
    }

    const accountChanges = { id }

    if (bindSuccess) {
      if (isEdu) {
        accountChanges['eduPwd'] = pwd
      } else {
        accountChanges['cardPwd'] = pwd
      }
    }

    dispatch(
      setAccount({
        ...account,
        ...accountChanges,
      })
    )

    Taro.navigateBack()
  }

  const pwdPlaceHolder = isEdu ? i18n.commonBind.eduPwdPlaceHolder : i18n.commonBind.cardPwdPlaceHolder
  const title = isEdu ? i18n.commonBind.eduTitle : i18n.commonBind.cardTitle

  return (
    <View className='bind-page'>
      <NoticeBar text={i18n.unmaintained} visible={!isEdu} />
      <View className='container'>
        <View className='title'>{title}</View>
        <Form className='form' onSubmit={handleSubmit}>
          <CustomInput
            label={i18n.commonBind.idLabel}
            value={id}
            onChange={setId}
            placeholder={i18n.commonBind.idPlaceHolder}
            password={false}
          />
          <CustomInput
            label={i18n.commonBind.pwdLabel}
            value={pwd}
            onChange={setPwd}
            placeholder={pwdPlaceHolder}
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
    </View>
  )
}

export default Bind
