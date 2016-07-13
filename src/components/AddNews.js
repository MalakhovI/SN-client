/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
import { connect } from 'react-redux'
var request = require("superagent");
import Page from './Page'
import DropzoneMy from './AddNewsDropzone.js'
import { browserHistory } from 'react-router'
import * as actionCreators from '../actions/PageActions'
import { getNews } from  '../actions/PageActions'
import { bindActionCreators } from 'redux'

function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions:bindActionCreators(actionCreators,dispatch)
  }
}
function clearTextFild() {
  document.getElementById('iTitle').value='';
  document.getElementById('iText').value='';
}

class AddNews extends Component {
  SendNewsBtn(){
    let Title = document.getElementById('iTitle').value;
    let Text = document.getElementById('iText').value;

    const { haveFile,currentDropzone} = this.props.myNews;
    const {getNews, setError, sendNews} = this.props.actions;
    if (!Title && !Text && !haveFile)
    {setError('Enter title or text or picture');}
    else{
      if (haveFile) {
        sendNews( Title, Text); // Title, Text to store
        currentDropzone.processQueue(); // send img -> and news
        clearTextFild();
        setError('');
      }
      else{
        var data ={
          title: Title,
          text: Text,
          userId: Cookies.get('userId'),
          link:''
        };
        actionCreators.sendNewsToSrv(data,getNews,setError);
        clearTextFild();
        setError('');
      }/**/
    }
}
  componentDidMount (){
  }
  render() {

    const {errMsg} = this.props.myNews
    return <div className='news-create'>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div className='user-block'>
            <span id="basic-addon1">Title:</span>
            <input placeholder="Title" id='iTitle' type="text" className="input-line form-control" />
          </div>
          <div className='user-block'>
            <span id="basic-addon2">Text:</span>
            <textarea placeholder="Enter text here" id='iText' className="form-control area-text" ></textarea>
          </div>
        </div>
        <div className="col-lg-6">
          <div className='user-block'>
            <span id="basic-addon3">Add picture:</span>
            <DropzoneMy />
          </div>
        </div>
        {errMsg?<span className='error-msg'>{errMsg}</span>:null}
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <button className='btn btn-primary user-btn' onClick={::this.SendNewsBtn}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddNews)