<template>
	<view class="content" style="padding: 10rpx;width: 100%;">
		<view style="margin-bottom: 10rpx;font-weight: bold;color: #2b85e4;">我的投诉</view>
		<view style="height: calc(100vh - 180rpx);overflow: auto;">
			<view v-for="(item,index) in selectData"  @click="goDetail(item.init)"
			style="border-bottom: 2rpx solid #DCDFE6;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="width: 80%;">
						<view style="height: 90rpx;line-height: 90rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
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
		<view style="margin: 10rpx;">
			<u-button type="success" @click="goAdd">我要投诉</u-button>
		</view>
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
				doType:{}
			}
		},
		computed: {},
		methods: {
			goDetail(val){
				uni.navigateTo({
					url: "./complaintdetail?data=" + JSON.stringify(val)
				});
			},
			goAdd(){
				uni.navigateTo({
					url: '../tab2/addcomplaint',
				});
			},
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
			getDoType() {
				const p = {
					pageIndex: 1,
					pageSize: 1000,
					dict_id: 'c847b60e-321d-49f4-b58d-bce000aaf7dd'
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
				this.$myHttp('CustomerService/SelectComplain', p).then(res => {
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
