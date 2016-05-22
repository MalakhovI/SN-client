/**
 * Created by Malakhov_Ivan on 19.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import {SEND_USER_DATA} from '../constants/Page'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from "jquery";

//component configuration
function mapStateToProps (state) {
    return {
        currentState: state.signUpReduser // (1)
    }
}//mapStateToProps
function mapDispatchToProps(dispatch) {
  return {
    sendUserForm: bindActionCreators(sendUserForm, dispatch)
  }
}

function sendUserForm(){
      return (dispatch) => {
        dispatch({
        type: SEND_USER_DATA,
        payload: true
    })}


}//sendUserForm


class SignUpForm extends Component {

  submitIT(e){
    var data = {
      FirstName:document.getElementById('iFirstName').value,
      LastName :document.getElementById('iLastName').value,
      Email    :document.getElementById('iEmail').value,
      Password :document.getElementById('iPassword').value
  }
    if (data.FirstName&& data.LastName && data.Email && data.Password){

      this.props.sendUserForm();
      $.ajax({
        method:'POST',
        url:'http://127.0.0.1:9000/users/addUsername',
        dataType: 'json',
        cache: false,
        header:{'Access-Control-Allow-Origin': '*'},
        data:data,
        crossDomain: true
      }).success(function(result){
        console.log('____1___', result);
      }).error(function(err){
        console.log('____2___', err);
      })
      //  .catch(function(err){
      //  console.log('^^^^^^^^^^^', err);
      //});
       // .success(
       //(dispatch) => {
       // dispatch({
       //   type: SEND_USER_DATA,
       //   payload: false
       // })}
       // )//ajax
    }
console.log('data',data);



    }// submitIT
  render() {
      const {loading}= this.props.currentState;

    return (<div className='ib page'>
      <label name="iFirstName">First name:</label>
      <input placeholder="First name" id='iFirstName' type="text" className="form-control"/>
      <br />

      <label name="iLastName">Last name:</label>
      <input placeholder="Last name" id='iLastName' type="text" className="form-control"/>
      <br />

      <label name="iEmail">Email:</label>
      <input placeholder="email" id='iEmail' type="email" className="form-control"/>
      <br />
      <label name="iPassword">Password:</label>
      <input placeholder="Password" id='iPassword' type="password" className="form-control"/>
      <br />

      <br />
        <button type="submit"  className='btn' onClick={::this.submitIT}>Submit(На сервер!!!)</button>
      {loading ? <p> Загрузка... </p>
       :
       <p> Успешнинько </p>
       }
    </div>)
  }//render
}//SignUpForm

 export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm)