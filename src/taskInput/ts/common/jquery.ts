import * as $ from 'jquery'
import { config } from './config'
$.ajaxSetup({
  statusCode: {
    404: () => {
      alert('page not found');
    }
  },
  xhrFields: {
    withCredentials: true
  },
  dataType: 'json',
  crossDomain: true,
  error: () => {
    console.log('页面请求失败')
  },
  success: (data)=>{
    console.log(data)
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json'
  }
})
export {
  $
}