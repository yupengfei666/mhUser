<template>
	<view id="bxrate" style="padding: 20rpx;background-color: white;height: 100vh;width:100%">
		<view style="display: flex;flex-direction: column;align-items: center;">
			<h2 style="margin-top: 20rpx;" class='uni-h4'>{{text}}</h2>
			<u-rate style="margin-top: 20rpx;" :count="count" :min-count="1" v-model="cvalue" :size="57" @change="changeRate"></u-rate>
			<u-input :disabled="isComment" v-model="content" placeholder="请输入评价内容" style="width: 90%;margin-top: 60rpx;" type="textarea" :border="true" :height="200"/>
			<u-button v-if="!isComment" size="default" type="success" @click="submit" style="width: 80%;margin-top: 40rpx;">提交</u-button>
		</view>
		<view style="margin-top: 20rpx;"> 注：该评价工程师不可见</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				gdId: '',
				text: '不满意',
				count:5,
				cvalue:1,
				content: '',
				isComment: false
			}
		},
		computed: {},
		methods: {
			submit(){
				let subTemp = {
					OrderID: this.gdId,
					CommentContent: this.content,
					CommentStar: this.cvalue
				}
				let p = {
					info: JSON.stringify(subTemp),
					type: 1
				}
				this.$myHttp('Order/UpdateOrder', p).then(res => {
					this.$refs.uToast.show({
						title: '评价成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 600)
				})
			},
			changeRate(val){
				console.log(val)
				if(val === 5){
					this.text = '非常满意'
				} else if(val > 2){
					this.text = '满意'
				} else {
					this.text = '不满意'
				}
			}
		},
		onLoad(val) {
			console.log(val)
			let temp = JSON.parse(val.data)
			console.log(temp)
			this.gdId = temp.OrderID
			if(temp.IsComment){
				this.cvalue = temp.CommentStar
				this.changeRate(this.cvalue)
				this.content = temp.CommentContent
				this.isComment = true
			}
		}
	}
</script>

<style>
</style>
