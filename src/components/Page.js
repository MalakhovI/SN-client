/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import SignUpForm from '../components/SignUpForm'
var usName='';
export default class Page extends Component {
  onSignInBtnClick(e) {
    this.props.signIn();
    //this.props.getPhotos(+e.target.textContent)
  }

  onSignUpBtnClick(e) {
    this.props.signUp();
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
    const { currentPage} = this.props;
    switch (currentPage) {
      case 'userPage':
        return <div> здесь будет страница SignIn{' '}
          <input placeholder="Login"    type="text" className="form-control" onBlur={::this.saveText} />
          {' '}
          <input placeholder="Password" type="password" className="form-control"  />
          {' '}
          <button type="submit" className='btn' onClick={::this.submitIT}>Submit(На сервер!!!)</button>
        </div>
      case 'signupForm':
        return <SignUpForm />
      default:
        //const { year, photos, fetching } = this.props;
        return <div>
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
           */}</div>
    } // switch
  }//pageSelection

  render() {

    return <div className='ib page'>
      {this.pageSelection()}
    </div>
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


