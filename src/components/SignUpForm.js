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
      if(!data.Email)elementName.push('FirstName');
      if(!data.Password)elementName.push('Password');
      let errMsg='required - '+elementName.join(', ')
      inputErrorMsg(errMsg);
        }
    }// submitIT

  render() {
      const {errMsg}= this.props.signUpReduser;

    return (<div className='ib page'>
      <label name="iFirstName">First name:</label>
      <input placeholder="First name" id='iFirstName' type="text" className="form-control"/>
      <br />

      <label name="iLastName">Last name:</label>
      <input placeholder="Last name" id='iLastName' type="text" className="form-control"/>
      <br />

      <label name="iEmail">Email:</label>
      <input placeholder="email" id='iEmail' type="email" className="form-control"/>
      <br />
      <label name="iPassword">Password:</label>
      <input placeholder="Password" id='iPassword' type="password" className="form-control"/>
      <br />

      <br />
        <button type="submit"  className='btn' onClick={::this.submitIT}>Submit</button>
        <span>{errMsg}</span>
    </div>)
  }//render
}//SignUpForm

 export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm)