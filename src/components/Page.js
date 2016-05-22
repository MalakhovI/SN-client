/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import mainTEMP from '../components/mainTEMP'
import App from '../containers/App'
import history from '../index'
var usName='';
import { Router, Route } from 'react-router'
import { push } from 'react-router-redux'
//-----------------------
/*import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
const history = syncHistoryWithStore(browserHistory, store);*/



export default class Page extends Component {


  onSignInBtnClick(e) {
    this.props.signIn();
    //this.props.getPhotos(+e.target.textContent)
  }

  onSignUpBtnClick(e) {
    this.props.signUp();
      push('/foo');
      console.log(history);
  }
/**/

  saveText (e){
    console.log('===', e.target.value)
    usName = e.target.value
    this.setState({ iUsername: e.target.value });
    console.log('=X=',this);
  }/**/
  submitIT(e){
    this.props.authorizationCall();
  }
  pageSelection() {
    const {currentPage} = this.props;
    var currentPageView;
    switch (currentPage) {
      case 'userPage':
          currentPageView=( <div> здесь будет страница SignIn{' '}
          <input placeholder="Login"    type="text" className="form-control" onBlur={::this.saveText} />
          {' '}
          <input placeholder="Password" type="password" className="form-control"  />
          {' '}
          <button type="submit" className='btn' onClick={::this.submitIT}>Submit(На сервер!!!)</button>
        </div>);break;
      case 'signupForm':
          currentPageView=(<div><Route path='/s' component={SignUpForm} /> </div>);break;
      default:
        //const { year, photos, fetching } = this.props;
         currentPageView = (<div>
          <p>
            <button className='btn' onClick={::this.onSignInBtnClick}>SigIn(вход)</button>
            {' '}
            <button className='btn' onClick={::this.onSignUpBtnClick}>SignUp(регистрация)</button>
            {' '}
            {/*<button className='btn' onClick={this.onYearBtnClick.bind(this)}>SignUp(регистрация)</button>*/}
          </p>
          <h3> приветсвенное слово</h3>
          {/*fetching ? <p> Загрузка... </p>
           :
           <p> У тебя { photos } фото. </p>
           */}</div>)

    } // switch
    return currentPageView

  }//pageSelection

  render() {


      return <Router history={history}>
          <Route path="/" component={mainTEMP} />
          <Route path="SignUpForm" component={SignUpForm} />
          </Router>;
    //return this.pageSelection()

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


