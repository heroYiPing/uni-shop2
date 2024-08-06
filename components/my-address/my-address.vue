<template>
	<view>
		<!-- 收货地址组件 -->
		<view class="address-choose-box">
			<button type="primary" size="mini">请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
export default {
	name: 'my-address',
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.address-choose-box {
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-border {
	display: block;
	width: 100%;
	height: 5px;
}
</style>
