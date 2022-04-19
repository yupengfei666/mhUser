<template>
	<view style="width: 100%;">
		<u-swiper :list="info" height="330"></u-swiper>
		<view style="margin-top: 10rpx;">
			<view style="display: flex;align-items: center;">
				<view style="width: 10rpx;height: 40rpx;background-color: #4399fc;margin: 15rpx 15rpx"></view>
				<span>功能列表</span>
			</view>
			<u-row gutter="16">
				<u-col span="3" @click="baoxiu">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/bx.jpg" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">技术支持</span>
				</u-col>
				<u-col span="3" @click="goYhjy">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/yjfk.jpg" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">帮助与反馈</span>
				</u-col>
				<u-col span="3" @click="goDataQuery">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/lscx.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">故障查询</span>
				</u-col>
				<u-col span="3" @click="goPersonAction">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/yygl.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">人员管理</span>
				</u-col>
				<u-col span="3" @click="goTs">
					<view style="display: flex;justify-content: center;">
						<image src="../../static/img/work/ts.png" style="width: 70%;" mode="widthFix"></image>
					</view>
					<span style="display: flex;justify-content: center;margin-top: 10rpx;margin-bottom: 20rpx;">投诉</span>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				info: [{
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=5.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=9.jpg'
				}, {
					image: 'https://www.mhitco.com:9092/api/Image/GetStaticImage?image=7.jpg'
				}]
			};
		},
		components: {
		},
		onShareAppMessage() {
			return {
				title: '分享',
				path: 'pages/main/tab2'
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'functionList'])
		},
		methods: {
			...mapMutations(['logout']),
			goTs(){
				uni.navigateTo({
					url: '../tab2/complaintlist',
				});
			},
			goYhjy() {
				uni.navigateTo({
					url: '../tab4/wentifankui',
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			dianjian() {
				uni.navigateTo({
					url: '../tab2/dianjianjilu',
				});
			},
			goPersonAction() {
				uni.navigateTo({
					url: '../tab2/personaction',
				});
			},
			goDataQuery() {
				uni.navigateTo({
					url: '../tab2/dataquery',
				});
			},
			baoxiu() {
				console.log(222)
				uni.navigateTo({
					url: '../tab2/baoxiujilu',
				});
			},
			renwu() {
				uni.navigateTo({
					url: '../tab2/renwu',
				});
			}
		},
		onShow() {},
		onLoad() {}
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
</style>
