import api from '@/api'

import { createApiAction, createAction } from "."

import {
  LIBRARY_BOOK_SEARCH,
  LIBRARY_BOOK_DETAIL,
  LIBRARY_BOOK_INFO,
  LIBRARY_READER_STATE,
  LIBRARY_READER_LOGIN,
  LIBRARY_READER_CAPTCHA,
  LIBRARY_READER_INFO,
  LIBRARY_READER_CURRENT_CHECKOUT,
  LIBRARY_READER_HISTROY_CHECKOUT,
  LIBRARY_LIKE_BOOK,
  LIBRARY_DISLIKE_BOOK
} from "../constants/library";

// action in search book

export const fetchLibraryBookList = createApiAction(LIBRARY_BOOK_SEARCH, (payload) => {
  return api.libraryBookList(payload)
})

export const fetchLibraryBookInfo = createApiAction(LIBRARY_BOOK_INFO, (payload) => {
  return api.libraryBookInfo(payload)
})

export const fetchLibraryBookDetail = createApiAction(LIBRARY_BOOK_DETAIL, (payload) => {
  return api.libraryBookDetail(payload)
})

// action in reader center

export const saveLibraryReaderState = createAction(LIBRARY_READER_STATE)

export const libraryReaderLogin = createApiAction(LIBRARY_READER_LOGIN, (payload) => {
  return api.libraryReaderLogin(payload)
})

export const fetchLibraryReaderCaptcha = createApiAction(LIBRARY_READER_CAPTCHA, (payload) => {
  return api.libraryReaderCaptcha(payload)
})

export const fetchLibraryReaderInfo = createApiAction(LIBRARY_READER_INFO, (payload) => {
  return api.libraryReaderInfo(payload)
})

export const fetchLibraryReaderCurrentCheckout = createApiAction(LIBRARY_READER_CURRENT_CHECKOUT, (payload) => {
  return api.libraryReaderCurrentCheckout(payload)
})

export const fetchLibraryReaderHistoryCheckout = createApiAction(LIBRARY_READER_HISTROY_CHECKOUT, (payload) => {
  return api.libraryReaderHistoryCheckout(payload)
})

export const likeBook = createAction(LIBRARY_LIKE_BOOK)

export const dislikeBook = createAction(LIBRARY_DISLIKE_BOOK)