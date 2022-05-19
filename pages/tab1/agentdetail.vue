<template>
	<view style="width: 100vw;padding: 10rpx;">
		<view style="color: #3a98fa;font-weight: bold;">
			<view style="font-size: 36rpx;">
				{{qzjName}}
			</view>
			<view style="font-size: 30rpx;border-bottom: 2rpx solid #3a98fa;padding-bottom: 20rpx;">
				{{jgName}}
			</view>
		</view>
		<agentInfoShow :agentData="agentData"></agentInfoShow>
	</view>
</template>

<script>
	import agentInfoShow from '../../components/common/agentInfoShow.vue'
	export default {
		data() {
			return {
				agentData: [],
				qzjName: '',
				jgName: ''
			};
		},
		components: {
			agentInfoShow
		},
		methods: {
		},
		onLoad(e) {
			console.log(e)
			this.agentData = JSON.parse(e.agent)
			this.qzjName = e.qzjName
			this.jgName = e.jgName
		},
		onUnload() {
		}
	}
</script>

<style>
</style>
