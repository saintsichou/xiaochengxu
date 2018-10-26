import {
    wxRequest
  } from '../utils/wxRequest';

  const baseUrl = 'https://baidu.com/'
  //微信的jscode换取sessionKey
  const loginApi = (params) => wxRequest(params, baseUrl + "/api");
  //微信小程序列表
  const list = (params) =>  wxRequest(params,baseUrl+"/api/list")
  export default {
    loginApi,
    list
  }