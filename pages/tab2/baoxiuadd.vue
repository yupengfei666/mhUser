<template>
	<view class="content">
		<u-form :model="form" :error-type="['message']" :label-width="165" ref="uForm" style="margin: 0rpx 30rpx;">
			<u-form-item label="起重机" prop="qzjLabel" :required="true">
				<u-input v-if="show.qzjInput" v-model="form.qzjLabel" />
				<u-input v-else v-model="form.qzjLabel" type="select" @click="qzjSelectShow = true" />
				<u-button v-if="show.qzjInput" type="primary" size="mini" @click="changeQzjShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">选择</u-button>
				<u-button v-else type="success" size="mini" @click="changeQzjShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">手填</u-button>
			</u-form-item>
			<u-form-item label="所属机构" prop="ssjgLabel" :required="true">
				<u-input v-if="show.ssjgInput" v-model="form.ssjgLabel" />
				<u-input v-else v-model="form.ssjgLabel" type="select" @click="ssjgSelectShow = true" />
				<u-button v-if="show.ssjgInput && show.jgButton" type="primary" size="mini" @click="changeSsjgShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">选择</u-button>
				<u-button v-if="!show.ssjgInput && show.jgButton" type="success" size="mini" @click="changeSsjgShow"
					style="position: absolute;right: 30rpx;top:20rpx;z-index: 9;">手填</u-button>
			</u-form-item>
			<u-form-item label="项目/工作号">
				<u-input v-model="form.gzh" type="text" />
			</u-form-item>
			<u-form-item label="产品类型" prop="product_type" :required="true">
				<u-tag :text="item.name" :mode="item.mode" type="success" v-for="(item, index) in typeList"
					shape="circle" @click="tagSelect(item.name)" style="margin-right: 10rpx;" />
			</u-form-item>
			<u-form-item label="需求描述">
				<u-input v-model="form.bug_description" type="textarea" :height="110" :auto-height="true" />
			</u-form-item>
			<u-form-item label="联系人" prop="report_person" :required="true">
				<u-input v-model="form.report_person" type="text" />
			</u-form-item>
			<u-form-item label="联系电话" prop="report_tel" :required="true">
				<u-input v-model="form.report_tel" type="text" />
			</u-form-item>
			<u-form-item label="上传">
				<u-upload :action="action" :show-progress="false" :file-list="fileList" @on-success="uploadSuccess" @on-remove="removeImg"></u-upload>
			</u-form-item>
			<view style="display: flex;">
				<view style="width: 100rpx;">提示：
				</view>
				<view style="color: grey;">
					上传请尽可能体现出问题设备的型号、序列号或现象
				</view>
			</view>
			<u-button :disabled="submitButtonDis" type="success" @click="submitData" style="margin-top: 20rpx;">确 定</u-button>
		</u-form>
		<u-select v-model="qzjSelectShow" :list="qzjList" @confirm="qzjSelectChange">
		</u-select>
		<u-select v-model="ssjgSelectShow" :list="ssjgList" @confirm="ssjgSelectChange"></u-select>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		BASE_URL
	} from '../../common/api.js'
	export default {
		data() {
			return {
				form: {
					id: '',
					crane_id: '',
					qzjLabel: '',
					mechanism: '',
					ssjgLabel: '',
					gzh: '', // 工作号
					product_type: '', // 产品类型
					report_person: '',
					report_tel: '',
					report_time: '',
					bug_description: '',
					report_img: []
				},
				fileList: [],
				action: BASE_URL + 'Image/PostUpload',
				show: {
					qzjInput: false,
					ssjgInput: false,
					jgButton: true
				},
				typeList: [],
				submitButtonDis: false,
				qzjSelectShow: false,
				ssjgSelectShow: false,
				qzjList: [],
				ssjgList: [],
				rules: {
					qzjLabel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					ssjgLabel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					report_tel: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}],
					report_person: [{
						required: true,
						message: '请输入具体内容',
						trigger: 'blur',
					}]
				}
			}
		},
		computed: {},
		methods: {
			tagSelect(name) {
				for (let item of this.typeList) {
					if (item.name === name) {
						item.mode = item.mode === 'plain' ? 'dark' : 'plain'
						break
					}
				}
			},
			removeImg(index, lists) {
				console.log(lists)
				this.form.report_img = []
				for (let item of lists) {
					this.form.report_img.push(item.response.url)
				}
			},
			uploadSuccess(data) {
				this.form.report_img.push(data.url)
			},
			// 切换起重机后 机构也清空
			changeQzjShow() {
				this.show.qzjInput = !this.show.qzjInput
				this.form.qzjLabel = ''
				this.form.crane_id = -1
				this.changeSsjgShow()
				// 如果起重机是手填状态，则机构也必须为手填状所以隐藏按钮
				if (this.show.qzjInput) {
					this.show.jgButton = false
					this.show.ssjgInput = true
				} else {
					this.show.jgButton = true
				}
			},
			changeSsjgShow() {
				this.show.ssjgInput = !this.show.ssjgInput
				this.form.ssjgLabel = ''
				this.form.mechanism = -1
			},
			getProductType() {
				const data = {
					pageIndex: 1,
					pageSize: 20,
					pid: 'all',
					name: '产品类型',
				}
				this.$myHttp('Dict/SelectSysDictType', data).then(res => {
					if (res.Total === 0) {
						return
					}
					const typeP = {
						pageIndex: 1,
						pageSize: 1000,
						dict_id: res.Data[0].ID
					}
					this.$myHttp('Dict/SelectSysDictTree', typeP).then(typeP => {
						this.typeList = []
						for (let item of typeP) {
							this.typeList.push({
								name: item.name,
								mode: 'plain'
							})
						}
						console.log(222)
						this.initData()
					})
				})
			},
			submitData() {
				let temp = []
				for (let item of this.typeList) {
					if (item.mode === 'dark') {
						temp.push(item.name)
					}
				}
				console.log(temp)
				if(temp.length === 0) {
					this.$refs.uToast.show({
						title: '请选择产品类型',
						type: 'error'
					})
					return
				}
				this.form.product_type = temp.length > 0 ? JSON.stringify(temp) : ''
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.submitButtonDis = true
						let subTemp = {
							OrderID: this.form.id,
							CraneID: this.form.crane_id,
							CraneName: this.form.qzjLabel,
							MechanismID: this.form.mechanism,
							MechanismName: this.form.ssjgLabel,
							ProjectNumber: this.form.gzh,
							ProductType: this.form.product_type,
							Describe: this.form.bug_description,
							ContactPerson: this.form.report_person,
							ContactNumber: this.form.report_tel,
							PictureAddress: JSON.stringify(this.form.report_img),
							CompanyID: uni.getStorageSync('comanyId')
						}
						let p = {
							info: JSON.stringify(subTemp),
							type: 1
						}
						let url = 'Order/AddOrder'
						let message = '新增成功' 
						if(this.form.id){
							p.type = 5
							url = 'Order/UpdateOrder'
							message = '更新成功'
						}
						this.$myHttp(url, p).then(res => {
							this.$refs.uToast.show({
								title: message,
								type: 'success'
							})
							setTimeout(() => {
								this.submitButtonDis = false
								uni.navigateBack()
							}, 600)
						})
					}
				});
			},
			qzjSelectChange(val) {
				this.form.crane_id = val[0].value
				this.form.qzjLabel = val[0].label
				this.getJgList()
			},
			ssjgSelectChange(val) {
				this.form.mechanism = val[0].value
				this.form.ssjgLabel = val[0].label
			},
			getQzjList(isValue = false) {
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
					if (!isValue) {
						this.form.crane_id = this.qzjList[0].value
						this.form.qzjLabel = this.qzjList[0].label
					}
					this.getJgList(isValue)
				})
			},
			initData() {
				// 编辑
				if (this.form.id) {
					let p = {
						OrderID: this.form.id,
						pageSize: 1,
						pageIndex: 1
					}
					this.$myHttp('Order/SelectOrder', p).then(res => {
						console.log(455)
						console.log(res)
						this.form.crane_id= res.CraneID
						this.form.qzjLabel= res.CraneName
						this.form.mechanism = res.MechanismID
						this.form.ssjgLabel = res.MechanismName
						this.form.gzh = res.ProjectNumber
						this.form.product_type = res.ProductType
						this.form.bug_description = res.Describe
						this.form.report_person = res.ContactPerson
						this.form.report_tel = res.ContactNumber
						//type
						let ptArr = JSON.parse(this.form.product_type)
						for (let i of this.typeList) {
							for (let j of ptArr) {
								if (i.name === j) {
									i.mode = 'dark'
								}
							}
						}
						this.form.report_img = JSON.parse(res.PictureAddress || '[]')
						this.fileList = []
						for (let item of this.form.report_img) {
							this.fileList.push({
								url:BASE_URL + '/Image/GetImage?image=' + item
							})
						}
						this.getQzjList(true) // 有默认值
					})
				} else {
					this.form.report_person = uni.getStorageSync('yonghu')
					this.form.report_tel = uni.getStorageSync('tel') + ''
					this.getQzjList(false) // 无默认值
				}
			},
			getJgList(isValue = false) {
				const data = {
					cid: this.form.crane_id,
					Tags: JSON.stringify(['mechanism']),
					toLevel: 2,
					cal: 0
				}
				this.ssjgList = []
				this.$myHttp('AgentTree/GetNodesByTag', data).then(res => {
					if(res.length === 0) {
						// 起重机下没有机构 则切换到手填模式
						this.show.ssjgInput = true
						this.form.mechanism = -1
						this.form.ssjgLabel = ''
						this.show.jgButton = false
						return
					}
					this.show.ssjgInput = false
					this.show.jgButton = true
					for (let item of res) {
						this.ssjgList.push({
							value: item.ID,
							label: item.NodeConfig.ShowName
						})
					}
					if (!isValue) {
						this.form.mechanism = this.ssjgList[0].value
						this.form.ssjgLabel = this.ssjgList[0].label
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onShow() {},
		onLoad(val) {
			console.log(111)
			console.log(val)
			this.form.id = val.id
			this.getProductType()
		}
	}
</script>

<style>
	.u-form-item--right__content__slot {
		flex-wrap: wrap !important;
	}
</style>
