export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		addToCart(state, goods) {
			let findResult = state.cart.find(item => item.goods_id == goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}

			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车可选框
		updateGoodsState(state, goods) {
			let findResult = state.cart.find(item => {
				return item.goods_id === goods.goods_id
			})
			findResult.goods_state = goods.goods_state

			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {
		total(state) {
			console.log(state.cart, 'cart');
			let c = 0
			state.cart.forEach(x => {
				if (x.goods_state) {
					c += x.goods_count
				}
			})
			return c
		}
	}
}