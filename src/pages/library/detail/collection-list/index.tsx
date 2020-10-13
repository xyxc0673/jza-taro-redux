import React from "react";
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import Messages from '@/messages'

import { hack } from '@i18n-chain/react'

import './index.scss'
import { ICollection } from "@/interfaces/book";
import i18n from "@/i18n";


interface IProps {
  visible: boolean
  bookTitle?: string
  collectionList: Array<ICollection>
}

const CollectionList: React.FC<IProps> = props => {
  const { collectionList = [] } = props

  let isShowYear: boolean = false
  let location: string = ''

  if (collectionList.length > 0) {
    isShowYear = collectionList[0].year.trim() !== ''
    location = collectionList[0].location
  }

  return (
    <View className='comp-collection-list'>
      <View className='title'>
        {location +
          ' - ' +
          (props.bookTitle
            ? props.bookTitle
            : i18n.libraryDetail.collectionTitle)}
      </View>
      <View className='collection-list'>
        <View className='collection-list-header'>
          <Text className='collection-list-item__content-first'>
            {i18n.libraryDetail.collectionBarCode}
          </Text>
          {isShowYear && (
            <Text className='collection-list-item__content-second'>
              {i18n.libraryDetail.collectionYear}
            </Text>
          )}
          <Text className='collection-list-item__content-last'>
            {i18n.libraryDetail.collectionState}
          </Text>
        </View>
        <View className='collection-list-body'>
          {collectionList.map(collection => {
            const stateClass = classNames(
              'collection-list-item__content-last',
              {
                'valid-text': collection.state === '可借'
              }
            )
            return (
              <View className='collection-list-item' key={collection.barCode}>
                <Text className='collection-list-item__content-first'>
                  {collection.barCode}
                </Text>
                {isShowYear && (
                  <Text className='collection-list-item__content-second'>
                    {i18n.libraryDetail.collectionYear}
                  </Text>
                )}
                <Text className={stateClass}>{collection.state}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default CollectionList
