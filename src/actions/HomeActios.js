/**
 * Created by Ivan on 22.05.2016.
 */
import {
  LOGIN_ERR,
  SIGIN_SUCCESS,
  SIGNUP_USER_SUCCESS
  } from '../constants/Page'
export function LoginError(errMsg){
  return {
    type: LOGIN_ERR,
    payload: errMsg
  };
}

export function siginSuccess(token){
  return {
    type: SIGIN_SUCCESS,
    payload: token
  }
}
export function signupUserSuccess(Msg){
  return {
      type: SIGNUP_USER_SUCCESS,
      payload: Msg
  }
}