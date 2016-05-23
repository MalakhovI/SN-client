/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import Page from '../components/Page'
import Home from '../components/Home'
import checkToken from '../Utils/TokinHendlers'
class IndexPage extends Component {
  render() {
  if(!checkToken()){ return <Home />}
    else{return <Page />}
  }
} //Component

export default IndexPage;
