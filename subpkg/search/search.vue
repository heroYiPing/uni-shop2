<template>
	<view class="">
		<view class="search-box">
			<uni-search-bar v-model="keyWord" @input="input" :radius="100" cancel-button="none" :focus="true"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResultList.length !== 0">
			<view class="sugg-item" v-for="item in searchResultList" :key="item.goods_id" @click="goToDetail(item)">
				<view class="goods-name">{{ item.goods_name }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="24"></uni-icons>
			</view>
			<!-- 搜索历史内容 -->
			<view class="history-content">
				<uni-tag :text="item" @click="handleHistoryToSearch(item)" :inverted="true" v-for="(item, index) in history" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null, // 定时器
			keyWord: '', // 关键词
			historyList: [], // 搜索关键词的历史数据
			searchResultList: [] // 搜索结果列表
		};
	},
	computed: {
		history() {
			// 数组是引用数据类型 避免对数组进行直接反转
			return [...this.historyList].reverse();
		}
	},
	methods: {
		goToDetail(item) {
			uni.navigateTo({
				url: `/subpkg/goods_detail/goods_detail?goodsId=${item.goods_id}`
			});
		},
		// input输入事件处理函数
		input(e) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				console.log(e);
				this.keyWord = e;
				this.getSearchList();
			}, 500);
		},
		async getSearchList() {
			// 判断搜索的关键词是否为空
			if (this.keyWord.length == 0) {
				this.searchResultList = [];
				return;
			}
			const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord });
			if (res.meta.status !== 200) return uni.$showMsg();
			this.searchResultList = res.message;
			// 将搜索词存入数组
			this.saveSearchHistoryList(this.keyWord);
		},
		saveSearchHistoryList(keyword) {
			// 将关键词存入搜索历史数组中
			// this.historyList.push(keyword);
			const set = new Set(this.historyList);
			set.delete(keyword);
			set.add(keyword);

			this.historyList = Array.from(set);
		},
		handleHistoryToSearch(keyword) {
			// keyWord
			this.keyWord = keyword;
			// 调用查询方法
			this.getSearchList();
			// 持久化存储
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list {
	padding: 0 5px;
	.sugg-item {
		padding: 13px 0;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
		.goods-name {
			// 文字不允许换行（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后使用...代替
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

.history-box {
	padding: 0 5px;
	.history-title {
		padding: 5px;
		height: 40px;
		font-size: 13px;
		line-height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	.history-content {
		display: flex;
		flex-wrap: wrap;
		.uni-tag {
			margin-right: 5px;
			margin-top: 5px;
		}
	}
}
</style>
