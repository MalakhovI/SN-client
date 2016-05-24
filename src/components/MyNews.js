/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from "jquery";
import {GET_NEWS_SUCCESS} from '../constants/Page'
import { getNews } from  '../actions/PageActions'
import { browserHistory } from 'react-router'

function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}//mapStateToProps

function mapDispatchToProps(dispatch) {
  return {
    getNews: () => getNews(dispatch)
  }
}

class MyNews extends Component {
  componentDidMount (){
    const {getNews} =  this.props;
    getNews();
  }//componentDidMount

  removeNews(e){
    const {getNews} =  this.props;
      $.ajax({
        method:'DELETE',
        url:'http://127.0.0.1:9000/news/removeNews'+'?'+ 'id='+ arguments[0],
        dataType: 'json',
        cache: false,
        header:{'Access-Control-Allow-Origin': '*'},
        data: arguments[0],
        crossDomain: true
      }).success(function(result){
        getNews();
      }.bind(this)).error(function(err){
        getNews();
      })
  }//removeNews
  render() {

    const { News } = this.props.myNews;
    return <div>
          {
            News.map((entry, index) =>
              <div key={index} className='news-block'>
                <span className="glyphicon glyphicon glyphicon-pencil update-news" aria-hidden="true"></span>
                <span className="glyphicon glyphicon glyphicon-remove delete-news" onClick={this.removeNews.bind(this, entry.id)} aria-hidden="true"></span>
                <h3 className='bold'>{entry.title}</h3>
                <p>{entry.text}</p>
                <div><img className='news-photo' src={entry.imgURL ? entry.imgURL :null} /></div>
              </div>
          )
}
    </div>
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNews)
