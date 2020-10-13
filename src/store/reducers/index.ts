import { combineReducers } from 'redux'

import edu from './edu'
import card from './card'
import library from './library'
import common from "./common"
import user from "./user"

export default combineReducers({
  edu,
  card,
  library,
  common,
  user
})