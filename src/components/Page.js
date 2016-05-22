/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import AddNews from './AddNews'
import MyNews from  './MyNews'

/*import SignUpForm from '../components/SignUpForm'
import App from '../containers/App'
import history from '../index'
import { Router, Route } from 'react-router'
import { push } from 'react-router-redux'*/
//-----------------------
/*import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
const history = syncHistoryWithStore(browserHistory, store);*/




export default class Page extends Component {

  render() {

     return(<div className='new-block'>
        <AddNews />
        <MyNews />
        </div>)
  }//render
}//Page

Page.propTypes = {
  /*
   year: PropTypes.number.isRequired,
   photos: PropTypes.array.isRequired,
   getPhotos: PropTypes.func.isRequired,
   fetching: PropTypes.bool.isRequired
   */
};


