/**
 * Created by Malakhov_Ivan on 01.06.2016.
 */
import React, { PropTypes, Component } from 'react'
var DropzoneComponent = require('react-dropzone-component');
import { connect } from 'react-redux'
import { setError } from  '../actions/PageActions'
import { bindActionCreators } from 'redux'

import {
  DROPZONE_SET,
  DROPZONE_SET_ERROR,
  DROPZONE_SET_HAVE_FILE,
} from  '../constants/Page'

//------------Dropzone functions-------------------------
function dropFile() {
  console.log('dropFile/this--',this)
  if (this.files.length === 1) {
    this.options.params._setHaveFile(true);
    this.options.params._setCurentDropzone(this);//for send

  } else if (this.files.length > 1) {
    this.options.params._setError("You can add only one file");
    //now dropbox work with 1 file
    this.removeFile(this.files[1]);
  }
}
function removeFile(){
  if(this.files.length===0){this.options.params._setHaveFile(false);
  this.options.params._setCurentDropzone({});
  }
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
    addedfile: null,
    removedfile: removeFile,
    thumbnail: dropFile,
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
    queuecompleted: null,
  };

  var djsConfig = {
    addRemoveLinks: true,
    autoProcessQueue: false,
    maxFilesize : 5, // 5mb
    parallelUploads : 1,
    uploadMultiple : false,
    maxFiles : 1,
    dictMaxFilesExceeded:'You can add only one file'//,
  };
  var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'http://127.0.0.1:9000/news/createFile'
  };
//------------Dropzone config----------------------------



//-----Actions for dropzone----------------------------
function setCurentDropzone(itm)
{return {type:'DROPZONE_SET', payload: itm};}

function  setHaveFile(haveFile)
{return {type:'DROPZONE_SET_HAVE_FILE', payload:haveFile};};

//-----actions for dropzone----------------------------
///////////////////////////////////////////////////////////////////////////////
function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}
function mapDispatchToProps(dispatch) {
  return {
 //   my_funct: () => my_funct(dispatch)
    setError:bindActionCreators(setError,dispatch),
    setHaveFile:bindActionCreators(setHaveFile,dispatch),
    setCurentDropzone:bindActionCreators(setCurentDropzone,dispatch),
  }
}
///////////////////////////////////////////////////////////////////////////////
class Dropzone extends Component {
  componentDidMount(){
   }
  render() {
    const {setError,setHaveFile,setCurentDropzone}=this.props;
    djsConfig.params={
      _setError:setError,
      _setHaveFile:setHaveFile,
      _setCurentDropzone:setCurentDropzone,
    };
    return (
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig} />
    )}
}
  export default connect(mapStateToProps,mapDispatchToProps)(Dropzone)
//------------Dropzone config-------------------------