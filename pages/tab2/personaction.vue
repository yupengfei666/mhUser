<template>
	<view id="personaction" class="content" style="padding: 20rpx;">
		<view style="display: flex;align-items: center;margin-top: 10rpx;">
			<image src="../../static/img/work/qzj.png" style="width: 15%;margin-left: 2%;" mode="widthFix"></image>
			<u-input v-model="qzjName" style="margin-left: 2%;font-size: 40rpx;width: 85%;" type="select"
				@click="qzjSelectShow = true" />
		</view>
		<view style="margin-top: 20rpx;">最近7天</view>
		<view style="margin-top: 10rpx;background-color: #93C501;color: white;border-radius: 8rpx;padding: 80rpx;">
			【有效运行时间】模块正在开发中。。。
		</view>
		<u-grid :col="3" style="margin-top: 10rpx;">
			<u-grid-item v-for="(item,index) in typeList" @click="clickGrid(item)">
				<view>
					<span style="font-size: 46rpx;font-weight: bold;">{{item.count}}</span>
					<span style="margin-left: 8rpx;">次</span>
				</view>
				<view class="grid-text">{{item.type}}</view>
			</u-grid-item>
		</u-grid>
		<u-select v-model="qzjSelectShow" :list="qzjList" @confirm="qzjSelectChange">
		</u-select>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		Utils
	} from '../../common/utils.js'
	let utils = new Utils()
	export default {
		components: {},
		data() {
			return {
				qzjName: '',
				qzjId: '',
				qzjSelectShow: false,
				qzjList: [],
				typeList: [],
				timer: ''
			}
		},
		computed: {},
		methods: {
			clickGrid(val) {
				clearInterval(this.timer)
				uni.navigateTo({
					url: './actiondetail?data=' + JSON.stringify(val) + '&qzjId=' + this.qzjId,
				});
			},
			qzjSelectChange(val) {
				this.qzjId = val[0].value
				this.qzjName = val[0].label
				this.intervalData()
			},
			getTypeList() {
				let startTime = utils.subMinuteToTime(60 * 24 * 7)
				let endTime = utils.getDateTime()
				startTime = startTime.substr(0, 10)
				endTime = endTime.substr(0, 10)
				const p = {
					craneID: this.qzjId,
					startDate: startTime,
					endDate: endTime,
					startTime: '00:00:00',
					endTime: '23:59:59'
				}
				this.$myHttp('HiddenDanger/SelectCountHiddenDanger', p).then(res => {
					this.typeList = []
					for (let item of res.Data) {
						this.typeList.push({
							count: item.count,
							type: item.name,
							typeValue: item.type
						})
					}
				})
			},
			getQzjList() {
				const data = {
					SessionId: uni.getStorageSync('password')
				}
				this.$myHttp('WaterData/CraneInfo', data).then(res => {
					if (!res.cranes) {
						return
					}
					const cranes = res.cranes
					this.qzjList = []
					for (let item of cranes) {
						this.qzjList.push({
							value: item.ID,
							label: item.起重机名称
						})
					}
					this.qzjId = this.qzjList[0].value
					this.qzjName = this.qzjList[0].label
					this.intervalData()
				})
			},
			intervalData() {
				if (this.timer) {
					clearInterval(this.timer)
				}
				this.getTypeList()
				this.timer = setInterval(() => {
					this.getTypeList()
				}, 10 * 1000)
			}
		},
		onShow() {
			if (this.qzjId) {
				console.log(345)
				this.intervalData()
			}
		},
		onLoad() {
			console.log(111)
			this.getQzjList()
		}
	}
</script>

<style lang="scss">
	#personaction {
		.u-input__input {
			font-size: 40rpx;
		}

		.u-grid {
			background-color: #FFAF1A;
			border-radius: 8rpx;
			color: white;
		}

		.u-grid-item-box {
			background-color: #FFAF1A;
		}
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
	}
</style>
