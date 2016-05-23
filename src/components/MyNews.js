/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from "jquery";
import {GET_NEWS_SUCCESS} from '../constants/Page'

function mapStateToProps (state) {
  return {
    myNews: state.myNews // (1)
  }
}//mapStateToProps

function mapDispatchToProps(dispatch) {
  return {
    getNewsSuccess: bindActionCreators(getNewsSuccess, dispatch)
  }
}

function getNewsSuccess(news){
  return {
    type: GET_NEWS_SUCCESS,
    payload: news
  };

}
var news_my={};
class MyNews extends Component {

  constructor (props) {
    super(props);
/**/
    /*$.get('http://127.0.0.1:9000/news/getNews', function(result){
      console.log('---',result);

      if(!result || !result.data || !result.data.length){
        return;
      }
    }).error(function(err){
      console.log('__///__', err)
    });
    //})/**/

  } // constructor
  componentDidMount (){
    console.log('__3____',this);
    const {getNewsSuccess} =  this.props;
    let data = {userId: Cookies.get('userId')};
    /**/$.ajax({
     method:'GET',
     url:'http://127.0.0.1:9000/news/getNews',
     dataType: 'json',
     cache: false,
     header:{'Access-Control-Allow-Origin': '*'},
     data:data,
     crossDomain: true
     }).success(function(result){
     console.log('___1__', result);
      news_my = result;
     console.log('_this__', this);
      /*(dispatch) => {
        dispatch({
          type: GET_NEWS_SUCCESS,
          payload: result
        })}*/
      //this.setState({News:result})
      getNewsSuccess(result);

     }.bind(this)).error(function(err){
     console.log('___2__', err);
     })/**/
  }
  render() {





console.log('-----',this.props);
    const { News } = this.props.myNews;
   // console.log('=======', news_my);
    console.log('====News===', News);
    return <div className=''>

      <p>здесь моя лента новостей</p>
          {
       /*News ? <p>{News}</p>: <p> ytttn </p>
       /**/
        News.map((entry, index) =>
              <div key={index} className='news-block'>
                <span className="glyphicon glyphicon glyphicon-pencil update-news" aria-hidden="true"></span>
                <span className="glyphicon glyphicon glyphicon-remove delete-news" aria-hidden="true"></span>
                <h3 className='bold'>{entry.title}</h3>
                <p>{entry.text}</p>
                <div><img className='news-photo' src={entry.imgURL} /></div>
              </div>
          )
        /**/}

    </div>
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNews)
//<img src='http://127.0.0.1:9000/uploads/2.JPG' />


/**/