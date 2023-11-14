<template>
	<view class="search-box">
		<uni-search-bar @input="input" :radius="100" cancel-button="none" :focus="true"></uni-search-bar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null, // 定时器
			keyWord: '', // 关键词
			searchResultList: [] // 搜索结果列表
		};
	},
	methods: {
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
		getSearchList() {
			// 判断搜索的关键词是否为空
			if (this.keyWord.length == 0) {
				this.searchResultList = [];
				return;
			}
			uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord });
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
</style>
