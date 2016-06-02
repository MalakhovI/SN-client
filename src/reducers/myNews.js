/**
 * Created by Ivan on 23.05.2016.
 */
import {GET_NEWS_SUCCESS,GET_NEWS_REQUEST,DROPZONE_SET,DROPZONE_SET_ERROR,
        DROPZONE_SET_HAVE_FILE,DROPZONE_SEND_FILE_SUCCES} from '../constants/Page'


const initialState = {
  News:[],
  DropBoxHaveFile:false,
  DropBoxFilename:'',
  currentDropzone:{},
  haveFile:false,
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

  case GET_NEWS_REQUEST:
    return {...state};
  default:

    return state;
  }
}
