/**
 * Created by Malakhov_Ivan on 23.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import {SEND_USER_DATA_ERR} from '../constants/Page'
import  Cookies from "cookies-js"
import $ from "jquery";
import {inputErrorMsg} from '../components/SignUpForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//component configuration
function mapStateToProps (state) {
  return {
    signUpReduser: state.signUpReduser, // (1)
  }
}//mapStateToProps
function mapDispatchToProps(dispatch) {
  return {
    inputErrorMsg: bindActionCreators(inputErrorMsg, dispatch),
  }
}

class EditProfileForm extends Component {
sendReq(){
  const {inputErrorMsg} =  this.props;

  var data= {
    UserId: Cookies.get('userId'),
    FirstName:document.getElementById('iFirstName').value,
    LastName :document.getElementById('iLastName').value,
    OldPassword :document.getElementById('iOldPassword').value,
    NewPassword :document.getElementById('iNewPassword').value
  }; //data

  if (data.FirstName&& data.LastName && data.OldPassword&& data.NewPassword){
    $.ajax({
      method:'PUT',
      url:'http://127.0.0.1:9000/users/updateUserProf',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
      data:data,
      crossDomain: true
    }).success(function(result){
      inputErrorMsg('');
      //signupUserSuccess('User created successfully. Sign in please.');
      //return browserHistory.push("/");
      console.log('____1___', result);

    }).error(function(err){
      console.log('____2___', err);
      inputErrorMsg(err.responseText);
    });
  }     else{
    let elementName=[];
    if(!data.FirstName)elementName.push('FirstName');
    if(!data.LastName)elementName.push('LastName');
    if(!data.OldPassword)elementName.push('OldPassword');
    if(!data.NewPassword)elementName.push('NewPassword');
    let errMsg='required - '+elementName.join(', ')
    inputErrorMsg(errMsg);
  }
}

/*
  constructor (props) {
    super(props);
    var data = {userId: Cookies.get('userId')};
    $.ajax({
      method:'GET',
      url:'http://127.0.0.1:9000/users/getUserProf',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
      data: data,
      crossDomain: true
    }).success(function(result){

      console.log('__Suc__', result);

    }).error(function(err){
      console.log('__Err__', err);
    })
  }//constructor*/
  render(){
    const {errMsg}= this.props.signUpReduser;
    return(<div className="EditProfileForm">
    <label name="iFirstName">First name(Current - {Cookies.get('firstName')}):</label>
      <br />
    <input placeholder="New first name" id='iFirstName' type="text" className="form-control"/>
      <br />

    <label name="iLastName">Last name(Current - {Cookies.get('lastName')}):</label>
      <br />
    <input placeholder="New last name" id='iLastName' type="text" className="form-control"/>
      <br />
    <label name="iOldPassword">Enter old Password:</label>
      <br />
    <input placeholder="Enter old Password" id='iOldPassword' type="password" className="form-control"/>
      <br />
    <label name="iNewPassword">Enter new Password:</label>
      <br />
    <input placeholder="Enter new Password" id='iNewPassword' type="password" className="form-control"/>
      <br />

    <button className='btn' onClick={::this.sendReq}>Update</button>
      <span>{errMsg}</span>
    <br />
  </div>)
  }//render
}//EditProfileForm

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileForm)