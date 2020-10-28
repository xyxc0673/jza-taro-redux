import React, { useState, useEffect } from 'react'
import Taro, { useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from "@i18n-chain/react";

import i18n from '@/i18n'
import Route from '@/route'
import {
  fetchLibraryBookList,
  fetchLibraryBookDetail,
  likeBook,
  dislikeBook,
} from '@/store/actions/library'
import { IBook } from '@/interfaces/book'

import './index.scss'

import SearchInput from './search-input'
import BookList from './book-list'
import BookFloatModal from './book-float-modal'

const Search = () => {
  useI18n(i18n)
  
  const [keyword, setKeyword] = useState('')
  const [currPage, setCurrPage] = useState(1)
  const [inputFocus, setInputFocus] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [currBook, setCurrBook] = useState({} as IBook)
  const [currBookIndex, setCurrBookIndex] = useState(-1)
  const bookList = useSelector<any, Array<IBook>>(
    (state) => state.library.bookList
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (currBookIndex === -1) {
      return
    }
    setCurrBook(bookList[currBookIndex])
  }, [bookList, currBookIndex])

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.route.librarySearch })
    Taro.setNavigationBarColor({
      backgroundColor: '#00b294',
      frontColor: '#ffffff',
    })
  }, [])

  // const triggerGetBookInfo = useCallback(
  //   () => {
  //     dataBooks.forEach(bookItem => {
  //       dispatch(
  //         fetchLibraryBookInfo({
  //           isbn: bookItem.isbn,
  //           marcNo: bookItem.marcNo
  //         })
  //       )
  //       setIsFetechBookInfo(false)
  //     })
  //   },
  //   [dataBooks, dispatch],
  // )

  // useEffect(() => {
  //   triggerGetBookInfo()
  // }, [dataBooks, triggerGetBookInfo])

  useReachBottom(() => {
    handleLoadMore()
  })
  const searchAndLoadInfo = async (_keyword, page) => {
    dispatch(fetchLibraryBookList({ keyword: _keyword, page: page }))

    setCurrPage(page)
  }

  const handleSearchBook = (_keyword) => {
    setInputFocus(false)
    setKeyword(_keyword)

    searchAndLoadInfo(_keyword, 1)
  }

  const handleLoadMore = () => {
    if (!keyword) {
      return
    }

    searchAndLoadInfo(keyword, currPage + 1)
  }

  const handleBookClick = async (bookItem: IBook, index: number) => {
    // const params = {
    //   isbn: bookItem.isbn,
    //   marcNo: bookItem.marcNo
    // }
    // Route.navTo(Route.path.libraryBookDetail, params)
    await dispatch(
      fetchLibraryBookDetail({
        marcNo: bookItem.marcNo,
        isbn: bookItem.isbn,
      })
    )
    console.log('bookList', index, bookList[index])
    setCurrBookIndex(index)
    setModalVisible(true)
  }

  const handleAvatarClick = () => {
    Route.navTo(Route.path.libraryReaderCenter)
  }

  return (
    <View className='page-search'>
      <SearchInput
        onSubmit={handleSearchBook}
        focus={inputFocus}
        onAvatarClick={handleAvatarClick}
      />
      <BookList
        bookList={bookList}
        emptyCoverImage={require('../../../assets/images/empty-cover.svg')}
        onItemClick={handleBookClick}
      />

      <BookFloatModal
        currBook={currBook}
        currBookIndex={currBookIndex}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        likeBook={() =>
          dispatch(likeBook({ book: currBook, currBookIndex: currBookIndex }))
        }
        dislikeBook={() =>
          dispatch(
            dislikeBook({ book: currBook, currBookIndex: currBookIndex })
          )
        }
      />
      {/* <FloatButton onClick={handleFloatButtonClick}></FloatButton> */}
    </View>
  )
}

export default Search
