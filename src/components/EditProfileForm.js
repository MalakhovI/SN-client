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
import { browserHistory } from 'react-router'

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
      console.log('******',result);
      inputErrorMsg('');
      if(Cookies.get('lastName'))
      {document.cookie = 'lastName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};
      Cookies.set('lastName',result.lastName, { expires: 7365 });
      if(Cookies.get('firstName'))
      {document.cookie = 'firstName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};

      Cookies.set('firstName',result.firstName, { expires: 7365 });
      browserHistory.push('/');

    }).error(function(err){
      inputErrorMsg(err.responseText);
    });
  }     else{
    let elementName=[];
    if(!data.FirstName)elementName.push('FirstName');
    if(!data.LastName)elementName.push('LastName');
    if(!data.OldPassword)elementName.push('OldPassword');
    if(!data.NewPassword)elementName.push('NewPassword');
    let errMsg='required - '+elementName.join(', ');
    inputErrorMsg(errMsg);
  }
}

  constructor (props) {
    super(props);
    const {inputErrorMsg} =  this.props;
    inputErrorMsg('');
    }//constructor/
  render(){
    const {errMsg}= this.props.signUpReduser;
    return(<div className="col-md-8 col-sm-7">
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">First name(Current - {Cookies.get('firstName')}):</span>
            <input placeholder="New first name" id='iFirstName' type="text" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Last name(Current - {Cookies.get('lastName')}):</span>
            <input placeholder="New last name" id='iLastName' type="text" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Enter old Password:</span>
            <input placeholder="Enter old Password" id='iOldPassword' type="password" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <span id="basic-addon1">Enter new Password:</span>
            <input placeholder="Enter new Password" id='iNewPassword' type="password" className="input-line form-control"/>
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-12">
          <div>
            <button className='btn btn-primary' onClick={::this.sendReq}>Update</button>
            <span className='error-msg'>{errMsg}</span>
          </div>
        </div>
      </div>
    <br />
  </div>)
  }//render
}//EditProfileForm

export default connect(mapStateToProps,mapDispatchToProps)(EditProfileForm)