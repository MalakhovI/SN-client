/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
import { connect } from 'react-redux'
var request = require("superagent");
import Page from './Page'
import Dropzone from './AddNewsDropzone.js'
import { browserHistory } from 'react-router'
import * as actionCreators from '../actions/PageActions'
//import { getNews, } from  '../actions/PageActions'
import { bindActionCreators } from 'redux'

function sendNewsToSrv(data,
                       sucsessFunc=()=>console.log('Здесь должна быть функция !!'),
                       errFunc=()=>console.log('Здесь должна быть функция !!')){
   $.post({
   method: 'POST',
   url: 'http://127.0.0.1:9000/news/createNews',
   dataType: 'json',
   cache: false,
   header: {'Access-Control-Allow-Origin': '*'},
   data: data,
   beforeSend: function (xhr, settings) {
   xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));
   },
   crossDomain: true
   }).success(function (result) {
     sucsessFunc();
   }).error(function (err) {
   console.log('err__', err.responseText);
     errFunc();

   })
} //sendNewsToSrv

function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}
function mapDispatchToProps(dispatch) {
  return {
    //getNews: () => getNews(dispatch)
    actions:bindActionCreators(actionCreators,dispatch)
  }
}
function clearTextFild() {
  document.getElementById('iTitle').value='';
  text: document.getElementById('iText').value='';
}

class AddNews extends Component {
  SendNewsBtn(){
    var data ={title: document.getElementById('iTitle').value,
        text: document.getElementById('iText').value,
        userId: Cookies.get('userId')
    };
    const { haveFile,currentDropzone} = this.props.myNews//
    const {getNews, setError} = this.props.actions//

    if (haveFile) {
      currentDropzone.processQueue();
      currentDropzone.on("success", function(file,res) {
        data.link=res.fileName;
        currentDropzone.removeAllFiles();
        sendNewsToSrv(data,getNews);
        data={};
        clearTextFild();
        setError('');
      });
    }
    else{
      data.link='';
      sendNewsToSrv(data,getNews);
      clearTextFild();
      setError('');
      data={};

    }/**/

    /*
    var data ={title: document.getElementById('iTitle').value,
                text: document.getElementById('iText').value,
                userId: Cookies.get('userId')
      }
    const {getNews} =  this.props;
    if (haveFile) {

      request.post("http://127.0.0.1:9000/news/createFile")
        .attach("image-file", ChoosedFile, ChoosedFile.name)
        .then(function (result) {
          if (result.text) {
            data.link = JSON.parse(result.text).fileName;

            $.post({
              method: 'POST',
              url: 'http://127.0.0.1:9000/news/createNews',
              dataType: 'json',
              cache: false,
              header: {'Access-Control-Allow-Origin': '*'},
              data: data,
              beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));
              },
              crossDomain: true
            }).success(function (result) {
              getNews();
            }).error(function (err) {
              console.log('err__', err.responseText);
            })
          }
        });
    } //ChoosedFile
    else{
      data.link='';
      $.post({
        method: 'POST',
        url: 'http://127.0.0.1:9000/news/createNews',
        dataType: 'json',
        cache: false,
        header: {'Access-Control-Allow-Origin': '*'},
        data: data,
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('token'));
        },
        crossDomain: true
      }).success(function (result) {
        getNews();
      }).error(function (err) {
        console.log('err__', err.responseText);
        //LoginError(err.responseText);
      })
    }
  }/**/}
  componentDidMount (){
    //haveFile = false;
/**/
  }
  render() {

    const { errMsg} = this.props.myNews//
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
            <Dropzone />
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