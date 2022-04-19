<template>
	<view id="actiondetail" class="content" style="padding: 10rpx;">
		<u-form :model="form" :label-width="165" ref="uForm">
			<u-form-item label="日期">
				<view style="display: flex;">
					<myPickDate dateType="date" :defaultTime="form.dateStart" @selectTime="startDateChange">
					</myPickDate>
					<view style="margin: 0px 40rpx;">至</view>
					<myPickDate dateType="date" :defaultTime="form.dateEnd" @selectTime="endDateChange"></myPickDate>
				</view>
			</u-form-item>
			<u-form-item>
				<view style="display: flex;align-items: center;">
					<u-radio-group v-model="form.bcSelect" style="width: 23%;">
						<u-radio name="bc">
							班次
						</u-radio>
					</u-radio-group>
					<u-input v-model="form.bcName" style="width: 77%;" type="select" @click="bcSelectShow = true" />
				</view>
			</u-form-item>
			<u-form-item>
				<view style="display: flex;align-items: center;">
					<u-radio-group v-model="form.bcSelect" style="width: 23%;">
						<u-radio name="sjd">
							时间段
						</u-radio>
					</u-radio-group>
					<view style="display: flex;width: 77%;">
						<myPickDate dateType="time" :defaultTime="form.timeStart" @selectTime="startTimeChange">
						</myPickDate>
						<view style="margin: 0px 40rpx;">至</view>
						<myPickDate dateType="time" :defaultTime="form.timeEnd" @selectTime="endTimeChange">
						</myPickDate>
					</view>
				</view>
			</u-form-item>
			<view style="display: flex;justify-content: center;">
				<u-button size="default" type="success" @click="initChart"
					style="width: 90%;margin-top: 10rpx;display: block;">查询</u-button>
			</view>
		</u-form>
		<view style="border-top: 2rpx solid #E4E7ED;margin-top: 10rpx;">
		</view>
		<u-cell-item bg-color="#eee" :arrow="arrowFlag" :icon-style="{color: '#f29100'}" @click="goDetail"
			:title-style="{color: '#f29100'}" :value-style="{color: '#f29100'}" icon="bookmark-fill" :value="cellRight">
			<view slot="title">
				<span>{{typeName}}:</span>
				<span style="font-size: 40rpx;font-weight: bold;margin: 0rpx 10rpx;">{{typeCount}}</span>
				<span>次</span>
			</view>
		</u-cell-item>
		<view style="width: 98%;height: 600rpx;margin-top: 40rpx;">
			<qiun-data-charts canvasId="scrollcolumnid" :ontouch="true" :canvas2d="true"
				:opts="{enableScroll:isScroll,xAxis:{rotateLabel:true,scrollShow:true,itemCount:7,disableGrid:true}}"
				type="column" :chartData="chartData" />
		</view>
		<u-select v-model="bcSelectShow" :list="bcList" @confirm="bcSelectChange"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import myPickDate from '../../components/common/myPickDate.vue'
	import {
		Utils
	} from '../../common/utils.js'
	let utils = new Utils()
	export default {
		components: {
			myPickDate
		},
		data() {
			return {
				form: {
					dateStart: '',
					dateEnd: '',
					timeStart: '',
					timeEnd: '',
					bcName: '',
					bcSelect: 'bc'
				},
				bcSelectShow: false,
				bcList: [],
				chartData: {
					categories: [],
					series: [],
				},
				isScroll: false, // 是否开启滚动
				typeName: '未交接班',
				typeValue: 0,
				typeCount: 8,
				qzjId: 0,
				arrowFlag: true, // 是否展示右侧箭头
				cellRight: '详情'
			}
		},
		computed: {},
		methods: {
			goDetail() {
				if (this.typeCount) {
					let data = this.form
					data.type = this.typeValue
					data.craneID = this.qzjId
					data.typeName = this.typeName
					uni.navigateTo({
						url: "./actionlist?data=" + JSON.stringify(data),
					});
				}
			},
			startDateChange(val) {
				this.form.dateStart = val
			},
			endDateChange(val) {
				this.form.dateEnd = val
			},
			startTimeChange(val) {
				this.form.timeStart = val
			},
			endTimeChange(val) {
				this.form.timeEnd = val
			},
			bcSelectChange(val) {
				if (val[0].value === 'all') {
					this.form.timeStart = '00:00:00'
					this.form.timeEnd = '23:59:59'
				} else {
					this.form.timeStart = val[0].extra[0]
					this.form.timeEnd = val[0].extra[1]
				}
				console.log(this.form.timeStart)
				this.form.bcName = val[0].label
			},
			getBcList() {
				let p = {
					pid: 'all',
					pageSize: 100,
					pageIndex: 1
				}
				this.bcList = [{
					value: 'all',
					label: '全天',
					extra: []
				}]
				this.$myHttp('HiddenDanger/SelectClassesSetting', p).then(res => {
					for (let item of res.Data) {
						this.bcList.push({
							value: item.ClassNum,
							label: item.ClassName + '(' + item.StartTime + '-' + item.EndTime + ')',
							extra: [item.StartTime, item.EndTime]
						})
					}
					this.form.bcName = this.bcList[0].label
				})

			},
			initChart() {
				let start = this.form.dateStart + ' ' + this.form.timeStart
				let end = this.form.dateEnd + ' ' + this.form.timeEnd
				let timeStr = new Date(end).getTime() - new Date(start).getTime()
				if (timeStr > 30 * 24 * 60 * 60 * 1000) {
					this.$refs.uToast.show({
						title: '查询时间跨度不能超过30天',
						type: 'error',
					})
					return
				}
				const p = {
					type: this.typeValue,
					craneID: this.qzjId,
					startDate: this.form.dateStart,
					endDate: this.form.dateEnd,
					startTime: this.form.timeStart,
					endTime: this.form.timeEnd
				}
				this.chartData.categories = []
				this.chartData.series = [{
					"name": this.typeName,
					"data": []
				}]
				this.typeCount = 0
				this.$myHttp('HiddenDanger/SelectCountHiddenDangerByType', p).then(res => {
					console.log(res)
					for (let item of res.Data) {
						this.chartData.categories.push(item.date.substr(0, 10))
						this.chartData.series[0].data.push(item.count)
						this.typeCount += item.count
					}
					if (this.chartData.categories.length > 7) {
						this.isScroll = true
					}
					if (this.typeCount) {
						this.arrowFlag = true
						this.cellRight = '详情'
					} else {
						this.arrowFlag = false
						this.cellRight = ''
					}
				})
			}
		},
		onLoad(val) {
			let temp = JSON.parse(val.data)
			this.typeName = temp.type
			this.typeValue = temp.typeValue
			this.qzjId = val.qzjId
			// 默认查看进7天故障和隐患
			this.form.dateStart = utils.subMinuteToTime(60 * 24 * 6).substr(0, 10)
			this.form.dateEnd = utils.getDateTime().substr(0, 10)
			this.form.timeStart = '00:00:00'
			this.form.timeEnd = '23:59:59'
			this.getBcList()
			this.initChart()
		}
	}
</script>

<style lang="scss">
	#actiondetail {
		.u-form-item {
			padding: 10rpx 0;
		}

		.u-cell__right-icon-wrap {
			color: #f29100;
		}
	}
</style>
