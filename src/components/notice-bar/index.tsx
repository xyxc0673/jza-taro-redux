import React, { useState } from 'react'
import { View, Text, Icon } from "@tarojs/components";
import './index.scss'

type IProps = {
    text: string
    visible: boolean
}

export const NoticeBar: React.FC<IProps> = (props) => {
    const [visible, setVisible] = useState(props.visible)

    return visible ?
    <View className='tip'>
        <Text>{props.text}</Text>
        <Icon className='tip-close' type='clear' color='#fff' size='15' onClick={() => setVisible(false)} />
    </View> : null

}