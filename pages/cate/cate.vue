<template>
  <view>
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" :style="{ height: wh + 'px' }" scroll-y="true">
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
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{ height: wh + 'px' }" style="height: 300px">
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
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0
    };
  },
  methods: {},
  onLoad() {
    const sysInfo = uni.getWindowInfo();
    console.log(sysInfo);
    this.wh = sysInfo.windowHeight;
    console.log(this.wh, 'wh');
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
  }
}
</style>
