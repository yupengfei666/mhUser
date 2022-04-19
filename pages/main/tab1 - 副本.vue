<template>
	<view class="content">
		<!-- <button class="qiun-button" @tap="scanCode()">扫码</button>
		<view>{{scanCodeText}}</view> -->
		<uni-swiper-dot :info="info" :current="current" field="content" mode="nav">
			<swiper class="swiper-box" @change="change" indicator-dots="true" indicator-color="gray" indicator-active-color="#fff"
			 autoplay="true" interval="8000">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<image :src="item.images" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view style="height: 20upx;">
		</view>
		<uni-collapse>
			<uni-collapse-item title="全局总览" thumb="../../static/img/quanjuzonglan.png" v-if="functionList.indexOf('全局总览')>-1">
				<view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							今日故障总数
						</view>
						<view style="color:#007AFF">
							{{zongLan.day}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							最近30天平均故障数
						</view>
						<view style="color:#007AFF">
							{{zongLan.month}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							指标故障数
						</view>
						<view style="color:#007AFF">
							{{zongLan.standard}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							今日累计吨位
						</view>
						<view style="color:#007AFF">
							4000
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							最近30天平均吨位
						</view>
						<view style="color:#007AFF">
							5800
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate" style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							指标吨位
						</view>
						<view style="color:#007AFF">
							5000
						</view>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="实时故障" thumb="../../static/img/shishiguzhang.png" v-if="functionList.indexOf('实时故障')>-1"
			 :error="errorCount1">
				<uni-card v-for="(alarm,index) in curAlarmsList" :key="index" :title="alarm['起重机名称']" v-if="alarm.Checked">
					<view class="uni-list-cell-navigate" v-for="(buf,index1) in alarm.data" :key="index1">
						<view style="width: 30%;">
							{{buf['时间'].substring(5,16)}}
						</view>
						<view style="width: 70%;">
							{{buf['含义解析']}}
						</view>
					</view>
				</uni-card>
			</uni-collapse-item>
			<uni-collapse-item title="隐患分析" thumb="../../static/img/yinhuanfenxi.png" v-if="functionList.indexOf('隐患分析')>-1"
			 :error="errorCount3" errorstyle="background-color: #FFDC35;">
				<view class="uni-list-cell" v-if="systemList1.length > 0" style="width: 95%;background: white;">
					<view class="uni-list-cell-navigate">
						<view style="width: 11%;text-align: center;">
							序号
						</view>
						<view style="width: 20%;text-align: center;">
							区域
						</view>
						<view style="width: 50%;text-align: center;">
							起重机
						</view>
						<view style="width:13%;">
							行为隐患
						</view>
						<view style="width:12%;">
							设备隐患
						</view>
					</view>
				</view>
				<view class="uni-list-cell" v-for="(system,index) in systemList1" :key="index" style="width: 95%;background: white;">
					<view class="uni-list-cell-navigate" v-show="system.Checked" @click="cheDanger(system)" style="height: 100upx;">
						<view style="width: 11%;text-align: center;">
							{{index+1}}
						</view>
						<view style="width: 20%;text-align: center;">
							{{system['工作区域']}}
						</view>
						<view style="width: 51%;text-align: center;">
							{{system.Name}}
						</view>
						<view style="width: 12%;text-align: center;">
							<view v-if="system['行为隐患']">
								<view style="background-color: #FFDC35;color: black;width: 50upx;margin-top: 5upx;border-radius: 25upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										{{system['行为隐患']}}
									</view>
								</view>
							</view>
							<view v-else>
								<!-- 						<view style="background-color: #7cd788;color: black;width: 50upx;margin-top: 5upx;border-radius: 25upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										0
									</view>
								</view> -->
							</view>
						</view>
						<view style="width: 12%;text-align: center;">
							<view v-if="system['设备隐患']">
								<view style="background-color: #FFDC35;color: black;width: 50upx;margin-top: 5upx;border-radius: 25upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										{{system['设备隐患']}}
									</view>
								</view>
							</view>
							<view v-else>
								<!-- 						<view style="background-color: #7cd788;color: black;width: 50upx;margin-top: 5upx;border-radius: 25upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										0
									</view>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="实时状态" thumb="../../static/img/shishizhuangtai.png" v-if="functionList.indexOf('实时状态')>-1"
			 :error="errorCount2" errorstyle="background-color: #cdcdcd;">
				<view class="uni-list-cell" v-if="systemList.length > 0" style="width: 95%;background: white;">
					<view class="uni-list-cell-navigate">
						<view style="width: 11%;text-align: center;">
							序号
						</view>
						<view style="width: 32%;text-align: center;">
							区域
						</view>
						<view style="width: 50%;text-align: center;">
							起重机
						</view>
						<!-- <view  style="width:13%;">
							故障
						</view> -->
						<view style="width:12%;">
							在线状态
						</view>
					</view>
				</view>
				<view class="uni-list-cell" v-for="(system,index) in systemList" :key="index" style="width: 95%;background: white;">
					<view class="uni-list-cell-navigate" v-show="system.Checked" @tap="cheAgent(system)" style="height: 100upx;">
						<view style="width: 11%;text-align: center;">
							{{index+1}}
						</view>
						<view style="width: 32%;text-align: center;">
							{{system['工作区域']}}
						</view>
						<view style="width: 51%;text-align: center;">
							{{system.Name}}
						</view>
						<!-- 						<view  style="width: 12%;text-align: center;">
							<view v-if="system.GuZhang">
								<view style="background-color: #f47463;color: black;width: 50upx;margin-top: 5upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										{{system.GuZhang}} 
									</view>
								</view>
							</view>
							<view v-else>
								<view style="background-color: #7cd788;color: black;width: 50upx;margin-top: 5upx;">
									<view style="margin-bottom: 3upx;font-size: 23upx;">
										0
									</view>
								</view>
							</view>
						</view> -->
						<view style="width: 12%;text-align: center;">
							<view v-show="system.QiDong === '在线'" style="border-radius: 100upx;background-color: #7cd788;color: #7cd788;width: 50upx;margin-top: 5upx;">
								<view style="margin-bottom: 3upx;">
									1
								</view>
							</view>
							<view v-show="system.QiDong !== '在线'" style="border-radius: 100upx;background-color: #cdcdcd;color: #cdcdcd;width: 50upx;margin-top: 5upx;">
								<view style="margin-bottom: 3upx;">
									1
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSwiperDot from "@/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue"
	import uniCard from '@/components/uni-card/uni-card.vue'
	var _self;
	var canvaLineA = null;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniCard
		},
		data() {
			return {
				info: [{
					content: '',
					images: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=8.jpg'
				}, {
					content: '',
					images: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=6.jpg'
				}],
				current: 0,
				timer: null,
				systemList: [],
				zongLan: {
					"day": 0,
					"month": 0,
					"standard": 0
				},
				systemCheck: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				curAlarmsList: [],
				errorCount1: null,
				errorCount2: null,
				systemList1: [],
				errorCount3: null,
				scanCodeText: ''
			};
		},
		computed: mapState(['forcedLogin', "url", "functionList"]),
		methods: {
			...mapMutations(['login', 'setFunctionList']),
			scanCode() {
				let _this = this
				uni.scanCode({
					// scanType: ['barCode'],
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						_this.scanCodeText = res.result
					}
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			getZongLang() {
				uni.getStorage({
					key: "systemCheck",
					success: (res) => {
						this.systemCheck = res.data;
					}
				});
				uni.request({
					url: this.url + "WeChat/GetUserAlarmInfo",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						userName: uni.getStorageSync('name'),
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							if (res.statusCode === 401) {
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							this.zongLan = res.data;
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
					}
				})
			},
			GetFunction() {
				uni.request({
					url: this.url + "WeChat/GetFunction",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if (res.statusCode === 401) {
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							this.setFunctionList(res.data)
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
					}
				})
			},
			GetCurAlarms() {
				uni.request({
					url: this.url + "WeChat/GetCurAlarms",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if (res.statusCode === 401) {
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							this.errorCount1 = 0
							this.curAlarmsList = res.data
							if (this.systemCheck === undefined || this.systemCheck.length == 0) {
								for (var i = 0, lenI = this.curAlarmsList.length; i < lenI; ++i) {
									this.curAlarmsList[i].Checked = true;
									this.errorCount1 = this.errorCount1 + this.curAlarmsList[i].data.length
								}
							} else {
								for (var i = 0, lenI = this.curAlarmsList.length; i < lenI; ++i) {
									this.curAlarmsList[i].Checked = false;
									for (var j = 0, lenJ = this.systemCheck.length; j < lenJ; ++j) {
										if (this.curAlarmsList[i].起重机名称 == this.systemCheck[j]) {
											this.curAlarmsList[i].Checked = true;
											this.errorCount1 = this.errorCount1 + this.curAlarmsList[i].data.length
											break
										}
									}
								}
							}
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
					}
				})
			},
			getSystem() {
				this.systemCheck = []
				uni.getStorage({
					key: "systemCheck",
					success: (res) => {
						this.systemCheck = res.data;
					}
				});
				uni.request({
					url: this.url + "WeChat/GetSystemWithAlarm",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					data: {
						userName: uni.getStorageSync('name'),
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if (res.statusCode === 401) {
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							this.errorCount2 = 0
							this.systemList = res.data;
							if (this.systemCheck === undefined || this.systemCheck.length == 0) {
								for (var i = 0, lenI = this.systemList.length; i < lenI; ++i) {
									this.systemList[i].Checked = true;
									if (this.systemList[i].QiDong === '离线' || this.systemList[i].QiDong === null) {
										this.errorCount2 = this.errorCount2 + 1 // this.systemList[i].GuZhang
									}
								}
							} else {
								for (var i = 0, lenI = this.systemList.length; i < lenI; ++i) {
									this.systemList[i].Checked = false;
									for (var j = 0, lenJ = this.systemCheck.length; j < lenJ; ++j) {
										if (this.systemList[i].Name == this.systemCheck[j]) {
											if (this.systemList[i].QiDong === '离线' || this.systemList[i].QiDong === null) {
												this.errorCount2 = this.errorCount2 + 1 //this.systemList[i].GuZhang
											}
											this.systemList[i].Checked = true;
											break
										}
									}
								}
							}
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
					}
				})
			},
			getDanger() {
				this.systemCheck = []
				uni.getStorage({
					key: "systemCheck",
					success: (res) => {
						this.systemCheck = res.data;
					}
				});
				uni.request({
					url: this.url + "Danger/CranesWithDangers",
					header: {
						'content-type': 'application/json',
						'sessionkey': uni.getStorageSync('password')
					},
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						uni.stopPullDownRefresh();
						if (res.statusCode !== 200) {
							console.log("请求失败:", res);
							if (res.statusCode === 401) {
								uni.reLaunch({
									url: '../main/login',
								});
							}
						} else {
							this.errorCount3 = 0
							this.systemList1 = res.data;
							if (this.systemCheck === undefined || this.systemCheck.length == 0) {
								for (var i = 0, lenI = this.systemList1.length; i < lenI; ++i) {
									this.systemList1[i].Checked = true;
									this.errorCount3 = this.errorCount3 + this.systemList1[i].行为隐患 + this.systemList1[i].设备隐患
								}
							} else {
								for (var i = 0, lenI = this.systemList1.length; i < lenI; ++i) {
									this.systemList1[i].Checked = false;
									for (var j = 0, lenJ = this.systemCheck.length; j < lenJ; ++j) {
										if (this.systemList1[i].Name == this.systemCheck[j]) {
											this.systemList1[i].Checked = true;
											this.errorCount3 = this.errorCount3 + this.systemList1[i].行为隐患 + this.systemList1[i].设备隐患
											break
										}
									}
								}
							}
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络连接失败',
						});
						uni.stopPullDownRefresh();
					}
				})
			},
			refreshSystem() {
				uni.stopPullDownRefresh();
				this.getSystem();
				this.timer = setInterval(() => {
					this.getSystem();
					this.GetCurAlarms();
					this.GetFunction();
					this.getDanger();
				}, 60000);
			},
			cheAgent(e) {
				uni.navigateTo({
					url: "../tab1/agent?system=" + JSON.stringify(e)
				});
			},
			cheDanger(e) {
				uni.navigateTo({
					url: "../tab1/danger?system=" + JSON.stringify(e)
				});
			}
		},
		onPullDownRefresh() {
			this.info = [{
				content: '',
				images: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=8.jpg'
			}, {
				content: '',
				images: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=6.jpg'
			}];
			//this.getServerData();
			this.getZongLang();
			this.getSystem();
			this.GetCurAlarms();
			this.GetFunction();
			this.getDanger();
		},

		onLoad() {
			_self = this;
			//#ifdef 	MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			//this.getServerData();
			uni.getStorage({
				key: "password",
				success: (res) => {
					this.getZongLang();
					this.getSystem();
					this.GetCurAlarms();
					this.GetFunction();
					this.getDanger();
					this.refreshSystem();
					this.login(res.data);
				},
				fail: () => {
					uni.reLaunch({
						url: '../main/login',
					});
				}
			});
		}
		/* ,
				onHide() {
					if(this.timer)
					{
						clearInterval(this.timer);
						this.timer = null;
					}
				} */
	}
</script>

<style>
	.swiper-box {
		width: 750upx;
		height: 350upx;
	}

	.swiper-item {
		width: 750upx;
		height: 350upx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
