<template>
  <view>
    <!-- 轮播图的区域 -->
    <swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="3000">
      <!-- 循环item -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image class="image" :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 这是轮播图的数据列表
      swiperList: []
    };
  },
  onLoad() {
    // 调用方法，获取轮播图的数据
    this.getSwiperList();
  },

  methods: {
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
      if (res.meta.status !== 200) return uni.$showMsg();
      this.swiperList = res.message;
      uni.$showMsg('数据请求成功！！');
    }
  }
};
</script>

<style lang="scss">
.swiper {
  height: 330rpx;
  .swiper-item,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
