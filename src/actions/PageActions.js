/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import $ from "jquery";
import {
  SIGNIN_USER,
  SIGNUP_USER,
  SIGNIN_USER_REQ
} from '../constants/Page'
export function signIn(){
  return {
    type: SIGNIN_USER,
    payload: 'userPage'
  }
}

export function signUp(){
  return {
    type: SIGNUP_USER,
    payload: 'signupForm'
  }
}
export function authorizationCall(){
  return {
      type: SIGNIN_USER_REQ,
      payload: 'qqq'
  }
}
/*
export function getPhotos(year) {

  return (dispatch) => {
      dispatch({
        type: GET_PHOTOS_REQUEST,
        payload: year
      })
/*
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:9000/users/addUsername',
            dataType: 'json',
            cache: false,
            header:{'Access-Control-Allow-Origin': '*'},
            data:{name :'bla bla bla',lastname:'sisechik'},
            crossDomain: true,
            success: function(data) {
// show text reply as-is (debug)
                console.log('____1___', data);
                return () => {
                    dispatch({
                        type: GET_PHOTOS_SUCCESS,
                        payload: data
                    })
                }

// show xml field values (debug)
//alert( $(data).find("title").text() );

// loop JSON array (debug)
//var str="";
//$.each(data.items, function(i,item) {
// str += item.title + "\n";
//});
//alert(str);
            },
            error: function(jqXHR, textStatus, ex) {
                console.log('____2___', textStatus + "," + ex + "," + jqXHR.responseText);
            }
        });

*/


/*
    setTimeout(() => {
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: [1,2,3,4,5]
      })
    }, 1000)
  } // return
}//getPhotos*/

