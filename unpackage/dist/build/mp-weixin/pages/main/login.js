(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/login"],{"3d65":function(t,e,n){"use strict";(function(t){n("52a8");a(n("66fd"));var e=a(n("dee9"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"49d4":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.showChangeUrl=!0})},i=[]},"8e8c":function(t,e,n){},"9c83":function(t,e,n){"use strict";n.r(e);var a=n("b8bd"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},b8bd:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("26cb");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=r({data:function(){return{logining:!1,account:"",password:"",buttonloading:!1,showChangeUrl:!1,value:""}},onReady:function(){var e=t.getStorageSync("localUrl");e&&this.setUrl(e),this.value=this.url,this.setUrl(this.value)},onShareAppMessage:function(){return{title:"分享",path:"pages/main/login"}},onLoad:function(){},computed:(0,a.mapState)(["url","initUrl"]),methods:i(i({},(0,a.mapMutations)(["login","setUrl"])),{},{setInitUrl:function(){t.setStorageSync("localUrl",this.initUrl),this.setUrl(this.initUrl),this.value=this.initUrl,t.showToast({icon:"none",title:"修改成功"})},setTextUrl:function(){console.log(344),console.log(this.value),t.setStorageSync("localUrl",this.value),this.setUrl(this.value),t.showToast({icon:"none",title:"修改成功"})},inputChange:function(t){var e=t.currentTarget.dataset.key;this[e]=t.detail.value},navBack:function(){t.navigateBack()},toRegist:function(){this.$api.msg("去注册")},bindLogin:function(){this.account.length<1?t.showToast({icon:"none",title:"账号最短为 1 个字符"}):this.password.length<6?t.showToast({icon:"none",title:"密码最短为 6 个字符"}):this.getData()},getData:function(){var e=this;this.buttonloading=!0,t.request({url:this.url+"WeChat/CheckUser",method:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded",sessionkey:t.getStorageSync("password")},data:{name:this.account,password:this.password,type:2},success:function(n){e.buttonloading=!1,0!==n.data.Code?-2!==n.data.Code?(t.setStorageSync("name",e.account),t.setStorageSync("password",n.data.Data.session),t.setStorageSync("yonghu",n.data.Data.用户),t.setStorageSync("jituan",n.data.Data.集团),t.setStorageSync("gongsi",n.data.Data.公司),t.setStorageSync("zhiwu",n.data.Data.职务),t.setStorageSync("tel",n.data.Data.tel),t.setStorageSync("comanyId",n.data.Data.公司ID),e.toMain(e.account)):t.showToast({icon:"none",title:"美恒工程师，不允许登录"}):t.showToast({icon:"none",title:"用户账号或密码不正确"})},fail:function(){e.buttonloading=!1,t.showToast({icon:"none",title:"网络连接失败"})}})},toMain:function(e){this.login(e),t.reLaunch({url:"../main/tab1"})}})},"onLoad",(function(){var e=this;t.getStorage({key:"name",success:function(t){e.account=t.data}}),t.getStorage({key:"password",success:function(){e.forcedLogin&&t.reLaunch({url:"../main/tab1"})}})}));e.default=c}).call(this,n("543d")["default"])},dee9:function(t,e,n){"use strict";n.r(e);var a=n("49d4"),o=n("9c83");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("e0ef");var r,c=n("f0c5"),s=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},e0ef:function(t,e,n){"use strict";var a=n("8e8c"),o=n.n(a);o.a}},[["3d65","common/runtime","common/vendor"]]]);