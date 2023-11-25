<template>
	<view>
		<view class="goods_list">
			<block v-for="item in goodsList" :key="item.goods_id">
				<!-- 每一项商品 -->
				<view class="goods_item">
					<view class="goods_item_left">
						<img :src="item.goods_small_logo" alt="" class="good_pic" />
					</view>
					<view class="goods_item_right">
						<!-- 商品名称 -->
						<view class="goods_name">
							{{ item.goods_name }}
						</view>
						<!-- 商品价格 -->
						<view class="goods_price">
							{{ item.goods_price }}
						</view>
					</view>
				</view>
			</block>
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
			total: 0
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
		async getGoodsList() {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			if (res.meta.status !== 200) return uni.$showMsg();
			this.queryObj.total = res.message.total;
			this.goodsList = res.message.goods;
			console.log(res, 'res');
		}
	}
};
</script>

<style lang="scss"></style>
