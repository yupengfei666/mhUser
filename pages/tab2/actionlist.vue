<template>
	<!-- 故障和隐患 -->
	<view id="actionList" class="content">
		<view style="background-color: #f4f4f5;font-size: 32rpx;height: 100vh;">
			<view v-for="item in selectData"
				style="margin: 15rpx;background-color: white;border-radius: 10rpx;padding: 15rpx;">
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 25%;">
						发生时间
					</view>
					<view style="width: 75%;">
						{{item.OccurTime}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;margin-bottom: 10rpx;">
					<view style="width: 25%;">
						隐患名称
					</view>
					<view style="width: 75%;">
						{{item.HiddenDangerName}}
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 25%;">
						详情
					</view>
					<view style="width: 75%;">
						<view v-if="item.detail.length === 1" style="display: flex;justify-content: space-between;">
							<view style="width: 48%;">
								{{item.detail[0].key}}
							</view>
							<view style="width: 48%;">
								{{item.detail[0].value}}
							</view>
						</view>
						<u-collapse v-else>
							<u-collapse-item>
								<view slot="title" style="width: 100%;">
									<view style="display: flex;justify-content: space-between;">
										<view style="width: 48%;">
											{{item.head.key}}
										</view>
										<view style="width: 48%;">
											{{item.head.value}}
										</view>
									</view>
								</view>
								<view v-for="dItem in item.body" :key="dItem" style="color: #303133;display: flex;justify-content: space-between;">
									<view style="width: 48%;">
										{{dItem.key}}
									</view>
									<view style="width: 48%;">
										{{dItem.value}}
									</view>
								</view>
							</u-collapse-item>
						</u-collapse>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :load-text="loadText" @loadmore="getNextData" />
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				status: "loadmore",
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				pageCount: 10,
				pages: 1,
				selectData: [],
				form: {}
			}
		},
		computed: {},
		methods: {
			getNextData(){
				this.pages = this.pages + 1;
				this.status = 'loading'
				this.getData();
			},
			initData() {
				this.selectData = []
				this.pages = 1;
				this.getData();
			},
			getData() {
				const p = {
					type: this.form.type,
					craneID: this.form.craneID,
					startDate: this.form.dateStart,
					endDate: this.form.dateEnd,
					startTime: this.form.timeStart,
					endTime: this.form.timeEnd,
					pageSize: this.pageCount,
					pageIndex: this.pages
				}
				let bodyT = []
				this.$myHttp('HiddenDanger/SelectHiddenDanger', p).then(res => {
					console.log(111)
					console.log(res)
					for (let item of res.Data) {
						let tempDetail = JSON.parse(item.HiddenDangerDetail)
						item.detail = []
						for (let dItem of tempDetail) {
							let resultTemp = dItem.split('@')
							item.detail.push({
								key: resultTemp[0],
								value: resultTemp[1] ? resultTemp[1] : '',
							})
						}
						if (item.detail.length > 1) {
							for (let index in item.detail) {
								if (index == 0) {
									item.head = item.detail[index] // 折叠面板头
								} else {
									bodyT.push(item.detail[index])
								}
							}
							item.body = bodyT
						}
						this.selectData.push(item)
					}
					this.status = this.selectData.length === res.Total ? 'nomore' : 'loadmore'
					uni.stopPullDownRefresh();
				})
			}
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			this.getNextData()
		},
		onLoad(p) {
			this.form = JSON.parse(p.data)
			uni.setNavigationBarTitle({
				title: this.form .typeName + '列表'
			})
			this.initData()
		}
	}
</script>

<style>
</style>
