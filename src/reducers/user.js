import {SIGIN_SUCCESS} from '../constants/Page'


const initialState = {
  token:''
}

export default function user(state = initialState,action) {
  switch (action.type) {
    case SIGIN_SUCCESS:
      return {...state, token : action.payload };

  default:
  return state;
  }
}