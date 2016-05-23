/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import  React, { PropTypes, Component } from 'react'
import  UserTab from './UserTab'
import checkToken from '../Utils/TokinHendlers'

export default class User extends Component {
  render() {
    let curPage;

   if (!checkToken()){
      curPage=(<div className='ib user'><p>SignIn or SignUp please.</p></div>)}
    else
    {curPage=(<div className='ib user'>
      <UserTab />
    </div>)}
    return curPage;
  }
}
