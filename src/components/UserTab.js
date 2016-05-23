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
    //const { name } = this.props
    var userName = Cookies.get('firstName') +' '+ Cookies.get('lastName');
    return <div className='UserTab'>
      <div className='userName'>{userName}</div>
      <br />{' '}
      <button className='btn' onClick={::this.onLogOutBtnClick}>LogOut</button>
      <br />{' '}
      <button className='btn' onClick={::this.onEditProfileBtnClick}>Edit Profile</button>
    </div>
  }// render
} // UserTab