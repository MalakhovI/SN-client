import {SEND_USER_DATA_ERR} from '../constants/Page'
const initialState = {
    errMsg: ''
}

export default function signUpReduser(state = initialState,action) {
    switch (action.type) {
    case SEND_USER_DATA_ERR:
        return { ...state, errMsg: action.payload }

    default:
    return state;
} // switch
} // signUpReduser