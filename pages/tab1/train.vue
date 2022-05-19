<template>
	<!-- 培训模块 -->
	<view id="train" style="padding: 20rpx;background-color: #F1F1F1;width: 100vw;">
		<view style="padding: 20rpx;background-color: white;border-radius: 10rpx;">
			<view style="color: black;">
				基本信息
			</view>
			<view style="color: grey;padding-top: 10rpx;line-height: 45rpx;position: relative;">
				<view>
					名称：{{jbxx.name}}
				</view>
				<view>
					型号：{{jbxx.xh}}
				</view>
				<view>
					序列号：{{jbxx.no}}
				</view>
				<view>
					...
				</view>
			</view>
		</view>
		<u-button type="success" style="margin-top: 20rpx;">安装视频</u-button>
		<view style="background-color: white;padding: 10rpx;margin-top: 20rpx;">
			<u-search placeholder="状态码或名称模糊查询" @custom="getZtm" @search="getZtm" v-model="ztm"></u-search>
			<!-- <u-empty text="暂无搜索结果-" mode="search"></u-empty> -->
			<scroll-view :scroll-y="true" style="height: calc(100vh - 608rpx);margin-top: 10rpx;">
				<u-cell-group>
					<u-cell-item title="1021-转子反馈故障Q1" value="解析"></u-cell-item>
					<u-cell-item title="1023-转子反馈故障Q2" value="解析"></u-cell-item>
					<u-cell-item title="1024-转子反馈故障Q1" value="解析"></u-cell-item>
					<u-cell-item title="1025-转子反馈故障Q1" value="解析"></u-cell-item>
				</u-cell-group>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jbxx: {
					name: '1号10bcc调压调速装置',
					xh: 'THYD-234',
					no: '2342524562'
				},
				ztm: ''
			};
		},
		methods: {

		},
		onLoad() {},
		onUnload() {}
	}
</script>

<style lang="scss">
	#train{
		.u-cell{
			padding: 20rpx 26rpx;
		}
	}
</style>
