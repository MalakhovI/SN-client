/**
 * Created by Ivan on 21.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import SignUpForm from './SignUpForm'
export default class mainTEMP extends Component {
    onSignInBtnClick(e) {

        //this.props.getPhotos(+e.target.textContent)

    }

    onSignUpBtnClick(e) {
        return browserHistory.push("/SignUpForm");
    }

    render() {
        return (<div>
            <p>
                <button className='btn' onClick={this.onSignInBtnClick.bind(this)}>SigIn(вход)</button>
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
    }//render
}//mainTEMP