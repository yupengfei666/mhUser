<template>
	<!-- 故障解析 -->
	<view style="padding: 20rpx;background-color: #F1F1F1;width: 100vw;">
		<view style="padding: 20rpx;background-color: white;border-radius: 10rpx;">
			<view>
				<span style="color: black;">
					发生时间:
				</span>
				<span style="color: grey;margin-left: 20rpx;">
					2022-04-12 10:12:12
				</span>
			</view>
			<view style="margin-top: 10rpx;">
				<span style="color: black;">
					故障名称:
				</span>
				<span style="color: grey;margin-left: 20rpx;">
					转子反馈故障Q1
				</span>
			</view>
			<view style="margin-top: 10rpx;">
				<span style="color: black;">
					详情:
				</span>
				<span style="color: grey;margin-left: 20rpx;">
					新钢厂散料跨1号起重机主起升制动器故障
				</span>
			</view>
		</view>
		<view style="display: flex;justify-content: space-around;margin-top: 20rpx;">
			<u-button style="font-size: 30rpx;padding: 30rpx;" @click="gzyy" type="warning" size="mini">原因</u-button>
			<u-button style="font-size: 30rpx;padding: 30rpx;" @click="gzjjfa" type="success" size="mini">解决方案</u-button>
			<!-- <u-button style="font-size: 30rpx;padding: 30rpx;" type="primary" size="mini">历史数据回查</u-button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			gzyy() {
				uni.navigateTo({
					url: "../tab1/gzdetail"
				});
			},
			gzjjfa() {
				uni.navigateTo({
					url: "../tab1/gzdetail"
				});
			}
		},
		onLoad(e) {
		},
		onUnload() {
		}
	}
</script>

<style>

</style>
