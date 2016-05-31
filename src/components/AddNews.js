/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
import { connect } from 'react-redux'
var request = require("superagent");
import Page from './Page'
import { browserHistory } from 'react-router'
import { getNews } from  '../actions/PageActions'
//------------Dropzone -------------------------
var DropzoneComponent = require('react-dropzone-component');
var ReactDOMServer = require('react-dom/server');

/**
 * Simple callbacks work too, of course.
 */
var simpleCallBack = function() {
  console.log('I\'m a simple callback');
};

/**
 * Attach event handlers here to be notified
 * for pretty much any event.
 * Arrays are accepted.
 */


var myDropzone;
var myDropz;
var flag=false;
function initCallback (dropzone) {
  myDropzone = dropzone;
  console.log('dropzonep --*** ',this.getAcceptedFiles());
  myDropz=this;

}
var eventHandlers = {
  // All of these receive the event as first parameter:
  drop: null,
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: null,
  removedfile: null,
  thumbnail: initCallback,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: null,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,
  // Special Events
  totaluploadprogress: null,
  reset: null,
  queuecompleted: null
}

/*
var djsConfig = (

  <div className="dz-preview dz-file-preview">
    <div className="dz-details">
      <div className="dz-filename"><span data-dz-name="true"></span></div>
      <img data-dz-thumbnail="true"/>
    </div>
    <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
    <div className="dz-success-mark"><span>✔</span></div>
    <div className="dz-error-mark"><span>✘</span></div>
    <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
  </div>
)
*/
//-----------------LAST------------------
export const fields = ['files',];
//-----------------LAST------------------

var djsConfig = {
  addRemoveLinks: true,
  autoProcessQueue: false,
  maxFilesize : 3,
  parallelUploads : 4,
  uploadMultiple : true,
  params: {
    myParameter: "I'm a parameter!"
  }
};
function qqz(arrr){
  console.log('from my hendler!');
}

var callbackArray = [
  function() {
    console.log('Look Ma, I\'m a callback in an array! -- -', arguments);
  },
  function() {
    console.log('Wooooow!');
  }
];


var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: 'http://127.0.0.1:9000/news/createFile'
};
var ChoosedFile;
var haveFile=false;
var DropzoneDemo = React.createClass({
//<DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
  onDrop: function (files) {
    console.log('onDrop/this---', this);
  },

  render() {

    return (
      <DropzoneComponent
        action={qqz}
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig} />
    )}
})
/*
var DropzoneDemo = React.createClass({
  onDrop: function (files) {
    console.log('Received files: ', files);
    ChoosedFile = files[0];
    console.log('ChoosedFile--', ChoosedFile);
    haveFile =true;
  },

  render: function () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} id='iDrop'>
          <div className='drop-box-text'> Dropping files her, or click to select files.</div>
          {console.log('haveFile', haveFile)}
          {haveFile?<img src={ChoosedFile.preview}/>: null }
        </Dropzone>
      </div>
    );
  }
});
 */
//------------Dropzone -------------------------




function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getNews: () => getNews(dispatch)
  }
}


class AddNews extends Component {
  SendNews(){
    console.log('$myDropzone$$$$$$-- ', myDropz);
    myDropz.processQueue();
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
  }
  componentDidMount () {
    haveFile = false;
*/
  }
  render() {

    //const { name } = this.props
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
            <DropzoneDemo />
          </div>
        </div>
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <button className='btn btn-primary user-btn' onClick={::this.SendNews}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddNews)