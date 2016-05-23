import {LOGIN_ERR,
        SIGNUP_USER_SUCCESS} from '../constants/Page'


const initialState = {
  errMsg: '',
  signUpMsg:''
}

export default function home(state = initialState,action) {
  switch (action.type) {
    case LOGIN_ERR:
      return {...state, errMsg : action.payload };
    case SIGNUP_USER_SUCCESS:
      return {...state, signUpMsg : action.payload };
  default:
  return state;
}
}