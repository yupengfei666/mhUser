<template>
	<view class="content">
		<u-form :model="form" :label-width="165" ref="uForm" style="margin: 0rpx 30rpx;">
			<u-form-item label="反馈类型">
				<span>{{form.Type}}</span>
			</u-form-item>
			<u-form-item label="问题描述">
				<span>{{form.Content}}</span>
			</u-form-item>
			<u-form-item label="联系电话">
				<span>{{form.Contact}}</span>
			</u-form-item>
			<u-form-item label="图片">
				<pictureShow :imgData="form.report_img"></pictureShow>
			</u-form-item>
		</u-form>
	</view>
</template>
<script>
	import pictureShow from '../../components/common/pictureShow.vue'
	export default {
		data() {
			return {
				form: {
				}
			}
		},
		computed: {},
		components:{
			pictureShow
		},
		methods: {
		},
		onReady() {
		},
		onShow() {},
		onLoad(data) {
			this.form = JSON.parse(data.data)
			this.form.report_img = JSON.parse(this.form.Annex)
		}
	}
</script>

<style>
</style>
