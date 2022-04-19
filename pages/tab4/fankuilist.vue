<template>
	<view class="content" style="padding: 10rpx;width: 100%;">
		<view @click="goDetail(item.init)" v-for="(item,index) in selectData" style="border-bottom: 2rpx solid #DCDFE6;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="width: 80%;">
					<view
						style="height: 90rpx;line-height: 90rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
						{{item.title}}
					</view>
					<view style="margin-left: 20rpx;color:#909399;margin-bottom: 10rpx;">
						{{item.time}}
					</view>
				</view>
				<view style="width: 20%;text-align: right;color: #909399;">{{item.status}}</view>
			</view>
		</view>
		<u-loadmore :status="status" :load-text="loadText" @loadmore="getNextData" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: "loadmore",
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				selectData: [],
				pageCount: 10,
				pages: 1,
				doType: {}
			}
		},
		computed: {},
		methods: {
			goDetail(val){
				console.log(val)
				uni.navigateTo({
					url: "./fankuidetail?data=" + JSON.stringify(val)
				});
			},
			getNextData() {
				this.pages = this.pages + 1;
				this.status = 'loading'
				this.getData();
			},
			initData() {
				this.selectData = []
				this.pages = 1;
				this.getData();
			},
			getDoType() {
				const p = {
					pageIndex: 1,
					pageSize: 1000,
					dict_id: 'c188901f-8b66-4237-a688-139a9aff3f7c'
				}
				this.doType = {}
				this.$myHttp('Dict/SelectSysDictTree', p).then(res => {
					for (let item of res) {
						this.doType[item.value] = item.name
					}
					this.initData()
				})
			},
			getData() {
				const p = {
					isCustom: true,
					pid: 'all',
					pageSize: this.pageCount,
					pageIndex: this.pages
				}
				this.$myHttp('CustomerService/SelectFeedback', p).then(res => {
					for (let item of res.Data) {
						this.selectData.push({
							title: '【' + item.Type + '】' + item.Content,
							status: this.doType[item.Status],
							time: item.CreateTime,
							init: item
						})
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
		onShow() {
			this.getDoType()
		},
		onLoad() {
		}
	}
</script>

<style>
</style>
