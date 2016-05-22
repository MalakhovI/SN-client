import {LOGIN_ERR} from '../constants/Page'


const initialState = {
  errMsg: ''
}

export default function home(state = initialState,action) {
  switch (action.type) {
    case LOGIN_ERR:
      return {...state, errMsg : action.payload };

  default:
  return state;
}
}