/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import {
  GET_NEWS_SUCCESS,
  GET_NEWS_REQUEST
  } from  '../constants/Page'
import  Cookies from "cookies-js"
import $ from "jquery";

export function  setError(errMsg)
{return {type:'DROPZONE_SET_ERROR', payload:errMsg, errFlag:true};};

export function getNews() {
  let data = {userId: Cookies.get('userId')};
  return (dispatch) => {
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:9000/news/getNews',
      dataType: 'json',
      cache: false,
      header: {'Access-Control-Allow-Origin': '*'},
      data: data,
      crossDomain: true,
      error: function (error) {
        console.log('getNews-err-', error)

      }
    }).success(function (data) {
      return dispatch({type: 'GET_NEWS_SUCCESS', payload: data});
    })
  }
}


