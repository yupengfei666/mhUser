(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab3/tiyanzhanghao"],{"0723":function(t,e,n){},2941:function(t,e,n){"use strict";(function(t){n("52a8");o(n("66fd"));var e=o(n("2f1b"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"2f1b":function(t,e,n){"use strict";n.r(e);var o=n("aeef"),a=n("bc90");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("561e");var s,i=n("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=c.exports},"561e":function(t,e,n){"use strict";var o=n("0723"),a=n.n(o);a.a},"679c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("26cb");function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i={data:function(){return{selectAgent:[]}},computed:(0,o.mapState)(["url","functionList"]),methods:r(r({},(0,o.mapMutations)(["login","setFunctionList"])),{},{cheAgent:function(){t.navigateTo({url:"./zhuangtaiquxian"})},getAppOldAgent:function(){var e=this;t.showToast({title:"加载中...",icon:"loading",duration:3e4}),t.request({url:this.url+"WeChat/GetTiyan",method:"GET",dataType:"json",header:{"content-type":"application/json",sessionkey:t.getStorageSync("password")},success:function(n){if(t.stopPullDownRefresh(),t.hideToast(),200!==n.statusCode)console.log("请求失败:",n),401===n.statusCode&&t.reLaunch({url:"../tab4/login"});else{if("无"===n.data)return;e.selectAgent=[];for(var o=0;o<n.data.length;o++)e.selectAgent.push(n.data[o])}},fail:function(){t.stopPullDownRefresh(),t.hideToast(),t.showToast({icon:"none",title:"网络连接失败"})}})},GetFunction:function(){var e=this;t.request({url:this.url+"WeChat/GetFunction",header:{"content-type":"application/json",sessionkey:t.getStorageSync("password")},method:"GET",dataType:"json",success:function(n){t.stopPullDownRefresh(),200!==n.statusCode?(console.log("请求失败:",n),401===n.statusCode&&t.reLaunch({url:"../tab4/login"})):e.setFunctionList(n.data)},fail:function(){t.showToast({icon:"none",title:"网络连接失败"}),t.stopPullDownRefresh()}})},toMain:function(e){this.login(e),t.reLaunch({url:"../main/tab1"})},ok:function(e){var n=this;t.request({url:this.url+"WeChat/CheckUser",method:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded",sessionkey:t.getStorageSync("password")},data:{name:e.Name,password:e.Password},success:function(o){n.buttonloading=!1,1===o.data.Code?(t.setStorageSync("name",e.Name),t.setStorageSync("password",o.data.Data.session),t.setStorageSync("yonghu",o.data.Data.用户),t.setStorageSync("jituan",o.data.Data.集团),t.setStorageSync("gongsi",o.data.Data.公司),t.setStorageSync("zhiwu",o.data.Data.职务),n.GetFunction(),n.toMain(n.account)):t.showToast({icon:"none",title:"用户账号或密码不正确"})},fail:function(){n.buttonloading=!1,t.showToast({icon:"none",title:"网络连接失败"})}})}}),onPullDownRefresh:function(){this.getAppOldAgent()},onLoad:function(t){this.getAppOldAgent()}};e.default=i}).call(this,n("543d")["default"])},aeef:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},r=[]},bc90:function(t,e,n){"use strict";n.r(e);var o=n("679c"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a}},[["2941","common/runtime","common/vendor"]]]);