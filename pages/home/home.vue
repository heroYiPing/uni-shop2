<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @click="goToSearch"></my-search>
		</view>
		<!-- 轮播图的区域 -->
		<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="3000">
			<!-- 循环item -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image class="image" :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<img class="nav-img" :src="item.image_src" alt="" />
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层的标题 -->
				<img class="floor-title" :src="item.floor_title.image_src" alt="" />
				<!-- 楼层的图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<img :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix" />
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" v-if="index2 != 0" :key="index2" :url="item2.url">
							<img :src="item2.image_src" :style="{ width: item2.image_width + 'rpx' }" mode="widthFix" />
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
	mixins: [badgeMix],
	data() {
		return {
			// 这是轮播图的数据列表
			swiperList: [],
			// 分类导航的数据列表
			navList: [],
			// 楼层的数据列表
			floorList: []
		};
	},
	onLoad() {
		// 调用方法，获取轮播图的数据
		this.getSwiperList();
		// 获取分类数据
		this.getNavList();
		// 获取楼层数据
		this.getFloorList();
	},

	methods: {
		goToSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		},
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) return uni.$showMsg();
			this.swiperList = res.message;
		},
		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			this.navList = res.message;
			if (res.meta.status !== 200) return uni.$showMsg();
		},
		navClickHandler(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			console.log('res', res);
			if (res.meta.status !== 200) return uni.$showMsg();

			// 对数据进行处理
			res.message.forEach((floor) => {
				floor.product_list.forEach((prod) => {
					prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
				});
			});
			this.floorList = res.message;
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	border: 1px solid #c00;
	top: 0;
	z-index: 999;
}
.swiper {
	height: 330rpx;
	.swiper-item,
	.image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title {
	display: flex;
	height: 60rpx;
	width: 100%;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box {
	display: flex;
	padding-left: 10px;
}
</style>
