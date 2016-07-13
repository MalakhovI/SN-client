/**
 * Created by Ivan on 22.05.2016.
 */
import React, { PropTypes, Component } from 'react'
import  Cookies from "cookies-js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import $ from "jquery";

import {GET_NEWS_SUCCESS} from '../constants/Page'
import * as Actions from '../actions/PageActions'
import EditNewsForm from './EditNewsForm'


function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}//mapStateToProps

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
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

  editNews(idNews, indexInNews, e){
    const { News } = this.props.myNews;
    const {editMyNews} =  this.props;

    console.log('News=', News);
    console.log('this=', this);
    editMyNews(indexInNews,idNews);
    return browserHistory.push("/EditNewsForm");
  }
  render() {
    const { News } = this.props.myNews;
    return <div>
          {
            News.map((entry, index) =>
              <div key={index} className='news-block'>
                  <span className="glyphicon glyphicon glyphicon-pencil update-news" onClick={this.editNews.bind(this, entry.id, index)} aria-hidden="true"></span>
                  <span className="glyphicon glyphicon glyphicon-remove delete-news" onClick={this.removeNews.bind(this, entry.id)} aria-hidden="true"></span>
                <h3 className='bold'>{entry.title}</h3>
                <p className="news-text">{entry.text}</p>
                <div>{entry.imgURL?<img className='news-photo' src={entry.imgURL ? entry.imgURL :null} />:null}</div>
              </div>
          )
}
    </div>
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNews)
