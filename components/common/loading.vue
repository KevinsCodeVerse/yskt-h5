<template>
	<view class="mask mask-show u_loading" :data-theme="isDark?'dark':'light'" v-if="loadingShow" @touchmove.stop.prevent="preventTouchMove">
		<!-- 加载动画开始 -->
		<view class="preloader u-flex u-flex-column u-flex-center">
		  <view class="loader">
              <view></view>
              <view></view>
              <view></view>
              <view></view>
              <view></view>
          </view>
		  <!-- <view class="title">加载中...</view> -->
		</view>
		<!-- 加载动画结束 -->
		
	</view>
</template>

<script scoped="true">
import { mapState, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState(['loadingShow','isDark'])
	},
	methods:{
		preventTouchMove(){
			console.log('stop user scroll it!');
			return;
		}
	}
};
</script>

<style lang="scss" scoped>
.u_loading{
    &.mask {
        /* pointer-events: none; */
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    &.mask-show {
        background: rgba(255,255,255, 0);
    }
    .title {
    	color: #666;
    	font-size: 28rpx;
    	margin-top: 40rpx;
    }
	.preloader{
		width: 220rpx;
		height: 170rpx;
		background-color: #fff;
		border-radius: 18rpx;
	}
    .loader {
      width: 36px;
      position: relative;
    }
    .loader view {
      display: block;
      position: absolute;
      bottom: 0px;
      width: 4px;
      height: 5px;
      background: coral;
      -webkit-animation: loader 1.5s infinite ease-in-out;
      animation: loader 1.5s infinite ease-in-out;
    }
    .loader view:nth-child(2) {
      left: 8px;
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    .loader view:nth-child(3) {
      left: 16px;
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
    }
    .loader view:nth-child(4) {
      left: 24px;
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    .loader view:nth-child(5) {
      left: 32px;
      -webkit-animation-delay: 0.8s;
      animation-delay: 0.8s;
    }
    
    @-webkit-keyframes loader {
      0% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: coral;
      }
      25% {
        height: 30px;
        -webkit-transform: translateY(15px);
        transform: translateY(15px);
        background: cornflowerblue;
      }
      50% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: cornflowerblue;
      }
      100% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: coral;
      }
    }
    
    @keyframes loader {
      0% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: coral;
      }
      25% {
        height: 30px;
        -webkit-transform: translateY(15px);
        transform: translateY(15px);
        background: cornflowerblue;
      }
      50% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: cornflowerblue;
      }
      100% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: coral;
      }
    }
    
}
[data-theme=dark] {
	.u_loading{
	    &.mask-show {
	        background: rgba(0,0,0, 0.3);
	    }
	}
}
</style>
