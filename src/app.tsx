import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Store from './store'

import './app.scss'
import { switchLanguage } from './i18n'
import { User } from './services/user'
import { SETTING } from './services/constant'
import { Util } from './utils'

class App extends Component {

  componentWillMount() {
    switchLanguage(User.getSetting(SETTING.LANGUAGE))
    User.setTabbar()

    Util.checkForUpdate()
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return (
      <Provider store={Store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
