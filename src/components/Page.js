/**
 * Created by Malakhov_Ivan on 13.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import SignUpForm from '../components/SignUpForm'
export default class Page extends Component {
  onSignInBtnClick(e) {
    this.props.signIn();
    //this.props.getPhotos(+e.target.textContent)
  }
  onSignUpBtnClick(e) {
    this.props.signUp();
  }
  pageSelection(act) {
    act = 'sss';
    const { currentPage} = this.props;
    console.log('__',this.props)
  switch (currentPage){
    case 'userPage':
      return <div> здесь будет страница SignIn</div>
    case 'signupForm':
      return <SignUpForm />
    default:
    const { year, photos, fetching } = this.props;
    return <div>
        <p>
          <button className='btn' onClick={::this.onSignInBtnClick}>SigIn(вход)</button>{' '}
          <button className='btn' onClick={::this.onSignUpBtnClick}>SignUp(регистрация)</button>{' '}
    {/*<button className='btn' onClick={this.onYearBtnClick.bind(this)}>SignUp(регистрация)</button>*/}
        </p>
        <h3> {year} приветсвенное слово</h3>
        {fetching ? <p> Загрузка... </p>
        :
        <p> У тебя { photos } фото. </p>
        }</div>
      } // switch
    }//pageSelection

  render() {

    return <div className='ib page'>
      {this.pageSelection()}
  </div>
  }//render
}//Page

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
};


