import React from "react";
import { View, Text, ITouchEvent } from '@tarojs/components'
import './index.scss'

interface IProps {
    children: React.ReactNode
    onClick?: (event: ITouchEvent<any>) => void
}

const Card: React.FC<IProps> = (props) => {
    return (
        <View className='card' {...props}>
            {props.children}
        </View>
    )
}

export default Card