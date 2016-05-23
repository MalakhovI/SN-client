/**
 * Created by Malakhov_Ivan on 23.05.2016.
 */
import  Cookies from "cookies-js"
export default function checkToken(){
  return Cookies.get('token')?true:false;
}