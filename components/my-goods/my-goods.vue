<template>
	<view class="goods_item">
		<view class="goods_item_left">
			<img :src="goods.goods_small_logo || defaultImage" alt="" class="goods_pic" />
		</view>
		<view class="goods_item_right">
			<!-- 商品名称 -->
			<view class="goods_name">
				{{ goods.goods_name }}
			</view>
			<!-- 商品价格 -->
			<view class="goods_price">￥{{ goods.goods_price | tofixed }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		goods: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			defaultImage: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg'
		};
	},
	filters: {
		// 把数字处理为带两位小数点的数字
		tofixed(num) {
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.goods_item {
	display: flex;
	flex-wrap: nowrap;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods_item_left {
		margin-right: 5px;
		.goods_pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods_item_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods_name {
			font-size: 13px;
		}
		.goods_price {
			font-size: 16px;
			color: #c00;
		}
	}
}
</style>
