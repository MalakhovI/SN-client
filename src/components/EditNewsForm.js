
import React, { PropTypes, Component } from 'react'
import DropzoneMy from './AddNewsDropzone.js'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {
    myNews: state.myNews
  }
}//mapStateToProps

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}*/
let text ='';
let title ='';

export default class EditNewsForm extends Component {
  componentDidMount (){
    /*const { News,idNewsEdit,indexNewsEdit} = this.props.myNews;
    text =News[indexNewsEdit].text;
    title =News[indexNewsEdit].title;
    return {text:text, title:title}*/
  }
  render() {
    const { News,idNewsEdit,indexNewsEdit} = this.props.myNews;
    console.log('text-//-',text);
    text =News[indexNewsEdit].text;
    title =News[indexNewsEdit].title;
    return (<div className='col-md-8 col-sm-7'>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div className='user-block'>
            <span id="basic-addon1">Title:</span>
            <input placeholder="Title" id='iTitle' type="text" className="input-line form-control" defaultValue={title}/>
          </div>
          <div className='user-block'>
            <span id="basic-addon2">Text:</span>
            <textarea placeholder="Enter text here" id='iText' className="form-control area-text" defaultValue={text} ></textarea>
          </div>
        </div>
        <div className="col-lg-6">
          <div className='user-block'>
            <span id="basic-addon3">Add picture:</span>
            <DropzoneMy />
          </div>
        </div>
        {/*errMsg?<span className='error-msg'>{errMsg}</span>:null*/}
      </div>
      <div className='row user-block'>
        <div className="col-lg-6">
          <div>
            <button className='btn btn-primary user-btn' >Ok</button>
          </div>
        </div>
      </div>
    </div>)
  } //render
} //EditNewsForm

export default connect(mapStateToProps/*,mapDispatchToProps*/)(EditNewsForm)