(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab3/old-agent"],{3106:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("26cb"),s={data:function(){return{beginDate:"",endDate:"",cheName:"",classify:"",pageCount:10,pages:1,selectAgent:[],oldAgentList:[],systemCheck:[]}},computed:(0,a.mapState)(["url"]),methods:{cheAgent:function(){t.navigateTo({url:"./zhuangtaiquxian"})},getAppOldAgent:function(){var e=this;t.showToast({title:"加载中...",icon:"loading",duration:3e4}),t.request({url:this.url+"WeChat/GetAlarmInfoBySearch",method:"GET",dataType:"json",header:{"content-type":"application/json",sessionkey:t.getStorageSync("password")},data:{begin:this.beginDate,end:this.endDate,deviceId:this.cheName,subCode:this.classify},success:function(n){if(t.stopPullDownRefresh(),t.hideToast(),200!==n.statusCode)console.log("请求失败:",n),401===n.statusCode&&t.reLaunch({url:"../tab4/login"});else{e.selectAgent=[],e.oldAgentList=n.data;for(var a=0;a<e.oldAgentList.length;a++){if(a>=e.pageCount)break;e.selectAgent.push(e.oldAgentList[a])}}},fail:function(){t.stopPullDownRefresh(),t.hideToast(),t.showToast({icon:"none",title:"网络连接失败"})}})}},onPullDownRefresh:function(){this.pages=1,this.getAppOldAgent()},onReachBottom:function(){for(var t=this.pageCount*this.pages;t<this.oldAgentList.length;t++){if(t>=this.pageCount*(this.pages+1))break;this.selectAgent.push(this.oldAgentList[t])}this.pages=this.pages+1},onLoad:function(e){this.beginDate=e.beginDate,this.endDate=e.endDate,this.cheName=e.cheName,this.classify="全部"===e.classify?"-1":e.classify,t.setNavigationBarTitle({title:e.name+"_"+e.classify+"_历史报警"}),this.getAppOldAgent()}};e.default=s}).call(this,n("543d")["default"])},"476f":function(t,e,n){"use strict";n.r(e);var a=n("9289"),s=n("8456");for(var i in s)"default"!==i&&function(t){n.d(e,t,(function(){return s[t]}))}(i);n("a562");var o,u=n("f0c5"),c=Object(u["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},8456:function(t,e,n){"use strict";n.r(e);var a=n("3106"),s=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=s.a},9289:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var s=function(){var t=this,e=t.$createElement;t._self._c},i=[]},a562:function(t,e,n){"use strict";var a=n("ba03"),s=n.n(a);s.a},ba03:function(t,e,n){},d947:function(t,e,n){"use strict";(function(t){n("52a8");a(n("66fd"));var e=a(n("476f"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["d947","common/runtime","common/vendor"]]]);