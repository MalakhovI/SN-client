/**
 * Created by Ivan on 21.05.2016.
 */
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import {SIGIN_SUCCESS} from '../constants/Page'
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import SignUpForm from './SignUpForm'
import Page from './Page'
import * as HomeActios from '../actions/HomeActios'

import $ from "jquery";
//component configuration
function mapStateToProps (state) {
  return {
    home: state.home // (1)
  }
}//mapStateToProps

function mapDispatchToProps(dispatch) {
  return {
    HomeActios: bindActionCreators(HomeActios, dispatch)
  }
}


class Home extends Component {

  onSignInBtnClick() {
    var data = {
      email:document.getElementById('iEmail').value,
      password :document.getElementById('iPassword').value
    };
    const {LoginError} = this.props.HomeActios;
    $.ajax({
      method:'POST',
      url:'http://127.0.0.1:9000/users/sigIn',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
      data:data,
      crossDomain: true
    }).success(function(result){
      console.log('____1___', result);
      //siginSuccess(result.token);
      if(result.err){
        LoginError(result.err);
        }
      else{
        if (result.token){
          Cookies.set('token',result.token);
          Cookies.set('userId',result.userId);
          return browserHistory.push("/Page");}
        else{LoginError('Incorrect token format');}
      }

    }).error(function(err){
      console.log('err__',err.responseText);
      LoginError(err.responseText);
    })
  }//onSignInBtnClick

    onSignUpBtnClick(e) {
    return browserHistory.push("/SignUpForm");
  }
  myProtect(e) {
    /*if(Cookies.get('token')){console.log('ЕСТЬ КУКА')}
    else{console.log('Абарегены сьели КУКА')}*/
    $.ajax({
      method:'POST',
      url:'http://127.0.0.1:9000/users/removeAll',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
        //'Authorization' :'Bearer ' +user.token},
      data:'dsadasda',
      beforeSend: function(xhr, settings) {
        console.log()
        xhr.setRequestHeader('Authorization','Bearer ' +  Cookies.get('token'));
      },
      crossDomain: true
    }).success(function(result){
      console.log('____1___', result);


        //siginSuccess(result.token);


    }).error(function(err){
      console.log('____2___', err);
    })
  }//onSignInBtnClick

  render() {
    const {errMsg}= this.props.home;
    console.log('____2___', this.props);
    return (<div>
      <p>

        <input placeholder="Email" id='iEmail' type="email" className="form-control" />
        <br />{' '}
        <input placeholder="Password" id='iPassword' type="password" className="form-control"  />
        <br />{' '}
        <button className='btn' onClick={::this.onSignInBtnClick}>SigIn(вход)</button>
        <span>{errMsg}</span>
        <br />{' '}
        <button className='btn' onClick={::this.onSignUpBtnClick}>SignUp(регистрация)</button>
            {' '}

        <button className='btn' onClick={::this.myProtect}>Protected</button>
        <br />{' '}
            {/*<button className='btn' onClick={this.onYearBtnClick.bind(this)}>SignUp(регистрация)</button>*/}
      </p>
      <h3> приветсвенное слово</h3>
          {/*fetching ? <p> Загрузка... </p>
           :
           <p> У тебя { photos } фото. </p>
           */}</div>)
  }//render
}//Home
export default connect(mapStateToProps,mapDispatchToProps)(Home)
