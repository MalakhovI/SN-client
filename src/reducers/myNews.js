/**
 * Created by Ivan on 23.05.2016.
 */
import {GET_NEWS_SUCCESS} from '../constants/Page'


const initialState = {
  News:[]
}

export default function myNews(state = initialState,action) {
  switch (action.type) {
  case GET_NEWS_SUCCESS:
    return {...state, News : action.payload }
  default:
    return state;
  }
}
