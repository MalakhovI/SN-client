import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import { browserHistory } from 'react-router'
import EditProfileForm from './EditProfileForm'

export default class UserTab extends Component {
  onLogOutBtnClick(){
    if(Cookies.get('token'))
    {document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};
    if(Cookies.get('userId'))
    {document.cookie = 'userId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};
    if(Cookies.get('lastName'))
    {document.cookie = 'lastName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};
    if(Cookies.get('firstName'))
    {document.cookie = 'firstName' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';};
    browserHistory.push('/');
  } //onLogOutBtnClick
  onEditProfileBtnClick(){
    browserHistory.push('/EditProfileForm');
  }

  render(){
    var userName = Cookies.get('firstName') +' '+ Cookies.get('lastName');
    return <div className='UserTab'>
      <div className='userName main-name'>Hi, {userName}!</div>
      <div className='user-block'>
        <button className='btn btn-primary user-btn' onClick={::this.onLogOutBtnClick}>LogOut</button>
      </div>
      <div className='user-block'>
        <button className='btn btn-success user-btn' onClick={::this.onEditProfileBtnClick}>Edit Profile</button>
      </div>
      <div className='user-block'>
        <button className='btn btn-info user-btn'>Friends</button>
      </div>
    </div>
  }// render
} // UserTab