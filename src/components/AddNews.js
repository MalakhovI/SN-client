/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
var request = require("superagent");
var Dropzone = require('react-dropzone');
import Page from './Page'
import { browserHistory } from 'react-router'
var ChoosedFile;

var DropzoneDemo = React.createClass({
  onDrop: function (files) {
    console.log('Received files: ', files);
    ChoosedFile = files[0];
  },

  render: function () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} id='iDrop'>
          <div className='drop-box-text'>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
});


//React.render(<DropzoneDemo />, document.body)
export default class AddNews extends Component {
  SendNews(){
    var data ={title: document.getElementById('iTitle').value,
                text: document.getElementById('iText').value,
                userId: Cookies.get('userId')
      }
    console.log('DATA__',data, ChoosedFile);
    request.post("http://127.0.0.1:9000/news/createFile")
      //.send(data)
      //.type('form')
      //.send(data)
      //.head({'Access-Control-Allow-Origin': '*'})
      //.head({'Authorization': 'Bearer ' + Cookies.get('token')})
      .attach("image-file", ChoosedFile, ChoosedFile.name)
      .then(function(result){
        console.log('###', result)
        if(result.text){
          data.link = JSON.parse(result.text).fileName;

          $.post({
           method:'POST',
           url:'http://127.0.0.1:9000/news/createNews',
           dataType: 'json',
           cache: false,
           header:{'Access-Control-Allow-Origin': '*'},
           data: data,
           beforeSend: function(xhr, settings) {
           xhr.setRequestHeader('Authorization','Bearer ' +  Cookies.get('token'));
           },
           crossDomain: true
           }).success(function(result){
           console.log('__dsds__1___', result);
            return browserHistory.push("/Home");
           }).error(function(err){
           console.log('err__',err.responseText);
           //LoginError(err.responseText);
           })
        }
      });

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