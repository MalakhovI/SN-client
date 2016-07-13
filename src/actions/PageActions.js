/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import {
  GET_NEWS_SUCCESS,
  GET_NEWS_REQUEST,
  SEND_NEWS,
  EDIT_NEWS
  } from  '../constants/Page'
import  Cookies from "cookies-js"
import $ from "jquery";

export function  setError(errMsg)
{return {type:'DROPZONE_SET_ERROR', payload:errMsg};};


export function  sendNews(Title,Text)
{return {type:'SEND_NEWS', newsTitle:Title, newsText:Text};};

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

export function sendNewsToSrv(data,
                              sucsessFunc=()=>console.log('Здесь должна быть функция !!'),
                              errFunc=()=>console.log('Здесь должна быть функция !!')){
  /**/ $.post({
    method: 'POST',
    url: 'http://127.0.0.1:9000/news/createNews',
    dataType: 'json',
    cache: false,
    header: {'Access-Control-Allow-Origin': '*'},
    data: data,
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));
    },
    crossDomain: true
  }).success(function (result) {
    sucsessFunc();
  }).error(function (err) {
    console.log('___________КАКАЯ---ТО ОШИБКО______________',err);
    errFunc('Could not load file to the server, please try again later.');

  })/**/
} //sendNewsToSrv

export function editMyNews(indexInNews,idNews){

  return {type: 'EDIT_NEWS', indexNewsEdit: indexInNews, idNewsEdit:idNews};
}
