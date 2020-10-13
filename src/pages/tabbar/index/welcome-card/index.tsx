import React from "react";
import { View, Text, ITouchEvent } from '@tarojs/components'
import i18n from "@/i18n";
import Card from "@/components/card";
import './index.scss'

interface IProps {
    onClick?: (event: ITouchEvent<any>) => void
}

const WelcomeCard: React.FC<IProps> = (props) => {
    return (
        <Card onClick={props.onClick}><Text className='guide-text'>{i18n.guide}</Text></Card>
    )
}

export default WelcomeCard