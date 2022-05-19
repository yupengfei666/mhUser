<template>
	<view style="width: 100vw;">
		<u-tabs :list="jgList" :current="current" @change="change"></u-tabs>
		<view style="padding: 10rpx;display: flex;justify-content: center;">
			<u-loading style="margin-top: 40%;" v-if="loading" mode="circle" size="36" color="green"></u-loading>
			<u-collapse v-else :head-style="{textShadow: 'gray 0 0 2rpx'}" style="width: 100%;">
				<u-collapse-item :title="item.NodeConfig.ShowName" v-for="(item, index) in agentList" :key="index">
					<view v-for="agent in item.LeafsArr" :key="agent.ID"
						style="color: black;display: flex;justify-content: space-between;padding: 10rpx;">
						<view>
							{{agent.NodeConfig.ShowName}}
						</view>
						<view style="font-weight: bold;">
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
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				craneId: 0,
				jgId: 0,
				jgList: [],
				current: 0,
				agentList: [],
				loading: false,
				timer: null
			};
		},
		methods: {
			change(index) {
				console.log(index)
				console.log(this.jgList)
				this.current = index;
				for (let item of this.jgList) {
					if (this.current == item.index){
						this.jgId = item.value
						break
					} 
				}
				this.initAgentGroup()
			},
			initAgentGroup(){
				this.timer && clearInterval(this.timer);
				this.loading = true
				this.getAgentGroup();
				this.timer = setInterval(() => {
					this.getAgentGroup();
				}, 10000);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			getAgentGroup() {
				let p = {
					cid: this.craneId,
					Nid: this.jgId,
					toLevel: 0,
					cal: 1
				}
				this.$myHttp('AgentTree/GetNodesByID', p).then(res => {
					this.agentList = []
					for (let item of res.Childs) {
						// 排序
						let leafOrder = JSON.parse(item.NodeConfig.Options || '{}')
						let objLeafByID = {}
						for (let aItem of item.Leafs) {
							objLeafByID[aItem.ID] = aItem
							aItem.optionsObj = JSON.parse(aItem.NodeConfig.Options || '{}')
						}
						if (leafOrder.leafOrder && item.Leafs.length === leafOrder.leafOrder.length) {
							let leafsArrOrder = []
							for (let i of leafOrder.leafOrder) {
								leafsArrOrder.push(objLeafByID[i])
							}
							item.LeafsArr = leafsArrOrder
						} else {
							item.LeafsArr = item.Leafs
						}
						if (item.NodeConfig.Tag === 'common' || item.NodeConfig.Tag === 'important') {
							this.agentList.push(item)
						}
					}
					this.loading = false
				})
			},
			getJgList() {
				let p = {
					cid: this.craneId,
					Tags: JSON.stringify(['mechanism']),
					toLevel: 2,
					cal: 0
				}
				this.jgList = []
				this.$myHttp('AgentTree/GetNodesByTag', p).then(res => {
					console.log(res)
					for (let i in res) {
						this.jgList.push({
							name: res[i].NodeConfig.ShowName,
							index: i,
							value: res[i].NodeConfig.ID
						})
					}
					this.jgId = this.jgList[0].value
					this.initAgentGroup()
				})
			}
		},
		onLoad(e) {
			let temp = JSON.parse(e.system)
			this.craneId = temp.起重机ID
			this.getJgList()
		},
		onUnload() {
			console.log(222)
			this.timer && this.clearTimer();
		}
	}
</script>

<style>
	.swiper-box {
		width: 700upx;
		height: 400upx;
	}

	.swiper-item {
		width: 700upx;
		height: 400upx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.uni-navigate-badge {
		padding-right: 50upx;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50px;
	}

	.ul {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}

	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 15%;
		background-color: #eee;
	}

	.nav-left-item {
		border-bottom: solid 2px white;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 85%;
		padding-left: 10upx;
	}

	.nav-right-item {
		border-bottom: solid 2px #D9D9D9;
		width: 100%;
		height: 150upx;
		float: left;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.nav-right-item image {
		width: 100upx;
		height: 150upx;
	}

	.active {
		color: #007AFF;
		background-color: white;
	}
</style>
