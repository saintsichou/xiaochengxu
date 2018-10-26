import 'wepy-async-function'
import wepy from 'wepy'
function getCurrentTime() {
  let keep = ''
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s
  return keep // 20160614134947
}

function objLength(input) {
  let type = toString(input)
  let length = 0
  if (type !== '[object Object]') {
    // throw '输入必须为对象{}！'
  } else {
    for (let key in input) {
      if (key !== 'number') {
        length++
      }
    }
  }
  return length
}
// 验证是否是手机号码
function vailPhone(number) {
  let flag = true
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/
  if (number.length !== 11 || !myreg.test(number)) {
    flag = false
  }
  return flag
}


//  遍历对象属性和值
function displayProp(obj) {
  let names = ''
  for (let name in obj) {
    names += name + obj[name]
  }
  return names
}
//  去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/g, '')
}
// 去除所有:,英文冒号
function replaceColon(txt) {
  return txt.replace(/:/g, '')
}
//code用户登录凭证（有效期五分钟）。
//开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
function goLogin(){
    return new Promise((resolve, reject) => {
        wx.login({
            success:function (res) {
                var code = res.code;
                console.log(code);
                requestApi(
                    "/wxCode",
                    { 
                    "code": res.code,
                    },
                    function (res) {
                        console.log('login');
                        console.log(res);
                        resolve();
                    }
                )          
            }
        })   
    })
}
function requestApi(uri, data,succ_cb, fail_cb, complete_cb) {
    if (!data) {
      data = new Object();
    }
    wx.getNetworkType({
      success: function (res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == "none") {
          wepy.showToast({
            title: '请设置网络',
            icon: 'none',
            duration: 1500
          })
          return
        }else{
            var seesionKey = wepy.getStorageSync("session_key");
            var timestamp = Date.parse(new Date())/1000;
            data.timestamp = timestamp;
            wx.request({
                url: 'host' + uri,
                data: data,
                method: 'POST',
                dataType: "json",
                header: { 
                    'content-type': 'application/json',
                    'cookie': wepy.getStorageSync('sessionid')
                },
                success: function (res) {
                    if (succ_cb && typeof succ_cb === 'function') {
                        if (uri == '/wxCode'){
                            succ_cb(res);
                        }else{
                            succ_cb(res.data);
                        }
                        
                    }
                },
                fail: function (res) {
                wepy.hideLoading();
                wepy.showToast({
                    title: '网络错误，请重试！',
                    icon: 'none',
                    duration: 2000
                })
                if (fail_cb && typeof fail_cb === 'function') {
                    fail_cb(res);
                }
                },
                complete: function () {
                if (complete_cb && typeof complete_cb === 'function') {
                    complete_cb();
                }
                }
            })
        }
      }
    })
  }

module.exports = {
  getCurrentTime: getCurrentTime,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceColon: replaceColon,
  vailPhone: vailPhone,
  goLogin: goLogin,
  requestApi: requestApi
}
