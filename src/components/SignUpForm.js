/**
 * Created by Malakhov_Ivan on 19.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import {SEND_USER_DATA_ERR, SIGNUP_USER_SUCCESS} from '../constants/Page'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import {signupUserSuccess} from '../actions/HomeActios.js'
import Home from './Home'
import $ from "jquery";
import checkToken from '../Utils/TokinHendlers'


//component configuration
function mapStateToProps (state) {
    return {
      signUpReduser: state.signUpReduser, // (1)
      home: state.home // (1)
    }
}//mapStateToProps
function mapDispatchToProps(dispatch) {
  return {
    inputErrorMsg: bindActionCreators(inputErrorMsg, dispatch),
    signupUserSuccess: bindActionCreators(signupUserSuccess, dispatch)
  }
}
export function inputErrorMsg(errMsg){
    return (dispatch) => {
      dispatch({
        type: SEND_USER_DATA_ERR,
        payload: errMsg
      })}
}//sendUserForm



class SignUpForm extends Component {

  submitIT(e){
    var data = {
      FirstName:document.getElementById('iFirstName').value,
      LastName :document.getElementById('iLastName').value,
      Email    :document.getElementById('iEmail').value,
      Password :document.getElementById('iPassword').value
  };
   const {inputErrorMsg, signupUserSuccess} =  this.props;
    if (data.FirstName&& data.LastName && data.Email && data.Password){
      $.ajax({
        method:'POST',
        url:'http://127.0.0.1:9000/users/addUsername',
        dataType: 'json',
        cache: false,
        header:{'Access-Control-Allow-Origin': '*'},
        data:data,
        crossDomain: true
      }).success(function(result){
        inputErrorMsg('');
        signupUserSuccess('User created successfully. Sign in please.');
        return browserHistory.push("/");
        //console.log('____1___', result);

      }).error(function(err){
        //console.log('____2___', err);
       inputErrorMsg(err.responseText);
      });/*
         .catch(function(err){
         console.log('__3__', err);
      });//ajax
       // .success(
       //(dispatch) => {
       // dispatch({
       //   type: SEND_USER_DATA,
       //   payload: false
       // })}
       // )*/
    }
    else{
      let elementName=[];
      if(!data.FirstName)elementName.push('FirstName');
      if(!data.LastName)elementName.push('LastName');
      if(!data.Email)elementName.push('Email');
      if(!data.Password)elementName.push('Password');
      let errMsg='required - '+elementName.join(', ')
      inputErrorMsg(errMsg);
        }
    }// submitIT

  render() {
      const {errMsg}= this.props.signUpReduser;
    if(checkToken()){ return <div>{browserHistory.push("/")}</div>;}
    return (<div className='col-md-8 col-sm-7'>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">First name:</span>
            <input placeholder="First name" id='iFirstName' type="text" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Last name:</span>
            <input placeholder="Last name" id='iLastName' type="text" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Email:</span>
            <input placeholder="email" id='iEmail' type="email" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Password:</span>
            <input placeholder="Password" id='iPassword' type="password" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-12">
          <div>
            <button type="submit"  className='btn btn-primary' onClick={::this.submitIT}>Submit</button>
            <span className='error-msg'>{errMsg}</span>
          </div>
        </div>
      </div>
    </div>)
  }//render
}//SignUpForm

 export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm)