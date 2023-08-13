<template>
	<view>home</view>
</template>

<script>
export default {
	data() {
		return {
			// 这是轮播图的数据列表
			swiperList: []
		};
	},
	onLoad() {
		// 调用方法，获取轮播图的数据
		this.getSwiperList();
	},
	methods: {}
};
</script>

<style lang="scss"></style>
