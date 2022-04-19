<template>
	<view id="bxtimeline" style="padding: 20rpx;background-color: white;height: 100vh;">
		<u-time-line>
			<u-time-line-item nodeTop="2" v-for="(item,index) in list">
				<template v-slot:node>
					<view>
						<u-icon name="star-fill" color="#4cd964" :size="28"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">{{item.Action}}</view>
						<view class="u-order-desc">{{item.Describe}}</view>
						<view class="u-order-time">{{item.CreateTime}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list:[]
			}
		},
		computed: {},
		methods: {},
		onLoad(val) {
			console.log(val)
			let p = {
				OrderID: val.id,
				pageSize: 100,
				pageIndex: 1
			}
			this.$myHttp('Order/SelectOrderLog', p).then(res => {
				this.list = res.Data
				this.list.reverse()
			})
		}
	}
</script>

<style lang="scss">
	#bxtimeline {
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}

		.u-order-desc {
			margin-top:30rpx;
			color: #606266;
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}

		.u-order-time {
			margin-top:15rpx;
			color: #606266;
			font-size: 26rpx;
		}

		.u-time-axis::before {
			border-left-color: #4cd964 !important;
			border-left-width: 2px !important;
		}
	}
</style>
