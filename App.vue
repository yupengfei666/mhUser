<script>
	export default {
		onLaunch() { //app 初始化
			const _u = uni.getUpdateManager()
			_u.onCheckForUpdate(res => { // 请求完新版本信息的回调
				if (res.hasUpdate) { // 是否有新的版本
					_u.onUpdateReady(() => { // 当新版本下载完成，会进行回调
						uni.showModal({
							title: '更新提示',
							content: '新版本已发布,请重启当前应用!',
							showCancel: false,
							success(c_res) {
								if (c_res.confirm) {
									_u.applyUpdate() // 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
								}
							}
						})
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	/* 这是页面的公用css */

	@import "./uni.css";
	@import "uview-ui/index.scss";


	page {
		min-height: 100%;
		display: flex;
	}

	.u-select__body__picker-view__item {
		font-size: 40rpx !important;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #363636;
	}

	.uni-loadmore {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		padding-bottom: 30upx;
	}


	.input-group {
		background-color: #ffffff;
		margin-top: 40px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50px;
		min-height: 50px;
		padding: 15px 0;
		padding-left: 30px;
		line-height: 50px;
	}

	.input-row input {
		width: 80%;
		height: 50px;
		min-height: 50px;
		padding: 15px 0;
		padding-right: 30px;
		line-height: 50px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50px;
		padding: 20px;
	}

	button.primary {
		background-color: #0faeff;
		margin: 10px 0px 0px 0px;
		color: white;
		font-size: 24upx;
	}

	button.warn {
		background-color: #dc5d63;
		margin: 10px 0px 0px 0px;
		color: white;
		font-size: 24upx;
	}

	button.gray {
		background-color: lightgray;
		margin: 10px 0px 0px 0px;
		color: white;
	}
</style>
