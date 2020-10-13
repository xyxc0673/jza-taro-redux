import {
  CARD_LOGIN,
  CARD_BALANCE,
  CARD_TRANSACTION,
  CARD_TRANSACTION_DATE
} from '@/store/constants/card'

const initialState = {
  balance: 0,
  transactions: [],
  startDate: '',
  endDate: '',
}

export default function card(state = initialState, action) {
  switch (action.type) {
    case CARD_LOGIN:
      return {
        ...state,
      }
    case CARD_BALANCE:
      return {
        ...state,
        balance: action.payload.data.balance
      }
    case CARD_TRANSACTION:
      return {
        ...state,
        transaction: action.payload.data.transactions
      }
    case CARD_TRANSACTION_DATE:
      return {
        ...state,
        [action.payload.id]: action.payload.value
      }
    default:
      return state
  }
}