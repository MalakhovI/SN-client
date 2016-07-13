/**
 * Created by Malakhov_Ivan on 01.06.2016.
 */
import React, { PropTypes, Component } from 'react'
var DropzoneComponent = require('react-dropzone-component');
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from "jquery";
import { getNews, sendNewsToSrv, setError } from  '../actions/PageActions'
import {
  DROPZONE_SET,
  DROPZONE_SET_ERROR,
  DROPZONE_SET_HAVE_FILE,
} from  '../constants/Page'

//------------Dropzone functions-------------------------
function removeFile(){
  if(this.files.length===0){this.options.params._setHaveFile(false);
  this.options.params._setCurentDropzone({});
  this.options.params._setError('');
  }

}
function successFileUpload(file,res){
  var data ={title: this.options.params._myNews.newsTitle,
    text:this.options.params._myNews.newsText,
    userId: Cookies.get('userId')
  };
  data.link = res.fileName;
  this.options.params._sendNewsToSrv(data,this.options.params._getNews); // update wall
  this.removeAllFiles();
}

function errorFileUpload(file,errMsg){
  this.options.params._setError(errMsg);
}

function addFile(file) {

  let errMsg = '';
  //check file type
  if ((file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')) {
    if (this.files.length === 1) {
      this.options.params._setHaveFile(true);
      this.options.params._setCurentDropzone(this);//for send
      errMsg='';
    } else if (this.files.length > 1) {
      //now dropbox work with 1 file
      this.removeFile(this.files[1]);
    }
  }
  else {
    errMsg = "You can use: png, jpg or gif.";

    if (this.files.length > 1) {
      //now dropbox work with 1 file
      this.removeFile(this.files[1]);
    }
    console.log('errMsg---', file.type);
  }

  this.options.params._setError(errMsg);
}
//------------Dropzone functions-------------------------

//------------Dropzone config----------------------------
  var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: addFile,
    removedfile: removeFile,
    thumbnail: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: successFileUpload,
    error: errorFileUpload,
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
    queuecompleted: null,
  };

  var djsConfig = {
    addRemoveLinks: true,
    autoProcessQueue: false,
    maxFilesize : 10, // 10mb
    parallelUploads : 1,
    uploadMultiple : false,
    maxFiles : 1/**/,
    dictMaxFilesExceeded:'You can add only one file',
    };
  var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    acceptedFiles: ['image/*'],
    showFiletypeIcon: true,
    postUrl: 'http://127.0.0.1:9000/news/createFile'
  };
//------------Dropzone config----------------------------

//-----actions for dropzone----------------------------
function setCurentDropzone(itm)
{return {type:'DROPZONE_SET', payload: itm};}

function  setHaveFile(haveFile)
{return {type:'DROPZONE_SET_HAVE_FILE', payload:haveFile};};
//-----actions for dropzone----------------------------

function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}
function mapDispatchToProps(dispatch) {
   return {
    setError:bindActionCreators(setError,dispatch),
    setHaveFile:bindActionCreators(setHaveFile,dispatch),
    setCurentDropzone:bindActionCreators(setCurentDropzone,dispatch),
    getNews:bindActionCreators(getNews,dispatch),
    sendNewsToSrv:bindActionCreators(sendNewsToSrv,dispatch)
  }
}
///////////////////////////////////////////////////////////////////////////////
class DropzoneMy extends Component {
  componentDidMount(){
   }
  render() {
    const {setError,setHaveFile,setCurentDropzone,myNews,getNews}=this.props;
    djsConfig.params={
      _setError:setError,
      _setHaveFile:setHaveFile,
      _setCurentDropzone:setCurentDropzone,
      _getNews:getNews,
      _myNews:myNews,
      _sendNewsToSrv:sendNewsToSrv
    };
    return (
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}/>
    )}
}
  export default connect(mapStateToProps,mapDispatchToProps)(DropzoneMy)
//------------Dropzone config-------------------------