import React, { useState, useEffect, useCallback } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLibraryBookDetail } from '@/store/actions/library'

import './index.scss'

import CollectionList from './collection-list'
import Information from './Information'
import i18n from '@/i18n'
import { IBook } from '@/interfaces/book'

const Detail = () => {
  const [currBook, setCurrBook] = useState({} as IBook)

  const bookList = useSelector<any, Array<IBook>>(
    (state) => state.library.bookList
  )

  const dispatch = useDispatch()
  const router = useRouter()

  const bookSelected = router.params

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.libraryDetail.title })
    dispatch(fetchLibraryBookDetail(bookSelected))
  }, [dispatch, bookSelected])

  const loadCurrBook = useCallback(() => {
    for (let book of bookList) {
      if (book.marcNo === bookSelected.marcNo) {
        setCurrBook(book)
        break
      }
    }
  }, [bookList, bookSelected])

  useEffect(() => {
    loadCurrBook()
  }, [bookList, bookSelected, loadCurrBook])

  return (
    <View className='detail-page'>
      <View className='title'>{currBook.title}</View>
      <Information book={currBook}></Information>
      {/* <Summary content={currBook.detail.summary}></Summary> */}
      <CollectionList visible collectionList={currBook.books}></CollectionList>
    </View>
  )
}

export default Detail
