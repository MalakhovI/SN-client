/**
 * Created by Ivan on 23.05.2016.
 */
import {GET_NEWS_SUCCESS,GET_NEWS_REQUEST} from '../constants/Page'


const initialState = {
  News:[]
}

export default function myNews(state = initialState,action) {
  switch (action.type) {
  case GET_NEWS_SUCCESS:
    return {...state, News : action.payload }
  case GET_NEWS_REQUEST:
    return {...state}
  default:

    return state;
  }
}
