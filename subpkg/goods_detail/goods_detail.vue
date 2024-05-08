<template>
	<view>
		<!-- 轮播区域 -->
		<swiper :indicator-dots="true" class="swp" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" class="img" @click="previewImg(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods_price">
				{{ goods_info.goods_price }}
			</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name"></view>
				<!-- 收藏 -->
			</view>
			<!-- 商品运费 -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goods_info: {}
		};
	},
	methods: {
		async getGoodsDetail(goods_id) {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
			if (res.meta.status !== 200) return uni.$showMsg();
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
</style>
