(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab4/set/guanzhuqizhongji"],{"29fd":function(e,t,n){"use strict";(function(e){n("52a8");r(n("66fd"));var t=r(n("9f50"));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"87d9":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},s=[]},"9f50":function(e,t,n){"use strict";n.r(t);var r=n("87d9"),o=n("f78d");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);var a,c=n("f0c5"),i=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=i.exports},dfae:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("26cb");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={data:function(){return{systemList:[],systemCheck:[]}},computed:(0,r.mapState)(["forcedLogin","url"]),methods:s(s({},(0,r.mapMutations)(["login","logout","setStorage"])),{},{systemCheckboxChange:function(t){var n=t.target.value;e.setStorage({key:"systemCheck",data:n})},getSystem:function(){var t=this;e.showToast({title:"加载中...",icon:"loading",duration:3e4}),e.request({url:this.url+"WeChat/GetSystem",data:{userName:e.getStorageSync("name")},method:"GET",dataType:"json",header:{"content-type":"application/json",sessionkey:e.getStorageSync("password")},success:function(n){if(e.hideToast(),e.stopPullDownRefresh(),200!==n.statusCode)console.log("请求失败:",n),401===n.statusCode&&e.reLaunch({url:"../tab4/login"});else{t.systemList=n.data;for(var r=!1,o=0,s=t.systemList.length;o<s;++o){t.systemList[o].Checked=!1;for(var a=0,c=t.systemCheck.length;a<c;++a)if(t.systemList[o].Name==t.systemCheck[a]){t.systemList[o].Checked=!0,r=!0;break}}if(!r)for(o=0,s=t.systemList.length;o<s;++o)t.systemList[o].Checked=!0}},fail:function(){e.stopPullDownRefresh(),e.hideToast(),e.showToast({icon:"none",title:"网络连接失败"})}})}}),onShow:function(){var t=this;e.getStorage({key:"systemCheck",success:function(e){t.systemCheck=e.data}}),e.getStorage({key:"name",success:function(e){t.getSystem(),t.login(e.data)},fail:function(){t.forcedLogin&&e.reLaunch({url:"../login/login"})}})}};t.default=c}).call(this,n("543d")["default"])},f78d:function(e,t,n){"use strict";n.r(t);var r=n("dfae"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a}},[["29fd","common/runtime","common/vendor"]]]);