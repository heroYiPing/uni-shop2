<template>
	<view class="my-search-container" :style="{ backgroundColor: bgColor }" @click="handleSearcBox">
		<view class="my-search-box" :style="{ borderRadius: bdRadius + 'px' }">
			<!-- 使用uni-ui提供的图标组件 -->
			<uni-icons type="search" size="18"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-search',
	props: {
		bgColor: {
			type: String,
			default: '#c00'
		},
		bdRadius: {
			type: Number,
			default: 18
		}
	},
	data() {
		return {};
	},
	methods: {
		handleSearcBox() {
			console.log('my-search');
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss">
.my-search-container {
	height: 50px;
	// background-color: #c00;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box {
		height: 36px;
		width: 100%;
		// border-radius: 18px;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
