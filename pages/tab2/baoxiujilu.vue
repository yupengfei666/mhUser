<template>
	<view id="baoxiujilu" style="background-color: #EBEEF5;">
		<addButton @click="addClick"></addButton>
		<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view v-if="selectData.length === 0" style="text-align: center;margin-top: 100upx;color:#8a8a8a;">
			———暂无申请单———
		</view>
		<view v-else>
			<u-card style="margin-top: 15rpx;display: block;" v-for="item in selectData">
				<view slot="head">
					<view style="display: flex;justify-content: space-between;">
						<view @click="copyId(item.OrderID)">{{item.OrderID}}</view>
						<view style="color: #2979ff;" @click="detailItem(item)">
							详情
						</view>
					</view>
				</view>
				<view slot="body">
					<image :src="item.imgUrl" style="width: 25%;position: absolute;right: 10%;top:8%" mode="widthFix">
					</image>
					<view style="background-color: #f4f7fc;padding: 10rpx;padding-bottom: 0rpx;">
						<u-tag :text="itemT" v-for="itemT in item.ProductType" type="warning"
							style="margin-right: 10rpx;margin-bottom: 10rpx;display: inline-block;" mode="plain" />
					</view>
					<view
						style="display: flex;justify-content: space-between;height: 80rpx;align-items: center;border-bottom: solid 2rpx #E4E7ED;margin-bottom: 20rpx;">
						<view>上报时间</view>
						<view style="color: #909399;" @click="">
							{{item.RepairsTime}}
						</view>
					</view>
					<view style="text-align: right;position: relative;">
						<u-button v-if="item.RepairsStatus > 0" type="success" size="medium" :plain="true"
							@click="progress(item.OrderID)" style="margin-right: 16rpx;">
							查看进度</u-button>
						<u-button v-if="item.RepairsStatus > 1" type="primary" size="medium" :plain="true"
							@click="rate(item)" style="margin-right: 16rpx;">
							{{item.rateText}}</u-button>
						<u-button v-if="item.RepairsStatus > 0" type="primary" size="medium" :plain="true"
							@click="message(item.OrderID)" style="margin-right: 16rpx;">
							留言</u-button>
						<u-badge v-if="item.MessageNum > 0" type="error" :count="item.MessageNum"
							style="position: absolute;top: -30rpx;"></u-badge>
						<u-button v-if="item.RepairsStatus === 0" type="primary" size="medium" :plain="true"
							@click="updateItem(item.OrderID)" style="margin-right: 16rpx;">
							编辑</u-button>
						<u-button v-if="item.RepairsStatus === 0" type="error" size="medium " :plain="true"
							@click="deleteItem(item.OrderID)" style="">删除</u-button>
					</view>
				</view>
			</u-card>
			<u-loadmore :status="status" :load-text="loadText" @loadmore="getNextData" />
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="showDelete" :show-title="false" @confirm="deleteOk" :show-cancel-button="true"
			content="确定要删除吗？"></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import addButton from '@/components/common/addButton.vue'
	export default {
		components: {
			addButton
		},
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
				showData: [],
				showDetailVisible: false,
				showDelete: false,
				deleteItemId: '',
				tabList: [{
					name: '全部'
				}, {
					name: '未接单',
					count: 1
				}, {
					name: '进行中',
					count: 0
				}, {
					name: '已完成',
				}],
				current: 0
			};
		},
		computed: {},
		methods: {
			copyId(val){
				uni.setClipboardData({
					data: val,
					success: function () {
					}
				});
			},
			// 0 全部 1 未接单 2 进行中 3 已完成
			change(index) {
				this.current = index;
				this.initData()
			},
			deleteOk() {
				let p = {
					OrderID: this.deleteItemId
				}
				this.$myHttp('Order/DeleteOrder', p).then(res => {
					this.$refs.uToast.show({
						title: '删除成功',
						type: 'success'
					})
					this.getStaticsCount()
					this.initData()
				})
			},
			deleteItem(val) {
				this.deleteItemId = val
				this.showDelete = true
			},
			detailItem(data) {
				data.Describe = encodeURIComponent(data.Describe)
				console.log(data)
				uni.navigateTo({
					url: "../tab2/baoxiudetail?data=" + JSON.stringify(data)
				});
			},
			showDetail(val) {
				this.showData = val
				this.showDetailVisible = true
			},
			message(id) {
				uni.navigateTo({
					url: "../tab2/bxmessage?id=" + id
				})
			},
			rate(data) {
				uni.navigateTo({
					url: "../tab2/bxrate?data=" + JSON.stringify(data)
				})
			},
			progress(id) {
				uni.navigateTo({
					url: "../tab2/bxtimeline?id=" + id
				})
			},
			updateItem(val, type = 'edit') {
				uni.navigateTo({
					url: "../tab2/baoxiuadd?id=" + val + '&type=' + type
				});
			},
			addClick() {
				uni.navigateTo({
					url: "../tab2/baoxiuadd?id=" + ''
				});
			},
			lookPicture(val) {
				console.log(val)
				uni.navigateTo({
					url: "../tab2/picture"
				});
			},
			getData() {
				let p = {
					OrderID: 'all',
					pageSize: this.pageCount,
					pageIndex: this.pages
				}
				if (this.current !== 0) {
					p.repairsStatus = this.current - 1
				}
				this.$myHttp('Order/SelectOrder', p).then(res => {
					console.log(res)
					for (let item of res.Data) {
						// 按工单状态分类 0 未接单 1进行中 2已完成
						if (item.RepairsStatus === 0) {
							item.imgUrl = '../../static/img/work/wjd.png'
						} else if (item.RepairsStatus === 1) {
							item.imgUrl = '../../static/img/work/jxz.png'
						} else {
							item.imgUrl = '../../static/img/work/ywc.png'
						}
						item.rateText = item.IsComment ? '已评价' : '评价'
						item.ProductType = JSON.parse(item.ProductType || '[]')
						this.selectData.push(item)
					}
					this.status = this.selectData.length === res.Total ? 'nomore' : 'loadmore'
				})
				uni.stopPullDownRefresh();
			},
			getStaticsCount() {
				this.$myHttp('Order/SelectCurrentUserOrder').then(res => {
					this.tabList[1].count = res.Data[0].StatusIs0
					this.tabList[2].count = res.Data[0].StatusIs1
				})
			},
			initData() {
				this.selectData = []
				this.pages = 1;
				this.getData();
			},
			getNextData(){
				this.pages = this.pages + 1;
				this.status = 'loading'
				this.getData();
			}
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			this.getNextData()
		},
		onReady() {},
		onShow() {
			this.initData()
			this.getStaticsCount()
		},
		onLoad(e) {}
	}
</script>

<style lang="scss">
	#baoxiujilu {
		width: 100%;

		.card-item {
			display: flex;
			margin-bottom: 16rpx;
		}
	}

	.u-size-medium {
		padding: 0px 50rpx !important;
	}

	.card-item-show {
		display: flex;
		padding: 16rpx;

		:nth-child(1) {
			width: 25%;
			color: #686868
		}

		:nth-child(2) {
			width: 75%;
			text-align: right;
		}
	}
</style>
