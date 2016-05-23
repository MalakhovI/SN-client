/**
 * Created by Ivan on 21.05.2016.
 */
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import {SIGIN_SUCCESS} from '../constants/Page'
import React, { PropTypes, Component } from 'react'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import SignUpForm from './SignUpForm'
import Page from './Page'
import * as HomeActios from '../actions/HomeActios'
import checkToken from '../Utils/TokinHendlers'

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
    const {LoginError, signupUserSuccess} = this.props.HomeActios;
    signupUserSuccess('');
    $.ajax({
      method:'POST',
      url:'http://127.0.0.1:9000/users/sigIn',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
      data:data,
      crossDomain: true
    }).success(function(result){
      if(result.err){
        LoginError(result.err);
        }
      else{
        if (result.token){
          Cookies.set('token',result.token, { expires: 7365 });
          Cookies.set('userId',result.userId, { expires: 7365 });
          Cookies.set('lastName',result.lastName, { expires: 7365 });
          Cookies.set('firstName',result.firstName, { expires: 7365 });
          return browserHistory.push("/");}
        else{LoginError('Incorrect token format');}
      }

    }).error(function(err){

      LoginError(err.responseText);
    })
  }//onSignInBtnClick

    onSignUpBtnClick(e) {
    return browserHistory.push("/SignUpForm");
  }
  constructor (props) {

    super(props);
    const {LoginError} = this.props.HomeActios;
    LoginError('');
  }
    render() {
    const {errMsg,signUpMsg}= this.props.home;
    console.log('____2___', this.props);

      if(checkToken()){ return <div>{browserHistory.push("/")}</div>;}
    return (<div className='col-md-8 col-sm-7'>
      <div className='user-block row'>
        <div className='col-md-3 col-sm-4'>
          <input placeholder="Email" id='iEmail' type="email" className="form-control" />
        </div>
      </div>
      <div className='user-block row'>
        <div className='col-md-3 col-sm-4'>
          <input placeholder="Password" id='iPassword' type="password" className="form-control"  />
        </div>
      </div >
      <div className='user-block'>
        <button className='btn btn-primary login-btn' onClick={::this.onSignInBtnClick} type="submit">SigIn</button>
        <span className='error-msg'>{errMsg}</span>
      </div>
      <div className='user-block'>
        <button className='btn btn-primary login-btn' onClick={::this.onSignUpBtnClick}>SignUp</button>
        <span className='success-msg'>{signUpMsg}</span>
      </div>
       </div>)
  }//render
}//Home
export default connect(mapStateToProps,mapDispatchToProps)(Home)
