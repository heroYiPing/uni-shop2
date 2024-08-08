<template>
	<view>
		<!-- 收货地址组件 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress1">请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：
						<text>escook</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：
						<text>138XXXX5555</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
export default {
	name: 'my-address',
	data() {
		return {
			address: {}
		};
	},
	methods: {
		// 选择收货地址
		async chooseAddress1() {
			// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
			//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
			const res = await uni.chooseAddress().catch((err) => err);
			// 2. 用户成功的选择了收货地址
			if (res && res.errMsg === 'chooseAddress:ok') {
				// 为 data 里面的收货地址对象赋值
				this.address = res;
			}
		}
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

// 渲染收货信息的盒子
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;

	// 第一行
	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 5px;
			}
		}
	}

	// 第二行
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
