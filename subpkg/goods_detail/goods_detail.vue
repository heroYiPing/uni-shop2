<template>
	<view v-if="goods_info.goods_name" class="goods_detail_container">
		<!-- 轮播区域 -->
		<swiper :indicator-dots="true" class="swp" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" class="img" @click="previewImg(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods_price">￥{{ goods_info.goods_price }}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="30" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 商品运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 商品导航栏组件区域 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState('m_cart', ['cart']),
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		/* total(newVal) {
			let findResult = this.options.find((item) => item.text == '购物车');
			if (findResult) {
				findResult.info = newVal;
			}
		} */
		total: {
			handler(newVal) {
				let findResult = this.options.find((item) => item.text == '购物车');
				if (findResult) {
					findResult.info = newVal;
				}
			},
			immediate: true
		}
	},
	data() {
		return {
			goods_info: {},
			options: [
				{
					icon: 'shop',
					text: '店铺',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: ''
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},

	methods: {
		...mapMutations('m_cart', ['addToCart']),
		onClick(e) {
			console.log(e, 'e');
			if (e.content.text == '购物车') {
				// 切换到购物车页面
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		},
		buttonClick(e) {
			if (e.content.text == '加入购物车') {
				// 每个商品的信息对象，都包含如下 6 个属性：
				// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
				let { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state } = this.goods_info;
				let goods = {
					goods_id,
					goods_name,
					goods_price,
					goods_count: 1,
					goods_small_logo,
					goods_state: true
				};
				this.addToCart(goods);
			}
		},
		async getGoodsDetail(goods_id) {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
			if (res.meta.status !== 200) return uni.$showMsg();
			res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:bolck";').replace(/webp/g, 'jpg');
			this.goods_info = res.message;
		},
		// 进行预览
		previewImg(i) {
			// 调用uni.previewImage 进行图片预览
			uni.previewImage({
				// 预览时，默认显示的图片索引
				current: i,
				// 所有图片 url 地址的数组
				urls: this.goods_info.pics.map((item) => item.pics_big)
			});
		}
	},
	onLoad(options) {
		console.log(options);
		const goods_id = options.goods_id;
		this.getGoodsDetail(goods_id);
	}
};
</script>

<style lang="scss">
.swp {
	height: 750rpx;
	.img {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0px;
	.goods_price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		.favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.yf {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}

.goods_nav {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
.goods_detail_container {
	padding-bottom: 50px;
}
</style>
