/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"

export default class User extends Component {
  render() {
    let curPage;

   if (!Cookies.get('token')){
      curPage=(<div className='ib user'><p>SignIn or SignUp please</p></div>)}
    else
    {curPage=(<div className='ib user'><p>Кнопка логаут и меню</p></div>)}

    return curPage;
  }
}
/*
User.propTypes = {
  name: PropTypes.string.isRequired
}*/