<template>
	<view style="width: 100vw;">
		<view style="margin:20rpx;font-size: 32rpx;">
			请先选择您反馈的类型
			<view style="padding: 20rpx;display: flex;justify-content: space-around;">
				<u-tag :text="item.name" :mode="item.mode" type="success" v-for="(item, index) in typeList"
					shape="circle" @click="tagSelect(item.name)" style="margin-right: 10rpx;" />
			</view>
			<u-form :model="form" ref="uForm" label-width="130" :border-bottom="false">
				<u-form-item label="问题描述">
					<u-input type="textarea" :border="true" :height="110" :auto-height="true" v-model="form.desc" />
				</u-form-item>
				<u-form-item label="图片">
					<u-upload :action="action" @on-success="uploadSuccess" @on-remove="removeImg"></u-upload>
				</u-form-item>
			</u-form>
			<view style="margin-top: 20rpx;">我们将通过以下手机号与您联系，如联系方式有变动请及时更改</view>
			<view style="align-items: center;display: flex;justify-content: center;width: 100%;margin-top: 20rpx;margin-bottom: 20rpx;">
				<span style="color: #fa3534;font-size: 50rpx;margin-right: 10rpx;padding-top: 15rpx;">*</span>
				<u-input v-model="form.tel" type="text" style="width: 80%;flex: none;" :border="true" />
			</view>
			<u-button type="success" @click="submitData" style="margin-top: 20rpx;">提 交</u-button>
		</view>
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
				keyword: '',
				typeList: [],
				form: {
					desc: '',
					img: [],
					tel: '',
					status: ''
				},
				action: BASE_URL + 'Image/PostUpload',
			}
		},
		computed: {},
		methods: {
			submitData() {
				let temp = []
				for (let item of this.typeList) {
					if(item.mode ==='dark'){
						temp.push(item.name)
					}
				}
				if(temp.length === 0){
					this.$refs.uToast.show({
						title: '请选择反馈类型',
						type: 'error'
					})
					return
				}
				if (this.form.tel) {
					let dataSub = {
						Type: temp[0],
						Content: this.form.desc,
						Contact: this.form.tel,
						Status: this.form.status,
						Annex: JSON.stringify(this.form.img)
					}
					const data = {
						info: JSON.stringify(dataSub),
					}
					this.$myHttp('CustomerService/AddFeedback', data).then(res => {
						this.$refs.uToast.show({
							title: '反馈成功',
							type: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 600)
					})
				} else {
					this.$refs.uToast.show({
						title: '请输入手机号',
						type: 'error'
					})
				}
			},
			removeImg(index, lists) {
				this.form.img = []
				for (let item of lists) {
					this.form.img.push(item.response.url)
				}
			},
			uploadSuccess(data) {
				this.form.img.push(data.url)
			},
			tagSelect(name) {
				for (let item of this.typeList) {
					if (item.name === name) {
						item.mode = item.mode === 'plain' ? 'dark' : 'plain'
					} else {
						item.mode = 'plain'
					}
				}
			},
			getDoType() {
				const typeP = {
					pageIndex: 1,
					pageSize: 1000,
					dict_id: 'c188901f-8b66-4237-a688-139a9aff3f7c'
				}
				this.$myHttp('Dict/SelectSysDictTree', typeP).then(res => {
					this.form.status = res[0].value
				})
			},
			getType() {
				const p = {
					pageIndex: 1,
					pageSize: 1000,
					dict_id: 'd78d9adf-8e95-4981-aed6-69d0f8a41e77'
				}
				this.$myHttp('Dict/SelectSysDictTree', p).then(res => {
					this.typeList = []
					for (let item of res) {
						this.typeList.push({
							name: item.name,
							mode: 'plain'
						})
					}
				})
			},
		},
		onLoad() {
			this.getType()
			this.getDoType()
			this.form.tel = uni.getStorageSync('tel')
		}
	}
</script>

<style>
</style>
