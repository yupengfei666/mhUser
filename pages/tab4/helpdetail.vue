<template>
	<view class="content">
		<view style="font-size: 40rpx;text-align: center;margin: 20rpx;">{{form.Question}}</view>
		<rich-text :nodes="form.Content"></rich-text>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {
				}
			}
		},
		computed: {},
		components:{
		},
		methods: {
		},
		onReady() {
		},
		onShow() {},
		onLoad(data) {
			let temp = JSON.parse(data.data)
			temp.Content = decodeURIComponent(temp.Content)
			this.form = temp
		}
	}
</script>

<style>
</style>
