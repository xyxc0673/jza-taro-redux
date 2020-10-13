import React, {
  useState,
  useEffect,
  useCallback
}  from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image, Picker, ScrollView } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import className from 'classnames'
import CountUp from '@/utils/libs/CountUp'
import Tip from '@/tip'
import {
  fetchCardBalance,
  fetchCardTransaction,
  changeCardTransactionDate
} from '@/store/actions/card'
import util from '@/util'
import i18n from '@/i18n'

import './index.scss'


interface ITransaction {
  time: string
  area: string
  tradeBranchName: string
  clientNo: string
  operateNo: string
  amount: number
}

const CONSTANTS = {
  startDate: 'startDate',
  endDate: 'endDate'
}

const Card: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false)
  const [showShadow, setShowShadow] = useState(false)
  const [balance, setBalance] = useState(0)
  const [isBalanceFetched, toggleBalanceFetched] = useState(false)
  const propsBalance = useSelector<any, any>(state => state.card.balance)
  const startDate = useSelector<any, any>(state => state.card.startDate)
  const endDate = useSelector<any, any>(state => state.card.endDate)
  const transaction = useSelector<any, Array<ITransaction>>(
    state => state.card.transactions
  )

  const dispatch = useDispatch()

  const fetchBalance = useCallback(async () => {
    // new CountUp(preBalance, 0, 2, 0.5, {
    //   printValue: _balance => {
    //     setBalance(_balance)
    //   }
    // }).start()

    const res = await dispatch(fetchCardBalance())
    console.log('res', res)
    if (!res) {
      return false
    }

    toggleBalanceFetched(true)
  }, [dispatch])

  const fetchTransaction = useCallback(() => {
    // if (!isBalanceFetched) {
    //   return
    // }
    dispatch(
      fetchCardTransaction({
        startDate,
        endDate
      })
    )
  }, [dispatch, startDate, endDate])

  useEffect(() => {
    const _startDate = util.deltaDate(-7)
    const _endDate = new Date()

    Taro.setNavigationBarTitle({ title: i18n.route.card })

    dispatch(
      changeCardTransactionDate({
        id: CONSTANTS.startDate,
        value: util.formatTime(_startDate)
      })
    )

    dispatch(
      changeCardTransactionDate({
        id: CONSTANTS.endDate,
        value: util.formatTime(_endDate)
      })
    )

    fetchBalance()
  }, [dispatch, fetchBalance])

  useEffect(() => {
    if (propsBalance) {
      new CountUp(0, balance, 2, 0.5, {
        printValue: _balance => {
          setBalance(_balance)
        }
      }).start()

      fetchTransaction()
    }
  }, [balance, fetchTransaction, propsBalance])

  const handlePickerChange = e => {
    const isStartDate = e.currentTarget.id === CONSTANTS.startDate
    const _startDate = isStartDate ? e.detail.value : startDate
    const _endDate = isStartDate ? endDate : e.detail.value
    console.log('_startDate', _startDate, _endDate, e)
    if (_startDate > _endDate) {
      Tip.showToast(i18n.card.invalidDate)
      return
    }

    dispatch(
      changeCardTransactionDate({
        id: [e.currentTarget.id],
        value: e.detail.value
      })
    )

    fetchTransaction()
  }

  const handleScroll = e => {
    const { scrollTop } = e.target

    setShowShadow(scrollTop > 10)
  }

  const addUp = transactions => {
    let total: number = 0
    if (!transactions) {
      return 0
    }
    transactions.map(item => {
      let amount = parseFloat(item.amount as string)
      if (amount < 0) {
        total += amount
      }
    })
    return total
  }

  const headerClass = className('header', {
    'header-shadow': showShadow
  })

  return (
    <View className='page-card'>
      <View className='section-balance'>
        <Image
          mode='widthFix'
          className='balance-card-bg'
          src={require('../../assets/images/jluzh-logo.png')}
        />
        <View className='balance-card'>
          {/* <View className='campus-card'>E-Card</View> */}
          <View className='campus-card'>{i18n.card.title}</View>
          <View className='balance-wrapper' onClick={fetchBalance}>
            <Text className='balance-value'>{balance}</Text>
            <Text className='balance-yuan'>￥</Text>
          </View>
        </View>
      </View>
      <View className='section-transaction'>
        <View className={headerClass}>
          <View className='header-top'>
            <Text className='header-title'>{i18n.card.transaction}</Text>
            <Text className='header-add-up'>
              {`${i18n.card.total}${addUp(transaction)}￥`}
            </Text>
          </View>
          <View hidden={showPicker} className='transaction-toolbar'>
            <Picker
              id={CONSTANTS.startDate}
              mode='date'
              value={startDate}
              onChange={handlePickerChange}
            >
              {startDate}
            </Picker>
            <Text className='date-divider'>-</Text>
            <Picker
              id={CONSTANTS.endDate}
              mode='date'
              value={endDate}
              onChange={handlePickerChange}
            >
              {endDate}
            </Picker>
          </View>
        </View>

        <ScrollView
          scrollY
          className='transaction-list'
          onScroll={handleScroll}
        >
          {transaction.map(item => {
            return (
              <View key={item.time} className='transaction'>
                <View className='transaction-container' key={item.time}>
                  <View className='transaction-left'>
                    <View className='transaction-addr'>
                      {item.tradeBranchName}
                    </View>
                    <View className='transaction-time'>{item.time}</View>
                  </View>
                  <View className='transaction-amount'>{item.amount}</View>
                </View>
                <View className='transaction-divider' />
              </View>
            )
          })}
          {transaction.length === 0 && (
            <View className='empty-view'>
              <Image
                className='empty-image'
                src={require('../../assets/images/undraw_eating_together.svg')}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default Card
