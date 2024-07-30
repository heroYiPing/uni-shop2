<template>
	<view class="goods_item">
		<view class="goods_item_left">
			<radio :checked="goods.goods_state" color="#C00000" @click="radioClickHandler" v-if="showRadio"></radio>
			<img :src="goods.goods_small_logo || defaultImage" alt="" class="goods_pic" />
		</view>
		<view class="goods-item-right">
			<!-- 商品名称 -->
			<view class="goods_name">
				{{ goods.goods_name }}
			</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum"></uni-number-box>
			</view>
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
		},
		showNum: {
			type: Boolean,
			// 默认情况下不展示数值框
			default: false
		},
		showRadio: {
			type: Boolean,
			// 默认情况下不展示可选框
			default: false
		}
	},
	data() {
		return {
			defaultImage: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg'
		};
	},

	methods: {
		radioClickHandler() {
			this.$emit('radio-change', {
				goods_id: this.goods.goods_id,
				goods_state: !this.goods.goods_state
			});
		}
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goods_pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
		}

		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
