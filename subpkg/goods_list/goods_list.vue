<template>
	<view>
		<view class="goods_list">
			<view v-for="item in goodsList" :key="item.goods_id" @click="goToDetail(item)">
				<!-- 每一项商品 -->
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 10
			},
			goodsList: [],
			total: 0,
			defaultImage: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg',
			isLoading: false
		};
	},
	onLoad(options) {
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		console.log(this.queryObj, 'queryObj');
		this.getGoodsList();
	},
	methods: {
		// 获取商品列表数据
		async getGoodsList(cb) {
			// 打开节流阀
			this.isLoading = true;
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			// 关闭节流阀
			this.isLoading = false;
			cb && cb();
			if (res.meta.status !== 200) return uni.$showMsg();
			this.total = res.message.total;
			// this.goodsList = res.message.goods;
			this.goodsList = [...this.goodsList, ...res.message.goods];
			console.log(res, 'res');
		},

		goToDetail(goods) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
			});
		}
	},
	onReachBottom() {
		// 判断是否还有下一页
		if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!');
		// 如果正在请求数据 则直接跳出方法
		if (this.isLoading) return;
		// 让页码值自增+1
		this.queryObj.pagenum += 1;
		this.getGoodsList();
	},
	onPullDownRefresh() {
		// 重置关键数据
		this.queryObj.pagenum = 1;
		this.total = 0;
		this.isLoading = false;
		this.goodsList = [];

		// 重新发起数据请求
		this.getGoodsList(() => uni.stopPullDownRefresh());
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
