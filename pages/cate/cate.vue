<template>
	<view>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" :style="{ height: wh + 'px' }" scroll-y="true">
				<block v-for="(item, i) in cateList" :key="i">
					<view @click="selectCate(item, i)" :class="['left-scroll-item-view', activeIndex == i ? 'active' : '']">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }">
				<view></view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
				<view>xxxxx</view>
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
			activeIndex: 0
		};
	},
	methods: {
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) return uni.$showMsg();
			this.cateList = res.message;
		},
		selectCate(data, index) {
			this.activeIndex = index;
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
</style>
