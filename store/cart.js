export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: []
	}),

	mutations: {
		addToCart(state, goods) {
			let findResult = state.cart.find(item => item.goods_id == goods.goods_id)
			console.log(findResult);
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
		}
	},

	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(item => c += x.goods_count)
			return c
		}
	}
}