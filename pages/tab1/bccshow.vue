<template>
	<view id="bccshow" style="padding: 20rpx;background-color: #eaeffc;width: 100vw;">
		<view
			style="background-color: #48adf1;display: flex;align-items: center;padding: 20rpx;border-radius: 8rpx;margin-bottom: 20rpx;">
			<image src="../../static/img/work/bcc.png" style="width: 15%;" mode="widthFix"></image>
			<u-input v-model="jbxx.name" style="margin-left: 2%;font-size: 40rpx;width: 85%;" type="select"
				@click="deviceSelect.show = true" />
		</view>
		<view
			style="color: white;background-color: #4f77e1;padding: 20rpx;border-radius: 8rpx;margin: 20rpx 0rpx;">
			<view
				style="font-weight: bold;font-size: 30rpx;border-bottom: 2rpx solid white;padding-bottom: 10rpx;">
				基本信息
			</view>
			<view style="margin-top: 10rpx;position: relative;">
				<view>
					名称：{{jbxx.name}}
				</view>
				<view>
					型号：{{jbxx.xh}}
				</view>
				<view>
					序列号：{{jbxx.no}}
				</view>
				<view style="color: white;position: absolute;right: 0rpx;bottom: 0rpx;">
					更多
				</view>
			</view>
		</view>
		<view style="background-color: white;border-radius: 10rpx;margin-top: 20rpx;line-height: 45rpx;">
			<uni-collapse ref="collapseDevice">
				<uni-collapse-item :open="true">
					<template v-slot:title>
						<view style="background-color: #4f77e1;color: white;padding: 20rpx;">
							实时信息
						</view>
					</template>
					<view>
						<view style="display: flex;justify-content: space-between;">
							<view>
								状态代码: 100
							</view>
							<view style="color: #1890FF" @click="goGzjx">
								解析
							</view>
						</view>
						<view>
							档位给定：2档
						</view>
						<view>
							速度反馈：50%
						</view>
						<view>
							CT1反馈值：12234
						</view>
						<view>
							。。。
						</view>
					</view>
				</uni-collapse-item>
				<alarmCollapseItem :alarmList="alarmList"></alarmCollapseItem>
			</uni-collapse>
		</view>
		<u-button type="warning" @click="goDeviceChart" style="margin-top: 20rpx;display: block;">高频故障统计</u-button>
		<u-select v-model="deviceSelect.show" mode="mutil-column-auto" :list="deviceSelect.list" @confirm="deviceSelectChange">
		</u-select>
	</view>
</template>

<script>
	import alarmCollapseItem from '../../components/common/alarmCollapseItem.vue'
	export default {
		data() {
			return {
				jbxx: {
					name: '1号10bcc调压调速装置',
					xh: 'THYD-234',
					no: '2342524562'
				},
				alarmList: [],
				deviceSelect: {
					list: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					}],
					show: false
				}
			};
		},
		components: {
			alarmCollapseItem
		},
		methods: {
			goDeviceChart() {
				uni.navigateTo({
					url: "../tab1/deviceChart"
				});
			},
			deviceSelectChange(e) {
				console.log(e)
			},
			goGzjx() {
				uni.navigateTo({
					url: "../tab1/gzjx"
				});
			}
		},
		onLoad(data) {
			console.log(data)
		},
		onUnload() {}
	}
</script>

<style lang="scss">
#bccshow {
	.u-input__input {
		color: white;
		font-size: 36rpx;
	}
	.uni-collapse-item__title.uni-collapse-item-border {
		background-color: #4f77e1;
	}
	.uni-icons {
		color: white !important;
	}
}
</style>
