import { IBook } from '@/interfaces/book'
import Library from '@/services/library'
import Tip from '@/tip'
import {
  LIBRARY_BOOK_SEARCH,
  LIBRARY_BOOK_DETAIL,
  LIBRARY_BOOK_INFO,
  LIBRARY_READER_STATE,
  LIBRARY_READER_CAPTCHA,
  LIBRARY_READER_INFO,
  LIBRARY_READER_CURRENT_CHECKOUT,
  LIBRARY_READER_HISTROY_CHECKOUT,
  LIBRARY_READER_LOGIN,
  LIBRARY_LIKE_BOOK,
  LIBRARY_DISLIKE_BOOK
} from '../constants/library'

const initialState = {
  bookShelf: Library.getBookShelf().map(item => ({
    ...item,
    refresh: false
  })) as Array<IBook>,
  dataBooks: [],
  bookList: [] as Array<IBook>,
  bookShowCount: 0,
  bookTotalCount: 0,
  bookSelected: {},
  isFetchBookList: false,

  captchaSource: '',
  captchaToken: '',
  opacToken: '',

  currentCheckout: [],
  historyCheckout: [],

  isLogged: false,
  loginFailCount: 0,

  readerInfo: {
    order: 0,
    expired: 0,
    nearExpire: 0
  }
}

export default function library(state = initialState, action) {
  // Note 要先判断 action.payload 是否存在，不然会报错 undefined
  const data = action.payload ? action.payload.data : {}

  const mapAction = (list, by, what) => {
    const res = list.map(item => {
      if (item[by] === action.params[by]) {
        // Note 这里需要用 {} 来创建一个新对象以触发 state 的更新
        return Object.assign({}, item, what ? data[what] : data)
      }
      return item
    })
    return res
  }

  switch (action.type) {
    case LIBRARY_READER_LOGIN:
      return {
        ...state,
        id: action.params.id,
        opacToken: action.params.opacToken,
        isLogged: action.payload.code === 1,
        loginFailCount:
          action.payload.code !== 1
            ? state.loginFailCount + 1
            : state.loginFailCount
      }
    case LIBRARY_BOOK_SEARCH:
      const newSearch = action.params.page === 1
      const bookList = newSearch
        ? data.books
        : state.bookList.concat(data.books)

      state.bookShelf.forEach(likedBook => {
        const index = bookList.findIndex(
          item => item.callNo === likedBook.callNo
        )
        if (index !== -1) {
          bookList[index] = Object.assign(bookList[index], {
            liked: true
          })
        }
      })

      if (data.books.length === 0) {
        Tip.showToast('查询到的数据为空', false)
      }

      return {
        ...state,
        dataBooks: data.books,
        bookList: bookList,
        bookShowCount: newSearch
          ? data.count
          : state.bookShowCount + data.count,
        bookTotalCount: data.total_count,
        isFetchBookList: true
      }
    case LIBRARY_BOOK_INFO:
      return {
        ...state,
        bookList: [...mapAction(state.bookList, 'marcNo', 'details')],
        isFetchBookList: false
      }
    case LIBRARY_BOOK_DETAIL:
      let newBookShelf = [...state.bookShelf]
      const bookIndex = newBookShelf.findIndex(
        item => item.marcNo === action.params.marcNo
      )
      if (bookIndex !== -1) {
        newBookShelf[bookIndex] = Object.assign(newBookShelf[bookIndex], {
          refresh: true,
          refreshedAt: new Date().getUTCMilliseconds(),
          ...data
        })
        Library.setBookShelf(newBookShelf)
      }
      return {
        ...state,
        bookShelf: newBookShelf,
        bookList: [...[...mapAction(state.bookList, 'marcNo', '')]],
        bookSelected: action.params
      }
    case LIBRARY_READER_STATE:
      return {
        ...state,
        id: action.payload.id,
        login: action.payload.login,
        opacToken: action.payload.opacToken
      }
    case LIBRARY_READER_CAPTCHA:
      return {
        ...state,
        captchaSource: data.captcha,
        captchaToken: data.token
      }
    case LIBRARY_READER_INFO:
      return {
        ...state,
        readerInfo: data
      }
    case LIBRARY_READER_CURRENT_CHECKOUT:
      return {
        ...state,
        currentCheckout: data.record
      }
    case LIBRARY_READER_HISTROY_CHECKOUT:
      return {
        ...state,
        historyCheckout: data.record
      }
    case LIBRARY_LIKE_BOOK:
      let newBookList = [...state.bookList]
      if (action.payload.currBookIndex !== -1) {
        newBookList[action.payload.currBookIndex] = Object.assign(
          action.payload.book,
          { liked: true }
        )
      }
      Library.setBookShelf([...state.bookShelf, action.payload.book])
      return {
        ...state,
        bookList: newBookList,
        bookShelf: [...state.bookShelf, action.payload.book]
      }
    case LIBRARY_DISLIKE_BOOK:
      newBookList = [...state.bookList]
      if (action.payload.currBookIndex !== -1) {
        newBookList[action.payload.currBookIndex] = Object.assign(
          action.payload.book,
          { liked: false }
        )
      }
      newBookShelf = state.bookShelf.filter(
        item => item.marcNo !== action.payload.book.marcNo
      )
      Library.setBookShelf(newBookShelf)
      return {
        ...state,
        bookList: newBookList,
        bookShelf: newBookShelf
      }
    default:
      return state
  }
}
