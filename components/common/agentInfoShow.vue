<template>
	<view id="agentInfoShow" style="width: 100%;">
		<view v-for="(agent, index) in showData" :key="agent.ID"
			style="color: black;display: flex;justify-content: space-between;padding: 10rpx;">
			<view>
				{{agent.NodeConfig.ShowName}}
			</view>
			<view style="font-weight: bold;">
				<agentValue :agent="agent"></agentValue>
			</view>
		</view>
		<view v-if="showMore" @click="goMore"
			style="color: #007AFF;text-align: right;margin-right: 8rpx;margin-bottom: 4rpx;">
			更多
		</view>
	</view>
</template>

<script>
	import agentValue from './agentValue.vue'
	export default {
		name: 'agentInfoShow',
		props: {
			agentData: {
				type: Array,
				default: function() {
					return []
				}
			},
			showAll: { // 是否展示全部
				type: Boolean,
				default: true
			},
			qzjName: {
				type: String,
				default: ''
			},
			jgName: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				showData: {},
				showMore: false
			}
		},
		components: {
			agentValue
		},
		mounted() {
			this.showData = this.agentData.slice()
			this.doData()
		},
		methods: {
			goMore() {
				uni.navigateTo({
					url: "../tab1/agentdetail?agent=" + JSON.stringify(this.agentData) +
						`&qzjName=${this.qzjName}&jgName=${this.jgName}`
				});
			},
			doData() {
				// 如果不全部展示则最多展示3条 然后点击更多查看
				this.showMore = false
				if (!this.showAll) {
					if (this.showData.length > 3) {
						this.showData = this.showData.slice(0, 3)
						this.showMore = true
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";
</style>
