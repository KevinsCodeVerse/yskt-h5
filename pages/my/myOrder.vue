<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<!-- <public-module></public-module> -->
		<ren-dropdown-filter ref="renDropdownFillter" :filterData="filterData" :defaultIndex="defaultIndex" @onSelected="onSelected"></ren-dropdown-filter>
		<order-mescroll-item ref="mescrollItem" :index="0" :i="0" :height="height"></order-mescroll-item>
		<fTabbar></fTabbar>
	</view>
</template>

<script>
import RenDropdownFilter from '@/components/module/ren-dropdown-filter/ren-dropdown-filter.vue';
import orderMescrollItem from './module/order-mescrollUni-item.vue';
import fTabbar from '@/components/module/f-tabbar/f-tabbar';
export default {
	components: {
		RenDropdownFilter,
		orderMescrollItem,
		fTabbar
	},
	data() {
		return {
			height: '',
			filterData: [
				[
					{
						text: '全部课程分类',
						value: ''
					},
					{
						text: '公开课',
						value: 0
					},
					{
						text: '会员课',
						value: 1
					}
				],
				[],
				[
					{
						text: '全部观看类型',
						value: ''
					},
					{
						text: '直播',
						value: 0
					},
					{
						text: '录播',
						value: 1
					}
				]
			],
			defaultIndex: [0, 0, 0]
		};
	},
	//第一次加载
	onLoad(e) {
		// 需要固定swiper的高度
		// #ifndef MP-ALIPAY
		this.height = uni.getSystemInfoSync().windowHeight - 108 + 'px';
		// #endif
		// #ifdef MP-ALIPAY
		this.height = uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - uni.getSystemInfoSync().titleBarHeight - uni.upx2px(88) - 46 + 'px';
		// #endif
	},
	created() {
		this.getCategoryList();
	},
	methods: {
		onSelected(res) {
			uni.showToast({
				icon: 'none',
				title: '控制台查看筛选结果'
			});
		},
		dateChange(d) {
			uni.showToast({
				icon: 'none',
				title: d
			});
		},
		getCategoryList() {
			uni.$u.http
				.post('/user/info/public/categoryNoList', {}, { custom: { load: true } })
				.then((res) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					const categories = res.map((item) => {
						return {
							text: item.name,
							value: item.id
						};
					});
					this.$set(this.filterData, 1, [
						{
							text: '全部课程类型',
							value: ''
						},
						...categories
					]);
					this.$refs.renDropdownFillter.refreshStatus();
				})
				.catch((err) => {
					//联网失败, 结束加载
					uni.$u.toast('请求错误');
				});
		}
	}
};
</script>

<style>
page {
	background-color: #f2f2f2;
}
</style>
