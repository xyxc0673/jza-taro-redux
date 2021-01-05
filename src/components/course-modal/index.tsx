import React from "react";
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import className from 'classnames'
import { useI18n } from '@i18n-chain/react'

import { ICourse } from '@/interfaces/couese'
import i18n from '@/i18n'

import './index.scss'

const weekTypeList = [i18n.weekType.all, i18n.weekType.odd, i18n.weekType.even]

interface IProps {
  course: ICourse
  isOpened: boolean
  onEdit: Function
  onDelete: Function
  onClose: (event: ITouchEvent) => any
}

const CourseModal: React.FC<IProps> = props => {

  const {
    isOpened,
    onEdit,
    onDelete,
    onClose,
    course = { oddOrEven: 0 } as ICourse
  } = props

  const backgroundClassName = className('background', {
    background__active: isOpened
  })

  const handleEdit = e => {
    e.stopPropagation()
    onEdit()
  }

  const handleDelete = e => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <View className={backgroundClassName} onClick={onClose || undefined}>
      <View
        className='container'
        style={{ backgroundColor: course.currentColor || '#fff', opacity: 0.95 }}
      >
        <View className='field'>
          <Image
            className='icon'
            src={require('../../assets/images/edit-circle-line.svg')}
          ></Image>
          <Text className='field-value'>{course.courseName}</Text>
        </View>
        <View className='field'>
          <Image
            className='icon'
            src={require('../../assets/images/account-pin-circle-line.svg')}
          ></Image>
          <Text className='field-value'>{course.teacher || 'N/A'}</Text>
        </View>
        <View className='field'>
          <Image
            className='icon'
            src={require('../../assets/images/map-pin-2-line.svg')}
          ></Image>
          <Text className='field-value'>{course.location || 'N/A'}</Text>
        </View>
        <View className='field'>
          <Image
            className='icon'
            src={require('../../assets/images/map-pin-time-line.svg')}
          ></Image>
          <Text className='field-value'>
            {`${course.firstWeek}-${course.lastWeek} ${
              weekTypeList[course.oddOrEven]
            } ${course.startTime}-${course.endTime}`}
          </Text>
        </View>
      </View>
      <View className='control-area'>
        <Image
          className='control-btn'
          src={require('../../assets/images/edit-box-line.svg')}
          onClick={handleEdit}
        />
        <Image
          className='control-btn'
          src={require('../../assets/images/delete-bin-line.svg')}
          onClick={handleDelete}
        />
      </View>
    </View>
  )
}

export default CourseModal
