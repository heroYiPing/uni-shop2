<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" :style="{ height: wh + 'px' }" scroll-y="true">
				<block v-for="(item, i) in cateList" :key="i">
					<view @click="selectCate(item, i)" :class="['left-scroll-item-view', activeIndex == i ? 'active' : '']">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域1 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
					<!-- 二级分类标题 -->
					<view class="cate-level-title">/{{ item.cat_name }}/</view>
					<!-- 三级分类下的内容 -->
					<view class="cate-level-content">
						<!-- 三级分类的item项 -->
						<view class="cate-level-content-item" v-for="(item2, i2) in cateLevel2[i].children" :key="i2" @click="goToGoodsList(item2)">
							<img :src="item2.cat_icon" alt="" />
							<view>{{ item2.cat_name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wh: 0,
			// 分类数据列表
			cateList: [],
			// 选中的分类索引值
			activeIndex: 0,
			// 二级分类的列表
			cateLevel2: [],
			scrollTop: 0
		};
	},
	methods: {
		goToGoodsList(item) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
			});
		},
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) return uni.$showMsg();
			this.cateList = res.message;
			// 为二级分类赋值
			this.cateLevel2 = res.message[0].children;
		},
		selectCate(data, index) {
			console.log(data, 'data');
			this.cateLevel2 = data.children;
			this.activeIndex = index;
			this.scrollTop = this.scrollTop == 0 ? 1 : 0;
		}
	},
	onLoad() {
		const sysInfo = uni.getWindowInfo();
		console.log(sysInfo);
		this.wh = sysInfo.windowHeight;
		// 获取分类数据
		this.getCateList();
	}
};
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-item-view {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active {
				position: relative;
				background-color: #fff;
				&:before {
					position: absolute;
					top: 25%;
					left: 0;
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
				}
			}
		}
	}
}
.cate-level-title {
	font-size: 12px;
	font-weight: 700;
	text-align: center;
	padding: 15px 0;
}

.cate-level-content {
	display: flex;
	flex-wrap: wrap;

	.cate-level-content-item {
		display: flex;
		flex-direction: column;
		width: 33.33%;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		image {
			width: 60px;
			height: 60px;
		}
		text {
			font-size: 12px;
		}
	}
}
</style>
