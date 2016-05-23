/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import $ from "jquery";
export default class MyNews extends Component {
  constructor (props) {
    super(props);
/*
    let data = {userId: Cookies.get('userId')};
    $.getJSON('http://127.0.0.1:9000/news/getNews?userId=2', function(result){
      console.log('---',result);

      if(!result || !result.data || !result.data.length){
        return;
      }
    }).error(function(err){
      console.log('__///__', err)
    });
    //})/**/
    /*$.ajax({
      method:'GET',
      url:'http://127.0.0.1:9000/news/getNews',
      dataType: 'json',
      cache: false,
      header:{'Access-Control-Allow-Origin': '*'},
      data:data,
      crossDomain: true
    }).success(function(result){
      console.log('___1__', result);


    }).error(function(err){
      console.log('___2__', err);
    })/**/
  }
  render() {

    //const { name } = this.props
    return <div className='ib'>
      <br />
      <img src='http://127.0.0.1:9000/uploads/2.JPG' />
      <p>здесь моя лента новостей</p>

    </div>
  }
}


/**/