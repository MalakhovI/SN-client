/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
import { connect } from 'react-redux'
var request = require("superagent");
var Dropzone = require('react-dropzone');
import Page from './Page'
import { browserHistory } from 'react-router'
import { getNews } from  '../actions/PageActions'
var ChoosedFile;
var haveFile=false;

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

var DropzoneDemo = React.createClass({
  onDrop: function (files) {
    console.log('Received files: ', files);
    ChoosedFile = files[0];
    haveFile =true;
  },

  render: function () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} id='iDrop'>
          <div className='drop-box-text'> Dropping files here, or click to select files.</div>
        </Dropzone>
      </div>
    );
  }
});

class AddNews extends Component {
  SendNews(){
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