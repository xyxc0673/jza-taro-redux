import React from "react"
import Taro from '@tarojs/taro'
import { Button, View, Text, Image } from "@tarojs/components"
import { useI18n } from "@i18n-chain/react";
import i18n from "@/i18n";
import Tip from "@/tip";
import Route from "@/utils/route";
import "./index.scss"

const Feedback = () => {
    useI18n(i18n)

  return (
    <View className='page-feedback'>
      <Image
        className='img'
        src={require("../../../assets/images/undraw_welcome_cats.svg")}
      />
      <View className='container'>
        <Button openType='contact'>{i18n.feedback.contact}</Button>
        <Text className='or'>{i18n.feedback.or}</Text>
        <Button openType='feedback'>{i18n.feedback.feedback}</Button>
        <Text className='or'>{i18n.feedback.or}</Text>
        <Button type='warn' onClick={() => {
            Tip.showModal(i18n.modalDefaultTitle, i18n.clearStorage).then(res => {
                if (res.confirm ) {
                    Taro.clearStorage().then(() => {
                        Taro.reLaunch({url: Route.path.tabbarIndex})
                    })
                }
            })}
        }
        >{i18n.feedback.clear}</Button>
      </View>
    <Text className='footer'>{i18n.appName}</Text>
    </View>
  );
};

export default Feedback
