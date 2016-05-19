import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'

function mapStateToProps (state) {
  return {
    user: state.user, // (1)
    page: state.page // (2)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}
class App extends Component {
  render() {
    const { user, page}= this.props;
    const { signIn, signUp, authorizationCall } = this.props.pageActions;
    return <div className='row'>
      <Page
            signIn={signIn}
            signUp={signUp}
            authorizationCall={authorizationCall}
            iUsername={page.iUsername}
            currentPage={page.currentPage}/>
      <User name={user.name} />
    </div>
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
