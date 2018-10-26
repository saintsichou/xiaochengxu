# 前言
最近老年痴呆了，学了就忘，自学自记自用手册：）

    一、	介绍wepy
    二、	vscode 使用 wepy的小技巧
    三、	微信开发者工具使用说明
    四、	使用wepy开发微信小程序
    五、	wepy的躺坑之路

## 一、介绍wepy



![](https://user-gold-cdn.xitu.io/2018/10/26/166ae72f24575a73?w=2022&h=1560&f=png&s=381533)
ps:每个框架各有其优缺点，哪个用着爽就行。
[附上文档地址](https://tencent.github.io/wepy/document.html#/)

**1. 怎么使用wepy**
* 安装node
* 全局安装或更新WePY命令行工具

    `
    npm install wepy-cli -g
    `
* 生成demo工具，可以先使用wepy list查看模板以空模版为例 如需使用已有的模板可以直接敲命令行
 

![](https://user-gold-cdn.xitu.io/2018/10/26/166ae7c0e4609d0c?w=1186&h=910&f=png&s=338526)
    `wepy init empty myDemo
    `

* 此处注意项目名字不能大写，一路回车最后刹车
    ![](https://user-gold-cdn.xitu.io/2018/10/26/166ae7df8739e24c?w=758&h=60&f=png&s=31582)
这个语法监测有强迫症的慎点
    ![](https://user-gold-cdn.xitu.io/2018/10/26/166ae7f57562e4de?w=592&h=148&f=png&s=62863)

* 切换至项目目录
* 安装依赖包

    `npm i`

* 项目生成后是这样的

    <font color=#A52A2A size=4 >除了没有dist其他都有</font>
![](https://user-gold-cdn.xitu.io/2018/10/26/166ae86cd909054e?w=2198&h=384&f=png&s=165256)

至此我们的第一个wepy小程序项目构建完成。
                                                                                                
------------------------------------------------------------------------------

## 二、 vscode 使用 wepy的小技巧

**1.	vscode使用wpy语法高亮配置**

```
首选项-应用程序-setting.json加上如下代码，重启就ok
"files.associations": {
    "*.vue": "vue",
    "*.wpy": "vue",
    "*.wxml": "html",
    "*.wxss": "css"
},
"emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
}
```
这里附上其他编译器的高亮配置：[点我](https://www.cnblogs.com/bore/p/9165944.html)   

**2.  关于wepy的一些插件**


![](https://user-gold-cdn.xitu.io/2018/10/26/166ae918661bc913?w=692&h=480&f=png&s=74410)

![](https://user-gold-cdn.xitu.io/2018/10/26/166ae91be9836421?w=706&h=671&f=gif&s=189535)

**3. 	开启实时编译功能**

直接在vscode中打开myDemo的终端，输入指令：
`Npm run dev`
此时才会生成dist文件夹          
<font color='red' size='2'>Ps：启动时会如果刚才关闭了ESLint此时会报警告,进入wepy.congig.js 中设置eslint为false重跑指令就行了。这样会生成一个dist文件夹，如果想实时预览就必须用到微信开发者工具了，打开开发者工具-进入到myDemo项目的dist文件夹就可以看到项目了。</font>

## 三、微信开发者工具使用

**1.	使用微信开发者工具-->添加项目，项目目录请选择dist目录。**   
**2.	微信开发者工具-->项目-->关闭ES6转ES5。 重要：漏掉此项会运行报错。**     
**3.	微信开发者工具-->项目-->关闭上传代码时样式自动补全。             重要：某些情况下漏掉此项也会运行报错。**
**4.	微信开发者工具-->项目-->关闭代码压缩上传。 重要：开启后，会导致真机computed, props.sync 等等属性失效。**


## 四、使用wepy开发微信小程序

**1. 接下来我们应该应该做一个小小的demo,目录结构如下**

![](https://user-gold-cdn.xitu.io/2018/10/26/166ae999d306e96c?w=840&h=662&f=png&s=104000)

**2.先把文件夹构建起来，需要的图片材料塞进去。**    
**3.配置入口文件 app.wpy**  
小程序的全局配置均在此配置

```
config = {
    pages: [
      'pages/index',//首页
      'pages/find',//发现页
      'pages/my',//个人中心
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#ccc',
      backgroundColor: '#ffffff',
      selectedColor: '#1296db',
      borderStyle:'white',
      list: [
        {
          text: '首页',
          pagePath: 'pages/index',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_sel.png'
        },
        {
          text: '发现',
          pagePath: 'pages/find',
          iconPath: 'images/find.png',
          selectedIconPath: 'images/find_sel.png'
        },
        {
          text: '个人中心',
          pagePath: 'pages/my',
          iconPath: 'images/my.png',
          selectedIconPath: 'images/my_sel.png'
        }
      ]
    }
  }
  globalData = {};//全局数据
  onLaunch() {
    console.log('on launch')
  }
}
```
配置好后到开发者工具中看到报错
 
如图发现是find和 my页面还是空页面，我们进去写点什么。。。

**4.	配置好了，完美运行**

![](https://user-gold-cdn.xitu.io/2018/10/26/166aea0dc07d4a10?w=941&h=671&f=gif&s=74417)

**5.	写个搜索的组件**                    

其实和vue差不多吧，虽然我没用过vue，父子组件之间传值都是props 和
$emit。后面会附上代码，大家不要方。


```
<!--componont下的search组件-->
<template>
    <view class="search">
        <view class="main">
            <view class="content">
                <view class="icon-search iconfont icon"></view>
                <input placeholder="大家都在搜  {{title}}" bindinput="bindKeyInput"/>
                <view class="text" @tap="search()">搜索</view>
            </view>
        </view>
    </view>
</template>
<script>
import wepy from 'wepy';

export default class search extends wepy.component {
    data = {
        inputValue: ''
    }
    props = {
        title: String,
    }
    methods = {
        //搜索按钮
        search(){
            console.log('1111', this.inputValue);
            this.$emit('searchFn', this.inputValue);
        },
        //输入字符
        bindKeyInput(e){
            this.inputValue =  e.detail.value;
            console.log('2222', this.inputValue);
            this.$apply();
        }
    }
}
</script>
```
之后直接在父组件中import就行了

```
<!--index父组件-->
<style lang="less">

</style>
<template>
  <view class="container">
    <search :title="searchTitle" @searchFn.user="opertionFn"></search>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import search from '../components/search';

  export default class Index extends wepy.page {
     config = {
      navigationBarTitleText: '李二狗首页',
    }
    components = {
      search: search   
    }
    data ={
      searchTitle: '李二狗'
    }
    methods = {
      //搜索
     opertionFn(data, evt){
        console.log('operation');
        console.log(data);
    },
    }
    onLoad() {
      console.log('onLoad')
    }
  }
</script>
```
带组件的首页就完成了            

![](https://user-gold-cdn.xitu.io/2018/10/26/166aea5912c92c6c?w=744&h=1342&f=png&s=52697)

**7.	介绍下里面的数据请求wxReques.js**


* 自己封装好了数据请求

```
import wepy from 'wepy';
import util from './util';
import tip from './tip'
const API_SECRET_KEY = 'null'
const TIMESTAMP = util.getCurrentTime()
const SIGN = TIMESTAMP + API_SECRET_KEY

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    let header = { 
        'Content-Type': 'application/json',
        'cookie': wepy.getStorageSync('sessionid')
    } || {}
    data.sign = SIGN;
    data.time = TIMESTAMP;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: header,
    });
    tip.loaded();
    return res;
};

module.exports = {
    wxRequest
}
```
<font color='blue'>
* 这里必须提一下微信设置cookie的方法：</font>

```
登录请求回来之后,通过wx.setStorageSync读取保存res的header的cookie：
wx.setStorageSync("sessionid", res.header["Set-Cookie"])
在header头部取得：
wepy.getStorageSync('sessionid')
```

* 回到api.js --在api.js中集中请求

```
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
```

* 	最后直接在页面中调用


![](https://user-gold-cdn.xitu.io/2018/10/26/166af020cf5b4cd5?w=1718&h=1684&f=png&s=443080)

先写这么多，未完待续...




## 五、	wepy的躺坑之路

暂时先放着有时间再补。