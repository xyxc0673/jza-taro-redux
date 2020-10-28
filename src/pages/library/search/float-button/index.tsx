import React from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Text } from '@tarojs/components'

import './index.scss'

interface IProps {
  onClick: () => any
}

class FloatButton extends Component <IProps, {} > {
  static defaultProps = {
    onClick: (any) => any,
  }

  state = {
  }

  handleClick () {
    this.props.onClick && this.props.onClick()
  }

  render () {
    return (
      <View className='float-button' onClick={this.handleClick}>
        <Icon type='search' size='24' />
      </View>
    )
  }
}

export default FloatButton