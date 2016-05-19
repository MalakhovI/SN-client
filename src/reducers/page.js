import {
  SIGNIN_USER,
  SIGNUP_USER
} from '../constants/Page'
const initialState = {
/*  year: 2016,
  photos: [],
  fetching: false,*/
  currentPage: '',
  iUsername:'',
  iPassword:''
}

export default function page(state = initialState, action) {
  switch (action.type) {
/* пример написания патом снести
    case GET_PHOTOS_REQUEST:
      return { ...state, year: action.payload, fetching: true }

    case GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.payload, fetching: false }
*/
    case SIGNIN_USER:
      return { ...state, currentPage: action.payload }
    case SIGNUP_USER:
      return { ...state, currentPage: action.payload }
    default:
      return state;
  }

}