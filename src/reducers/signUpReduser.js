import {SEND_USER_DATA} from '../constants/Page'
const initialState = {
    loading: false
}

export default function signUpReduser(state = initialState,action) {
    switch (action.type) {
    case SEND_USER_DATA:
        return { ...state, loading: action.payload }

    default:
    return state;
} // switch
} // signUpReduser