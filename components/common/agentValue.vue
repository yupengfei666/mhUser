<template>
	<!-- 展现agentvalue的表现形式 -->
	<view id="agentValue" style="width: 100%;">
		<span
			v-if="(agent.optionsObj.TrueText || agent.optionsObj.FalseText) && agent.val === '0'">{{agent.optionsObj.FalseText}}</span>
		<span
			v-else-if="(agent.optionsObj.TrueText || agent.optionsObj.FalseText) && agent.val === '1'">{{agent.optionsObj.TrueText}}</span>
		<span v-else-if="agent.optionsObj.agentType === 'Digital' && agent.val === '1'"
			style="width: 40rpx;height: 40rpx;display: inline-block;border-radius: 50%;"
			:style="{ backgroundColor: agent.optionsObj.TureColor}"></span>
		<span v-else-if="agent.optionsObj.agentType === 'Digital' && agent.val === '0'"
			style="width: 40rpx;height: 40rpx;display: inline-block;border-radius: 50%;"
			:style="{ backgroundColor: agent.optionsObj.FalseColor}"></span>
		<span v-else>{{(agent.val * 1).toFixed(agent.optionsObj.小数点位数)}}
			{{agent.optionsObj["单位"]}}</span>
	</view>
</template>

<script>
	export default {
		name: 'agentValue',
		props: {
			agent: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style>
</style>
