import api from '@/api'
import { CARD_LOGIN, CARD_BALANCE, CARD_TRANSACTION, CARD_TRANSACTION_DATE } from '@/store/constants/card'

import { createAction, createApiAction } from '.'

export const cardLogin = createApiAction(CARD_LOGIN, payload => {
  return api.cardLogin(payload)
})

export const fetchCardBalance = createApiAction(CARD_BALANCE, payload => {
  return api.cardBalance(payload)
})

export const fetchCardTransaction = createApiAction(CARD_TRANSACTION, payload => {
  return api.cardTransaction(payload)
})

export const changeCardTransactionDate = createAction(CARD_TRANSACTION_DATE)
