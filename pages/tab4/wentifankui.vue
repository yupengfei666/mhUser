<template>
	<view style="width: 100vw;">
		<u-search style="margin-top: 10rpx;display: block;" placeholder="请输入内容" v-model="keyword" :action-style="{color: '#18b566'}">
		</u-search>
		<h3 style="margin: 20rpx">常见问题</h3>
		<view style="height: calc(100vh - 235rpx);overflow: auto;">
			<u-cell-group style="margin-bottom: 100rpx;">
				<u-cell-item :title="item.Question" v-for="item in selectData" @click="clickItem(item)"></u-cell-item>
			</u-cell-group>
			<u-loadmore :status="status" :load-text="loadText" @loadmore="getNextData" />
		</view>
		<view style="position: fixed;bottom: 0rpx;width: 100%;">
			<view style="display: flex;justify-content: space-between;">
				<u-button type="primary" style="width: 48vw;" @click="goFkList">我的反馈</u-button>
				<u-button type="success" style="width: 48vw;" @click="goAddFk">我要反馈</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				status: "loadmore",
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				selectData: [],
				pageCount: 10,
				pages: 1,
			}
		},
		computed: {
		},
		methods: {
			clickItem(val) {
				console.log(val)
				val.Content = encodeURIComponent(val.Content)
				uni.navigateTo({
					url: "./helpdetail?data=" + JSON.stringify(val)
				});
			},
			getData() {
				const p = {
					question: this.keyword,
					pid: 'all',
					pageSize: this.pageCount,
					pageIndex: this.pages,
					type: ''
				}
				this.$myHttp('CustomerService/SelectHelpFQA', p).then(res => {
					this.selectData = res.Data
					this.status = this.selectData.length === res.Total ? 'nomore' : 'loadmore'
					uni.stopPullDownRefresh();
				})
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
			goAddFk(){
				uni.navigateTo({
					url: "./addfankui"
				});
			},
			goFkList(){
				uni.navigateTo({
					url: "./fankuilist"
				});
			}
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			// 如果底部有按钮占据空间，则不会触发此钩子
			this.getNextData()
		},
		onShow() {
			this.initData()
		},
		onLoad() {
		}
	}
</script>

<style>
</style>
