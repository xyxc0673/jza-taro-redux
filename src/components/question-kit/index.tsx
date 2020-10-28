import React, { useState } from "react";
import Taro from "@tarojs/taro"
import { View, Image } from "@tarojs/components"

import CustomModal from "@/components/custom-modal"
import Panel from "@/components/panel"

import "./index.scss"

const QuestionKit = props => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View>
      <View className={`wrapper-class ${props.className}`}>
        <Image
          className='image-class'
          style={{
            width: `${props.size}px`,
            height: `${props.size}px`
          }}
          src={require("../../assets/images/question.svg")}
          onClick={() => setIsOpen(true)}
        />
      </View>
      <CustomModal
        title={props.modalTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View className='qa-list'>
          {props.qaList.map(item => {
            return (
              <View key={item.id}>
                <Panel title={item.q}>
                  <View className='answer'>{item.a}</View>
                </Panel>
              </View>
            )
          })}
        </View>
      </CustomModal>
    </View>
  )
}

QuestionKit.defaultProps = {
  size: "32",
  modalTitle: "",
  qaList: []
}

export default QuestionKit
