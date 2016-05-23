/**
 * Created by Malakhov_Ivan on 23.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import Home from './Home'
import { Link } from 'react-router'
export default class NoPage extends Component {
  render(){
    //const { name } = this.props
    return <div className='NoPage'>
      <br />{' '}
      We dose not have thi page
      <Link to="/" style={{color: 'blue'}} activeStyle={{color: 'red'}}>Back to main page</Link>

    </div>
  }// render
} // UserTab