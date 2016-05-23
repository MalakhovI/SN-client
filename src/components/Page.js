/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import AddNews from './AddNews'
import MyNews from  './MyNews'
import { browserHistory } from 'react-router'
import checkToken from '../Utils/TokinHendlers'

export default class Page extends Component {

  render() {

    if(!checkToken()){ return <div>{browserHistory.push("/Home")}</div>;}
    else{return (<div className='col-md-8 col-sm-7'>
        <AddNews />{' '}
        <br />
        <MyNews />
        </div>)}
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


