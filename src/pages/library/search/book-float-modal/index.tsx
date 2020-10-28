import React from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import i18n from '@/i18n'
import FloatBottomModal from '@/components/float-bottom-modal'
import { IBook } from '@/interfaces/book'
import className from 'classnames'

import CollectionList from '../../detail/collection-list'
import './index.scss'

interface IProps {
  currBook: IBook
  currBookIndex?: number
  modalVisible: boolean
  onClose: Function
  dislikeBook: Function
  likeBook: Function
}

const BookFloatModal = (props: IProps) => {
  const {
    currBook = {} as IBook,
    modalVisible,
    onClose,
    likeBook,
    dislikeBook
  } = props

  return (
    <FloatBottomModal
      title={currBook ? currBook.title : ''}
      visible={modalVisible}
      onClose={() => onClose(false)}
    >
      <CollectionList
        visible={modalVisible}
        bookTitle={currBook ? currBook.callNo : ''}
        collectionList={currBook ? currBook.books : []}
      />
      <View>
        <View
          className={className('btn-like', {
            'btn-like__unlike': currBook.liked
          })}
          onClick={() => (currBook.liked ? dislikeBook() : likeBook())}
        >
          <Image
            className='btn-like__icon'
            src={
              currBook.liked
                ? require('../../../../assets/images/close-line.svg')
                : require('../../../../assets/images/add-line.svg')
            }
          />
          <Text className='btn-like__text'>
            {currBook.liked
              ? i18n.librarySearch.dislike
              : i18n.librarySearch.like}
          </Text>
        </View>
      </View>
    </FloatBottomModal>
  )
}

export default BookFloatModal
