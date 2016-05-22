/**
 * Created by Ivan on 22.05.2016.
 */
import  Cookies from "cookies-js"
import React, { PropTypes, Component } from 'react'
import Page from '../components/Page'
import Home from '../components/Home'

class IndexPage extends Component {
  render() {
    ///var flag = true;
  if(!Cookies.get('token')){ return <Home />}
  else{return <Page />}
  }
} //Component

export default IndexPage;
