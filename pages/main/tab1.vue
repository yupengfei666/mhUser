<template>
	<view class="content">
		<u-swiper :list="info" height="330"></u-swiper>
		<view style="height: 20upx;">
		</view>
		<u-collapse ref="collapse" style="padding-left: 15rpx;">
			<u-collapse-item title="全局总览" v-if="functionList.indexOf('全局总览')>-1">
				<view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							今日故障总数
						</view>
						<view style="color:#007AFF">
							{{zongLan.day}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							最近30天平均故障数
						</view>
						<view style="color:#007AFF">
							{{zongLan.month}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							指标故障数
						</view>
						<view style="color:#007AFF">
							{{zongLan.standard}}
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							今日累计吨位
						</view>
						<view style="color:#007AFF">
							4000
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							最近30天平均吨位
						</view>
						<view style="color:#007AFF">
							5800
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-navigate"
						style="height: 80upx;width: 95%;padding-left: 10%;">
						<view>
							指标吨位
						</view>
						<view style="color:#007AFF">
							5000
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="实时故障" v-if="functionList.indexOf('实时故障')>-1">
				<u-empty v-if="curAlarmsList.length === 0" text="暂无故障" mode="list"></u-empty>
				<u-card v-else :title="alarm['起重机名称']" v-for="(alarm,index) in curAlarmsList">
					<view slot="body">
						<view v-for="(buf,index1) in alarm.data" :key="index1" style="display: flex;justify-content: space-between;">
							<view style="width: 30%;">
								{{buf['时间'].substr(0,19)}}
							</view>
							<view style="width: 70%;">
								{{buf['含义解析']}}
							</view>
						</view>
					</view>
				</u-card>
			</u-collapse-item>
			<u-collapse-item title="实时状态" v-if="functionList.indexOf('实时状态')>-1">
				<u-cell-group v-for="item in systemList">
					<u-cell-item icon="" :arrow="false" value="" @click="cheAgent(item)">
						<view slot="title">
							{{item['工作区域']}} - {{item['Name']}}
						</view>
						<view slot="right-icon" style="display: flex;">
							<view>
								<view v-if="item.QiDong === '在线'"
									style="border-radius: 50%;background-color: #7cd788;color: #7cd788;width: 40rpx;height: 40rpx;">
								</view>
								<view v-else
									style="border-radius: 50%;background-color: #cdcdcd;color: #cdcdcd;width: 40rpx;height: 40rpx;">
								</view>
							</view>
							<u-icon name="arrow-right" color="" size="28"></u-icon>
						</view>
					</u-cell-item>
				</u-cell-group>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				info: [{
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=5.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=9.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=7.jpg'
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
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
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
									url: '../tab4/login',
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
									url: '../tab4/login',
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
				this.curAlarmsList = []
				this.$myHttp('WeChat/GetCurAlarms').then(res => {
					for (let item of res) {
						if(item.data.length > 0) {
							this.curAlarmsList.push(item)
						}
					}
				})
			},
			getSystem() {
				const p = {
					userName: uni.getStorageSync('name')
				}
				this.$myHttp('WeChat/GetSystemWithAlarm', p).then(res => {
					this.systemList = res
					this.$nextTick(() => {
						this.$refs.collapse.init()
					})
				})
			},
			refreshSystem() {
				uni.stopPullDownRefresh();
				this.getSystem();
				this.timer = setInterval(() => {
					this.getSystem();
					this.GetCurAlarms();
					this.GetFunction();
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
			uni.getStorage({
				key: "password",
				success: (res) => {
					this.getZongLang();
					this.getSystem();
					this.GetCurAlarms();
					this.GetFunction();
					this.refreshSystem();
					this.login(res.data);
				},
				fail: () => {
					uni.reLaunch({
						url: '../tab4/login',
					});
				}
			});
		}
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
