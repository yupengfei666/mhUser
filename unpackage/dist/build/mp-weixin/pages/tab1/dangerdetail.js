(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab1/dangerdetail"],{"64f2":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"92fb":function(t,e,a){"use strict";a.r(e);var n=a("64f2"),i=a("fb6f");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("baa6");var s,r=a("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=c.exports},baa6:function(t,e,a){"use strict";var n=a("df1c"),i=a.n(n);i.a},c36d:function(t,e,a){"use strict";(function(t){a("52a8");n(a("66fd"));var e=n(a("92fb"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=a,t(e.default)}).call(this,a("543d")["createPage"])},d0be:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,i=r(a("6bdd")),o=a("dad2"),s=a("26cb");function r(t){return t&&t.__esModule?t:{default:t}}var c=null,l={data:function(){return{selectAgentlength:0,CID:"",typeID:"",selectAgent:[],loadMoreText:"加载中...",showLoadMore:!1,cWidth:"",cHeight:"",pixelRatio:1,textarea:""}},computed:(0,s.mapState)(["url"]),methods:{getChartData:function(){t.request({url:this.url+"Danger/GetNearDangerInfo",data:{CraneID:this.CID,type:this.typeID},header:{"content-type":"application/json",sessionkey:t.getStorageSync("password")},success:function(e){401===e.statusCode&&t.reLaunch({url:"../tab4/login"});for(var a={categories:[],series:[{name:"行为隐患",data:[]}]},i=0;i<e.data.length;i++)a.categories.push(e.data[i]["时间"].substring(5,10)),a.series[0].data.push(e.data[i]["数量"]);n.textarea=JSON.stringify(a),n.showLineA("canvasLineA",a)},fail:function(){n.tips="网络错误，小程序端请检查合法域名"}})},showLineA:function(t,e){c=new i.default({$this:n,canvasId:t,type:"line",fontSize:11,padding:[15,15,0,15],legend:{show:!0,padding:5,lineHeight:11,margin:5},dataLabel:!0,dataPointShape:!0,background:"#FFFFFF",pixelRatio:n.pixelRatio,categories:e.categories,series:e.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!1,type:"grid",gridType:"dash",itemCount:8,scrollShow:!0,scrollAlign:"left"},yAxis:{gridType:"dash",splitNumber:8,min:1,max:10,format:function(t){return t.toFixed(0)}},width:n.cWidth*n.pixelRatio,height:n.cHeight*n.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA:function(t){c.scrollStart(t)},moveLineA:function(t){c.scroll(t)},touchEndLineA:function(t){c.scrollEnd(t),c.touchLegend(t),c.showToolTip(t,{format:function(t,e){return e+" "+t.name+":"+t.data}})},changeData:function(){if((0,o.isJSON)(n.textarea)){var e=JSON.parse(n.textarea);c.updateData({series:e.series,categories:e.categories,scrollPosition:"right",animation:!1})}else t.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},cheAgent:function(){t.navigateTo({url:"./zhuangtaiquxian"})},getAppOldAgent:function(){var e=this,a=this;this.showLoadMore=!1,t.showToast({title:"加载中...",icon:"loading",duration:3e4}),t.request({url:this.url+"Danger/DeviceDangerListByCraneAndType",method:"GET",dataType:"json",header:{"content-type":"application/json",sessionkey:t.getStorageSync("password")},data:{CID:this.CID,type:this.typeID},success:function(n){t.stopPullDownRefresh(),t.hideToast(),200!==n.statusCode?(console.log("请求失败:",n),401===n.statusCode&&t.reLaunch({url:"../tab4/login"})):(e.selectAgent=n.data,a.selectAgentlength=e.selectAgent.Data.length,console.log(a.selectAgentlength),console.log(JSON.stringify(e.selectAgent)),0===n.data.Data.length&&(e.loadMoreText="没有更多数据了!"))},fail:function(){t.stopPullDownRefresh(),t.hideToast(),t.showToast({icon:"none",title:"网络连接失败"})}})}},onPullDownRefresh:function(){this.loadMoreText="加载中...",this.showLoadMore=!1,this.getAppOldAgent(),this.getChartData()},onLoad:function(e){n=this,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.CID=e.CID,this.typeID=e.typeID,this.getAppOldAgent(),this.getChartData()}};e.default=l}).call(this,a("543d")["default"])},df1c:function(t,e,a){},fb6f:function(t,e,a){"use strict";a.r(e);var n=a("d0be"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a}},[["c36d","common/runtime","common/vendor"]]]);