/**
 * Created by Malakhov_Ivan on 19.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import {SEND_USER_DATA} from '../constants/Page'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function mapStateToProps (state) {
    return {
        currentState: state.signUpReduser // (1)
    }
}//mapStateToProps
/**/
export function sendUserForm(){
      return (dispatch) => {
        dispatch({
        type: SEND_USER_DATA,
        payload: true
    })}/**/
}//sendUserForm
function mapDispatchToProps(dispatch) {
    return {
        sendUserForm: bindActionCreators(sendUserForm, dispatch)
    }
}


class SignUpForm extends Component {

    submitIT(e){
        console.log(document.getElementById('iEmail').value);
        this.props.sendUserForm();
    }// submitIT
  render() {
      const {loading}= this.props.currentState;
      console.log(this.props);
      console.log(loading);
    return (<div className='ib page'>
      Здесь очень страница регестрации!!
        <input placeholder="Mail" id='iEmail' type="text" className="form-control"  />
          {' '}
        <button type="submit"  className='btn' onClick={::this.submitIT}>Submit(На сервер!!!)</button>
      {loading ? <p> Загрузка... </p>
       :
       <p> Успешнинько </p>
       }
    </div>)
  }//render
}//SignUpForm

 export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm)