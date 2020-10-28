import React from "react";
import { View, Text } from '@tarojs/components'
import i18n from '@/i18n'
import './index.scss'

interface IProps {
  isBinded: boolean
  balance: number
  onClick: Function
}

const BalanceCard: React.FC<IProps> = props => {
  return (
    <View className='comp-schedule-card' onClick={() => props.onClick()}>
      <View className='container'>
        {props.isBinded && <Text className='balance'>{props.balance || '1234.5'}</Text>}
        {!props.isBinded && <Text className='help-text'>{i18n.tabbarIndex.balanceCard.notConnect}</Text>}
      </View>
      <View className='money-symbol'>{i18n.tabbarIndex.balanceCard.balance}</View>
    </View>
  )
}

export default BalanceCard
