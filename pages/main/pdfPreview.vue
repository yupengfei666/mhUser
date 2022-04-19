<template>
	<view>
		asdfae
		<web-view src="../../hybrid/html/pdf.html?url=http://www.mhitco.com:9098/api/Image/GetPdf?pdf=1.pdf"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl: '',
			};
		},
		onLoad(params){
			console.log(params)
		},
		onBackPress(){}
	}
</script>

<style>
</style>
