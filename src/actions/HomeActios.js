/**
 * Created by Ivan on 22.05.2016.
 */
import {
  LOGIN_ERR,
  SIGIN_SUCCESS
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