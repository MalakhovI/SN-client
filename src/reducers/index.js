import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import home from './home'
import myNews from './myNews'
import signUpReduser from './signUpReduser'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  page,
  user,
  signUpReduser,
  home,
  myNews,
    routing: routerReducer
})