import React from "react";
import { View, Text, Image } from '@tarojs/components'

import './index.scss'
import { IBook } from "@/interfaces/book";
import i18n from "@/i18n";


interface IProps {
  book: IBook
}

const Information: React.FC<IProps> = props => {
  const { book } = props
  return (
    <View className='comp-infomation'>
      <View className='comp-infomation-list'>
        <Text>作者：{book.author}</Text>
        <Text>出版社：{book.publisher}</Text>
        <Text>出版年份：{book.publishYear}</Text>
        <Text>索书号: {book.callNo || i18n.libraryBook.emptyCallNo}</Text>
      </View>
      <Image
        className='comp-infomation-cover'
        mode='aspectFit'
        src={book.imageUrl}
      />
    </View>
  )
}

export default Information
