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
      curPage=(<div className='col-md-4 col-sm-5 user'>
        <p className='main-name'>SignIn or SignUp please.</p>
      </div>)}
    else
    {curPage=(<div className='col-md-4 col-sm-5 user'>
      <UserTab />
    </div>)}
    return curPage;
  }
}
