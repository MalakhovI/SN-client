import {
  SIGNIN_USER,
  SIGNUP_USER
} from '../constants/Page'
const initialState = {
  currentPage: '',
  iUsername:'',
  iPassword:''
}

export default function page(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, currentPage: action.payload }
    case SIGNUP_USER:
      return { ...state, currentPage: action.payload }
    default:
      return state;
  }

}