/**
 * Created by Ivan on 23.05.2016.
 */
import {GET_NEWS_SUCCESS,GET_NEWS_REQUEST,DROPZONE_SET,DROPZONE_SET_ERROR,
        DROPZONE_SET_HAVE_FILE,SEND_NEWS,EDIT_NEWS} from '../constants/Page'



const initialState = {
  newsTitle:'',
  newsText:'',
  DropBoxHaveFile:false,
  currentDropzone:{},
  haveFile:false,
  indexNewsEdit:-1,
  idNewsEdit:-1,
  News:[],
  errMsg:''
};

export default function myNews(state = initialState,action) {
  switch (action.type) {
  case GET_NEWS_SUCCESS:
    return {...state, News : action.payload };


  case DROPZONE_SET:
      return {...state, currentDropzone: action.payload};
  case DROPZONE_SET_ERROR:
    return {...state, errMsg : action.payload};
  case DROPZONE_SET_HAVE_FILE:
    return {...state, haveFile: action.payload};
  case SEND_NEWS:
    return {...state, newsTitle: action.newsTitle, newsText:action.newsText};

  case EDIT_NEWS:
    return {...state, indexNewsEdit: action.indexNewsEdit, idNewsEdit:action.idNewsEdit};

  case GET_NEWS_REQUEST:
    return {...state};
  default:

    return state;
  }
}
