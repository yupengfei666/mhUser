<template>
	<view style="padding: 15rpx;background-color: #eaeffc;width: 100vw;" id="agent_n">
		<view :style="{backgroundColor: qzjBackground}"
			style="display: flex;align-items: center;padding: 20rpx;border-radius: 8rpx;">
			<image src="../../static/img/work/qzj_tm.png" style="width: 15%;" mode="widthFix"></image>
			<u-input v-model="qzjName" style="margin-left: 2%;font-size: 40rpx;width: 85%;" type="select"
				@click="qzjSelectShow = true" />
		</view>
		<u-tabs :list="jgList" :current="current" @change="tabChange" style="margin-top: 20rpx;"></u-tabs>
		<u-loading v-if="loading" style="margin-top: 45%;margin-left: 49.5%;" mode="circle" size="36" color="green">
		</u-loading>
		<view v-else>
			<!-- 总览 start -->
			<view v-if="jgId === 'all'">
				<!-- 起重机重要信息 start -->
				<view
					style="color: white;background-color: #4f77e1;padding: 20rpx;border-radius: 8rpx;margin: 20rpx 0rpx;">
					<view
						style="font-weight: bold;font-size: 30rpx;border-bottom: 2rpx solid white;padding-bottom: 10rpx;">
						{{qzjImportName}}
					</view>
					<view style="margin-top: 10rpx;">
						<u-row gutter="22">
							<u-col span="6" v-for="agent in qzjImportAgentList" :key="agent.ID"
								style="margin-top: 10rpx;">
								<view style="display: flex;justify-content: space-between;">
									<view>{{agent.NodeConfig.ShowName}}</view>
									<view style="font-weight: bold;">
										<agentValue :agent="agent"></agentValue>
									</view>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<!-- 起重机重要信息 end -->
				<!-- 机构主要运行信息 start -->
				<uni-collapse ref="collapseU">
					<uni-collapse-item :open="true">
						<template v-slot:title>
							<view style="background-color: #4f77e1;color: white;padding: 20rpx;">
								机构主要运行信息
							</view>
						</template>
						<view v-for="item in jgAgentList" :key="item.ID" style="height: auto">
							<view
								style="display: flex;background-color: white;align-items: center;border-bottom: 2rpx solid  #D9D9D9;">
								<view style="width: 38%;text-align: center;">
									<span
										style="color: #4f77e1;font-size: 30rpx;border: 2rpx solid #4f77e1;padding: 4rpx 16rpx;">
										{{item.NodeConfig.ShowName}}
									</span>
								</view>
								<view style="width: 62%;box-sizing: border-box;padding-right: 8rpx;">
									<agentInfoShow :showAll="false" :qzjName="qzjName"
										:jgName="item.NodeConfig.ShowName" :agentData="item.importArr[0].LeafsArr">
									</agentInfoShow>
								</view>
							</view>
						</view>
					</uni-collapse-item>
					<uni-collapse-item>
						<template v-slot:title>
							<view style="background-color: #4f77e1;color: white;padding: 20rpx;">
								性能信息
							</view>
						</template>
						<view>asfa</view>
					</uni-collapse-item>
					<!-- 实时故障 -->
					<alarmCollapseItem :alarmList="alarmList"></alarmCollapseItem>
				</uni-collapse>
				<!-- 机构主要运行信息 end -->
			</view>
			<!-- 总览 end -->
			<!-- 机构分览 start -->
			<view v-else style="margin-top: 20rpx;">
				<!-- 具体机构主要信息 start -->
				<view style="background-color: white;">
					<view style="display: flex;">
						<view style="width: 33.3%;text-align: center;margin-top: 6rpx;"
							v-for="(item,index) in oneJg.importShow" :key="item.ID">
							<view :class="[index !== 2 ? 'box-right' : '']" style="font-size: 56rpx;color: #4f77e1;">
								<agentValue :agent="item"></agentValue>
							</view>
							<view style="color: #48adf1;">
								{{item.NodeConfig.ShowName}}
							</view>
						</view>
					</view>
					<view v-if="oneJg.importInit.length > 3" @click="goMore"
						style="color: #007AFF;text-align: right;margin-right: 20rpx;margin-bottom: 8rpx;">
						更多
					</view>
				</view>
				<u-subsection @change="sectionChange" active-color="#18b566" :list="jgSubsection.list" :current="jgSubsection.current" mode="subsection"></u-subsection>
				<!-- 具体机构主要信息 end -->
				<view style="margin-top: 8rpx;">
					<!-- 变量视图 start -->
					<uni-collapse v-if="jgSubsection.current === 0" ref="collapseJg">
						<uni-collapse-item v-for="item in oneJg.agentList" :key="item.ID">
							<template v-slot:title>
								<view style="background-color: #4f77e1;color: white;padding: 20rpx;">
									{{item.NodeConfig.ShowName}}
								</view>
							</template>
							<view>
								<agentInfoShow :agentData="item.LeafsArr">
								</agentInfoShow>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<!-- 变量视图 end -->
					<!-- 设备视图 start -->
					<uni-collapse v-else ref="collapseDevice">
						<uni-collapse-item v-for="item in oneJg.deviceList" :key="item.id">
							<template v-slot:title>
								<view style="background-color: #4f77e1;color: white;padding: 20rpx;">
									{{item.name}}
								</view>
							</template>
							<view style="padding: 10rpx;">
								<view v-for="itemT in item.child" :key="itemT.id" style="border: 2rpx solid #4f77e1;padding: 10rpx;">
									<view @click="goDeviceInfo(itemT)" style="color: #4f77e1;font-size: 30rpx;border-bottom: 2rpx solid #DCDFE6;
									padding-bottom: 6rpx;margin-bottom: 6rpx;">{{itemT.name}}</view>
									<view>12</view>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<!-- 设备视图 end -->
				</view>
			</view>
			<!-- 机构分览 end -->

		</view>
		<u-select v-model="qzjSelectShow" :list="qzjList" @confirm="qzjSelectChange">
		</u-select>
	</view>
</template>

<script>
	import agentInfoShow from '../../components/common/agentInfoShow.vue'
	import agentValue from '../../components/common/agentValue.vue'
	import alarmCollapseItem from '../../components/common/alarmCollapseItem.vue'
	export default {
		data() {
			return {
				jgSubsection: {
					list:[{
						name: '变量视图'
					},
					{
						name: '设备视图'
					}],
					current: 0
				},
				craneId: 0,
				jgId: 0,
				qzjName: '',
				jgName: '',
				qzjSelectShow: false,
				jgList: [],
				qzjList: [],
				current: 0,
				oneJg: {
					agentList: [],
					importInit: [],
					importShow: [],
					deviceList: []
				},
				qzjImportAgentList: [],
				jgAgentList: [],
				qzjImportName: '',
				loading: false,
				timer: null,
				alarmNodeId: 0,
				alarmList: [],
				initLoad: true,
				qzjBackground: '#48adf1'
			};
		},
		components: {
			agentInfoShow,
			agentValue,
			alarmCollapseItem
		},
		methods: {
			goDeviceInfo(data) {
				uni.navigateTo({
					url: "../tab1/bccshow?info=" + JSON.stringify(data)
				});
			},
			sectionChange(index) {
				this.jgSubsection.current = index
				if (index === 1) {
					this.getDeviceGroup()
				}
			},
			getDeviceGroup() {
				this.oneJg.deviceList = [
					{
						id: 1,
						name: '驱控设备',
						child: [
							{
								id: 10,
								name: '1#10bcc设备',
								child: [
									{
										name: '给定档位',
										value: '2档'
									}
								]
							}
						]
					}
				]
			},
			goMore() {
				uni.navigateTo({
					url: "../tab1/agentdetail?agent=" + JSON.stringify(this.oneJg.importInit) +
						`&qzjName=${this.qzjName}&jgName=${this.jgName}`
				});
			},
			getAllAlarmId() {
				let p = {
					cid: this.craneId,
					Tags: JSON.stringify(["alarm"]),
					toLevel: 3,
					cal: 0
				}
				// 起重机重要信息:c_mechanism + 机构重要信息:mechanism
				this.$myHttp('AgentTree/GetNodesByTag', p).then(res => {
					this.alarmNodeId = res[0].ID
					this.getAllAlarm()
				})
			},
			getAllAlarm() {
				let p = {
					CID: this.craneId,
					NID: this.alarmNodeId,
					Prioritys: JSON.stringify([2, 3, 4]),
					LastMinite: 0
				}
				// 起重机重要信息:c_mechanism + 机构重要信息:mechanism
				this.$myHttp('Alarm/GetRealAlarmsByNode', p).then(res => {
					for (let item of res) {
						item['时间'] = item['时间'].substr(0, 19)
						item['清除时间'] = item['清除时间'] ? item['清除时间'].substr(0, 19) : ''
					}
					this.alarmList = res
					this.qzjBackground = this.alarmList.length > 0 ? '#feb837' : '#48adf1'
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
						if (item.ID === this.craneId) {
							this.qzjName = item.起重机名称
						}
					}
				})
			},
			qzjSelectChange(val) {
				this.craneId = val[0].value
				this.qzjName = val[0].label
				this.initLoad = true
				this.initAgentGroup()
			},
			tabChange(index) {
				this.current = index;
				for (let item of this.jgList) {
					if (this.current == item.index) {
						this.jgId = item.value
						this.jgName = item.name
						break
					}
				}
				this.oneJg.agentList = []
				for (let item of this.jgAgentList) {
					if (item.ID === this.jgId) {
						this.oneJg.agentList = item.commonArr
						this.oneJg.importInit = item.importArr[0].LeafsArr
						this.oneJg.importShow = this.oneJg.importInit.length > 3 ? this.oneJg.importInit.slice(0, 3) : this
							.oneJg.importInit
						break
					}
				}
			},
			initAgentGroup() {
				this.timer && clearInterval(this.timer);
				this.loading = true
				this.getJgList()
				this.getAllAlarmId()
				this.timer = setInterval(() => {
					this.getJgList()
					this.getAllAlarm()
				}, 10000);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			doAgentOrder(data) {
				let result = []
				for (let item of data) {
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
					result.push(item)
				}
				return result
			},
			getJgList() {
				let p = {
					cid: this.craneId,
					Tags: JSON.stringify(['mechanism', 'c_mechanism']),
					toLevel: 0,
					cal: 1
				}
				// 起重机重要信息:c_mechanism + 机构重要信息:mechanism
				this.$myHttp('AgentTree/GetNodesByTag', p).then(res => {
					let jgListTemp = []
					let jgAgentListTemp = []
					jgListTemp.push({
						name: '总览',
						index: 0,
						value: 'all'
					})
					for (let i in res) {
						// 起重机主要信息
						if (res[i].NodeConfig.Tag === 'c_mechanism') {
							this.qzjImportName = res[i].NodeConfig.ShowName
							let temp = this.doAgentOrder([res[i].Childs[0]])
							this.qzjImportAgentList = temp[0].LeafsArr
						} else {
							// 机构信息
							jgAgentListTemp.push(res[i])
							jgListTemp.push({
								name: res[i].NodeConfig.ShowName,
								index: i * 1 + 1,
								value: res[i].NodeConfig.ID
							})
						}
					}
					for (let item of jgAgentListTemp) {
						item.Childs = this.doAgentOrder(item.Childs)
						item.importArr = []
						item.commonArr = []
						for (let agentItem of item.Childs) {
							// 机构主要信息
							if (agentItem.NodeConfig.Tag === 'outline') {
								item.importArr.push(agentItem)
							}
							// 机构分组信息
							if (agentItem.NodeConfig.Tag === 'common') {
								item.commonArr.push(agentItem)
							}
						}
					}
					this.jgList = jgListTemp
					if (!this.jgId) {
						this.jgId = this.jgList[0].value
					}
					this.jgAgentList = jgAgentListTemp
					console.log(111)
					console.log(this.jgAgentList)
					this.loading = false
					if (this.initLoad) {
						this.$nextTick(() => {
							this.$refs.collapseU.resize();
							this.initLoad = false
						});
					}
				})
			}
		},
		onLoad(e) {
			let temp = JSON.parse(e.system)
			this.craneId = temp.起重机ID
			this.getQzjList()
			this.initAgentGroup()
		},
		onHide() {
			console.log(666)
			this.timer && this.clearTimer();
		},
		onUnload() {
			console.log(2323)
			this.timer && this.clearTimer();
		}
	}
</script>

<style lang="scss">
	#agent_n {
		.u-input__input {
			color: white;
			font-size: 36rpx;
		}

		.uni-collapse-item__title.uni-collapse-item-border {
			background-color: #4f77e1;
		}

		.box-right {
			border-right: 4rpx solid #4f77e1;
		}

		.uni-icons {
			color: white !important;
		}

		.u-icon__icon {
			color: white !important;
		}

		.u-time-axis-node {
			background-color: transparent !important;
		}

		.u-time-axis::before {
			border-left-color: #ff7226 !important;
			border-left-width: 2px !important;
			bottom: -10rpx
		}
	}

	.uni-navigate-badge {
		padding-right: 50upx;
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
</style>
