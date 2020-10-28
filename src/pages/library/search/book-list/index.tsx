import React from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import {  } from '@i18n-chain/react'
import i18n from '@/i18n'
import { IBook } from '@/interfaces/book'

import './index.scss'



interface IProps {
  bookList: Array<IBook>
  emptyCoverImage: string
  onItemClick: Function
}

const BookList = (props: IProps) => {
  const handleBookClick = (item: IBook, index: number) => {
    props.onItemClick && props.onItemClick(item, index)
  }

  const combineBookInfo = (list: Array<string>) => {
    const newList: Array<string> = []

    for (let info of list) {
      if (!info || typeof info === 'undefined') break
      newList.push(info)
    }

    return newList.join(' \\ ')
  }
  return (
    <View className='book-list'>
      {props.bookList.length === 0 && (
        <Image
          className='empty-image'
          src={require('../../../../assets/images/undraw_book_lover.svg')}
        />
      )}
      {props.bookList &&
        props.bookList.map((item, index) => {
          // 避免出现 undefined
          const remainNumber = item.remainNumber || 'N/A'
          const totalNumber = item.totalNumber || 'N/A'

          const bookInfo = combineBookInfo([
            item.author,
            item.publisher,
            item.publishYear,
            item.isbn
          ])
          const numInfo = `${
            item.docTypeName !== '中文期刊'
              ? i18n.libraryBook.remain + ' ' + remainNumber
              : i18n.libraryBook.canRead
          } | ${i18n.libraryBook.total} ${totalNumber || ''}`
          const callInfo = `${i18n.libraryBook.callNo} | ${item.callNo ||
            i18n.libraryBook.emptyCallNo}`

          return (
            <View
              className='book-list__item'
              key={item.isbn}
              onClick={() => handleBookClick(item, index)}
            >
              <Image
                className='book-list__item-cover'
                mode='aspectFit'
                src={props.emptyCoverImage}
              ></Image>
              <View className='right'>
                <Text className='book-list__item-title'>{item.title}</Text>
                <Text className='book-list__item-info'>{bookInfo}</Text>
                <View className='right-bottom'>
                  <View className='item-wrapper'>
                    <Text className='book-list__item-number'>{numInfo}</Text>
                  </View>
                  <View className='item-wrapper'>
                    <Text className='book-list__item-callNo'>{callInfo}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
    </View>
  )
}

BookList.defaultProps =  {
  bookList: []
}

export default BookList
