<template>
	<view class="content" style="text-align: center;">
		<u-subsection mode="subsection" active-color="#18b566" :list="list" :current="curNow" @change="sectionChange"></u-subsection>
		<view style="display: flex;justify-content: center;">
			<u-loading style="margin-top: 40%;" v-if="loading" mode="circle" size="36" color="green"></u-loading>
			<view v-else style="width: 100vw;">
				<view style="background-color: #ef5401;margin: 15rpx;border-radius: 8rpx;color: white;padding: 10rpx;">
					<view style="margin-bottom: 8rpx;">在线故障统计</view>
					<view style="background-color: white;border-radius: 8rpx;padding: 20rpx;color: #82848a;">
						<u-row gutter="16">
							<u-col span="6" style="text-align: center;">
								<view>当前故障{{guzhangLabel}}</view>
								<view>
									<span style="color: #ef5401;font-size: 80rpx;">3</span>
									<span style="margin-left: 10	rpx;">台</span>
								</view>
							</u-col>
							<u-col span="6" style="position: relative;">
								<span>当前故障总数</span>
								<span style="margin: 0rpx 10rpx;color: #ef5401;font-size: 40rpx;">4</span>
								<span>个</span>
								<view style="position: absolute;right: 2rpx;margin-top: 8rpx;color: #1890FF;">详情</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<u-collapse ref="collapse" style="padding-left: 15rpx;">
					<u-collapse-item :open="true" title="实时状态" v-if="functionList.indexOf('实时状态')>-1">
						<u-cell-group v-for="item in systemList">
							<u-cell-item icon="" :arrow="false" value="" @click="cheAgent(item)">
								<view slot="title">
									<span v-if="item['工作区域']">{{item['工作区域']}} - </span>
									<span v-else>{{item['Name']}}</span>
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
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				timer: null,
				loading: false,
				systemList: [],
				systemCheck: [],
				curAlarmsList: [],
				list: [{
					name: '起重机',
					label: '起重机',
					func: 'getQzjList'
				}, {
					name: '10BCC',
					label: '装置',
					func: 'getBccList'
				}],
				curNow: 0,
				guzhangLabel: '起重机'
			};
		},
		computed: mapState(["url", "functionList"]),
		methods: {
			...mapMutations(['login', 'setFunctionList']),
			sectionChange(index) {
				this.curNow = index;
				for (let i in this.list) {
					this.guzhangLabel = this.list[index].label
				}
				this.refreshSystem()
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
						if (item.data.length > 0) {
							this.curAlarmsList.push(item)
						}
					}
				})
			},
			refreshSystem() {
				uni.stopPullDownRefresh();
				this.timer && clearInterval(this.timer)
				this.loading = true
				this.getSystem();
				this.GetCurAlarms();
				this.timer = setInterval(() => {
					this.getSystem();
					this.GetCurAlarms();
				}, 60000);
			},
			getQzjList(){
				const p = {
					userName: uni.getStorageSync('name')
				}
				this.$myHttp('WeChat/GetSystemWithAlarm', p).then(res => {
					this.systemList = res
					// this.$nextTick(() => {
					// 	this.$refs.collapse.init()
					// })
					this.loading = false
				})
			},
			getBccList() {
				this.systemList = [{
					ID: 1,
					Name: "1#10BCC调压调速装置",
					QiDong: "离线"
				}]
				this.loading = false
			},
			getSystem() {
				// 根据配置
				this[this.list[this.curNow].func]()
			},
			cheAgent(e) {
				let path = this.curNow ? 'bccshow' : 'agent_n'
				uni.navigateTo({
					url: "../tab1/" + path + "?system=" + JSON.stringify(e)
				});
			},
			cheDanger(e) {
				uni.navigateTo({
					url: "../tab1/danger?system=" + JSON.stringify(e)
				});
			}
		},
		onPullDownRefresh() {
			this.GetFunction();
			this.refreshSystem();
		},
		onLoad() {
			uni.getStorage({
				key: "password",
				success: (res) => {
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
