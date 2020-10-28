import React from "react";
import { View, Text, ITouchEvent, Image } from "@tarojs/components";
import i18n from "@/i18n";
import Card from "@/components/card";
import "./index.scss";

interface IProps {
  onClick?: (event: ITouchEvent<any>) => void;
}

const WelcomeCard: React.FC<IProps> = (props) => {

  return (
    <Card onClick={props.onClick}>
      <View className='guide-view'>
        <Image
          className='guide-img'
          src={require("../../../../assets/images/undraw_welcome.svg")}
        />
        <Text className='guide-text'>{i18n.guide}</Text>
      </View>
    </Card>
  );
};

export default WelcomeCard;
