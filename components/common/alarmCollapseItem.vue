<template>
	<!-- 报警折叠面板 -->
	<view id="alarmCollapseItem" style="width: 100%;">
		<uni-collapse-item id="alarmCI" v-if="alarmList.length > 0">
			<template v-slot:title>
				<view style="background-color: #feb837;color: white;padding: 20rpx;">
					实时故障
				</view>
			</template>
			<view style="background-color: white;padding: 8rpx;">
				<view
					style="background-color: #ffe1ab;padding: 14rpx;margin-bottom: 8rpx;border-radius: 10rpx;"
					v-for="item in alarmList" :key="item['故障编码']">
					<view
						style="display: flex;border-bottom: 2rpx solid #aaa397;padding-bottom: 10rpx;margin-bottom: 10rpx;">
						<view style="width: 48%;">
							<view>故障名称</view>
							<view style="margin-top: 8rpx;font-size: 30rpx;font-weight: bold;">
								{{item['含义解析']}}
							</view>
						</view>
						<view style="width: 52%;box-sizing: border-box;padding-left: 36rpx;">
							<u-time-line>
								<u-time-line-item nodeTop="2">
									<template v-slot:node>
										<view
											style="background-color: #ff7226;color: white;border-radius: 20rpx;padding: 5rpx 16rpx;">
											发生
										</view>
									</template>
									<template v-slot:content>
										<view>
											<view style="margin-left: 10rpx;">{{item['时间']}}</view>
										</view>
									</template>
								</u-time-line-item>
								<u-time-line-item>
									<template v-slot:node>
										<view
											style="background-color: #98cb00;color: white;border-radius: 20rpx;padding: 5rpx 16rpx;">
											解除
										</view>
									</template>
									<template v-slot:content>
										<view>
											<view style="margin-left: 10rpx;">{{item['清除时间']}}</view>
										</view>
									</template>
								</u-time-line-item>
							</u-time-line>
						</view>
					</view>
					<view>
						详情：1跨#车-主起升-10BCC
					</view>
					<view style="margin-top: 10rpx;text-align: right;">
						<u-button size="mini" type="primary">原因</u-button>
						<u-button size="mini" type="primary" style="margin-left: 20rpx;">解决方案</u-button>
						<u-button size="mini" type="primary" style="margin-left: 20rpx;">历史数据查询</u-button>
					</view>
				</view>
			</view>
		</uni-collapse-item>
	</view>
</template>

<script>
	export default {
		name: 'alarmCollapseItem',
		props: {
			alarmList: {
				type: Array,
				default: function() {
					return []
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

<style lang="scss">
	#alarmCI {
		.uni-collapse-item__title.uni-collapse-item-border {
			background-color: #feb837;
		}
	}
</style>
