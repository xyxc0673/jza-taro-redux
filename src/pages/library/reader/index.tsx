import React, { useState, useEffect } from "react";
import Taro from '@tarojs/taro'
import { View, OpenData, Text, Image } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'

import className from 'classnames'

import Route from '@/utils/route'
import {
  saveLibraryReaderState,
  fetchLibraryReaderInfo,
  fetchLibraryReaderCurrentCheckout,
  fetchLibraryReaderHistoryCheckout,
  likeBook,
  dislikeBook,
  fetchLibraryBookDetail
} from '@/store/actions/library'
import i18n from '@/i18n'
import { IBook } from '@/interfaces/book'

import './index.scss'
import BookFloatModal from '../search/book-float-modal'

enum tabType {
  bookshelf = 0,
  current = 1,
  history = 2
}

const Reader: React.FC = () => {
  const [currTab, setCurrTab] = useState(0)
  const [loginStatusText, setLoginStatusText] = useState(
    i18n.libraryReaderCenter.loginStatus.notLogin
  )
  const readerInfo = useSelector<any, any>(state => state.library.readerInfo)
  const currentCheckout = useSelector<any, any>(
    state => state.library.currentCheckout
  )
  const historyCheckout = useSelector<any, any>(
    state => state.library.historyCheckout
  )
  const id = useSelector<any, any>(state => state.user.id)
  const bookShelf = useSelector<any, Array<IBook>>(
    state => state.library.bookShelf
  )

  const dispatch = useDispatch()

  const [currBook, setCurrBook] = useState({} as IBook)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.route.libraryReaderCenter })

    const opacToken = Taro.getStorageSync('opacToken')

    if (!opacToken) {
      return
    }

    dispatch(
      saveLibraryReaderState({
        id: Taro.getStorageSync('opacAccount').id,
        login: false,
        opacToken: opacToken
      })
    )

    init()
  }, [dispatch, init])

  const init = async () => {
    const res = await dispatch(fetchLibraryReaderInfo())

    if (typeof res === 'undefined') {
      setLoginStatusText(i18n.libraryReaderCenter.loginStatus.expired)
      return
    }

    dispatch(fetchLibraryReaderCurrentCheckout())
    dispatch(fetchLibraryReaderHistoryCheckout())

    setLoginStatusText(id)
  }

  const switchTab = (_currTab: number) => {
    setCurrTab(_currTab)
  }

  const goBookSearch = () => {
    Route.navTo(Route.path.libraryBookSearch)
  }

  const goReaderBind = () => {
    Route.navTo(Route.path.libraryReaderBind)
  }

  const tabClass = active => {
    return className('tab-item', {
      'tab-item--active': active
    })
  }

  const showBookDetail = async (book: IBook) => {
    await dispatch(
      fetchLibraryBookDetail({
        marcNo: book.marcNo,
        isbn: book.isbn
      })
    )
    setCurrBook(book)
    setModalVisible(true)
  }

  const isTabTypeCurrent = currTab === tabType.current

  const currBookList = isTabTypeCurrent ? currentCheckout : historyCheckout

  return (
    <View className='reader-page'>
      <View className='info'>
        <View className='info-first' onClick={goReaderBind}>
          <View className='reader-info'>
            <OpenData className='reader-info__avatar' type='userAvatarUrl' />
            <View className='column'>
              <OpenData className='reader-info__nickname' type='userNickName' />
              <Text className='login-status'>{loginStatusText}</Text>
            </View>
          </View>
          <View className='arrow' />
        </View>
        <View className='info-second'>
          <View className='grid'>
            <View className='grid-item'>
              <Text className='grid-item__value'>
                {currentCheckout.length + historyCheckout.length}
              </Text>
              <Text className='grid-item__key'>
                {i18n.libraryReaderCenter.grid.total}
              </Text>
            </View>
            <View className='grid-item'>
              <Text className='grid-item__value'>{currentCheckout.length}</Text>
              <Text className='grid-item__key'>
                {i18n.libraryReaderCenter.grid.current}
              </Text>
            </View>
            <View className='grid-item'>
              <Text className='grid-item__value'>{readerInfo.nearExpire}</Text>
              <Text className='grid-item__key'>
                {i18n.libraryReaderCenter.grid.nearExpire}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className='tab'>
        <View className='tab-container'>
          <Text
            className={tabClass(currTab === tabType.bookshelf)}
            onClick={() => switchTab(tabType.bookshelf)}
          >
            {`${i18n.libraryReaderCenter.tab.bookshelf}(${
              bookShelf.length
            })`}
          </Text>
          <View className='line' />
          <Text
            className={tabClass(currTab === tabType.current)}
            onClick={() => switchTab(tabType.current)}
          >
            {`${i18n.libraryReaderCenter.tab.currentCheckout}(${
              currentCheckout.length
            })`}
          </Text>
          <View className='line' />
          <Text
            className={tabClass(currTab === tabType.history)}
            onClick={() => switchTab(tabType.history)}
          >
            {`${i18n.libraryReaderCenter.tab.historyCheckout}(${
              historyCheckout.length
            })`}
          </Text>
        </View>
      </View>

      <View className='book-list'>
        {currTab === tabType.bookshelf &&
          bookShelf.length !== 0 &&
          bookShelf.map(item => {
            return (
              item && (
                <View className='book' key={item.title}>
                  <Text className='book-title'>{item.title}</Text>
                  <Text className='book-author'>{`${item.author} \\ ${item.publisher} \\ ${item.publishYear}`}</Text>
                  <View className='book-datetime'>
                    {/* <Text className='book-callNo'>
                    {`${i18n.libraryBook.callNo} | ${item.callNo ||
                      i18n.libraryBook.emptyCallNo}`}
                  </Text>
                  <Text className='point'> ● </Text> */}
                    <View
                      className={className('book-num', {
                        'book-num__active': item.refresh
                      })}
                      onClick={() => showBookDetail(item)}
                    >
                      <Text className='book-num__text'>
                        {`${
                          item.docTypeName !== '中文期刊'
                            ? i18n.libraryBook.remain +
                              ' ' +
                              item.remainNumber
                            : i18n.libraryBook.canRead
                        } | ${
                          i18n.libraryBook.total
                        } ${item.totalNumber || ''}`}
                      </Text>
                      <Image
                        className='book-num__icon'
                        src={require('../../../assets/images/refresh-line.svg')}
                      />
                    </View>
                  </View>
                </View>
              )
            )
          })}
        {currTab !== tabType.bookshelf &&
          currBookList.length &&
          currBookList.map(item => {
            return (
              <View className='book' key={item.title}>
                <Text className='book-title'>{item.title}</Text>
                <Text className='book-author'>{item.author}</Text>
                <View className='book-datetime'>
                  <Text>
                    {`${i18n.libraryReaderCenter.lendAt} ${
                      item.lendDate
                    }`}
                  </Text>
                  <Text className='point'> ● </Text>
                  <Text>
                    {`${
                      isTabTypeCurrent
                        ? i18n.libraryReaderCenter.shouldReturnAt
                        : i18n.libraryReaderCenter.returnAt
                    } ${item.returnDate}`}
                  </Text>
                </View>
              </View>
            )
          })}

        {(bookShelf.length === 0 || currBookList.length === 0) && (
          <View className='empty-list-tip' onClick={goBookSearch}>
            <Image
              className='empty-list-tip__image'
              src={require('../../../assets/images/undraw_reading_time.svg')}
            />
            {i18n.libraryReaderCenter.emptyCheckoutTip}
          </View>
        )}
      </View>
      <BookFloatModal
        currBook={currBook}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        likeBook={() => dispatch(likeBook({ book: currBook }))}
        dislikeBook={() => dispatch(dislikeBook({ book: currBook }))}
      />
    </View>
  )
}

export default Reader
