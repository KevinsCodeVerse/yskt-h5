<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<!-- <public-module></public-module> -->
		<ren-dropdown-filter ref="renDropdownFillter" :filterData='filterData' :defaultIndex='defaultIndex'
			@onSelected='onSelected'></ren-dropdown-filter>
		<!-- <mescroll-item ref="mescrollItem" :index="0" :i="0" :height="height" :newList="list"></mescroll-item> -->
		<course-list :list="list" v-if="list.length!=0"></course-list>
		<u-empty
		        mode="data"
		        icon="http://cdn.uviewui.com/uview/empty/data.png"
				v-else
		>
		</u-empty>
		<fTabbar></fTabbar>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/module/ren-dropdown-filter/ren-dropdown-filter.vue'
	import MescrollItem from "./module/mescrollUni-item.vue";
	import fTabbar from '@/components/module/f-tabbar/f-tabbar';
	import courseList from "./module/course-list.vue"
	export default {
		components: {
			RenDropdownFilter,
			MescrollItem,
			fTabbar,
			courseList
		},
		data() {
			return {
				list: [],
				height: '',
				filterData: [
					[{
						text: '全部课程分类',
						value: ''
					}, {
						text: '公开课',
						value: 0
					}, {
						text: '会员课',
						value: 1
					}],
					[],
					[{
						text: '全部观看类型',
						value: ''
					}, {
						text: '直播',
						value: 0
					}, {
						text: '录播',
						value: 1
					}]
				],
				defaultIndex: [0, 0, 0],
				params: {
					hasLive: "",
					categoryId: "",
					hasFree: ""
				}
			}
		},
		//第一次加载
		onLoad(e) {
			// 需要固定swiper的高度
			// #ifndef MP-ALIPAY
			this.height = (uni.getSystemInfoSync().windowHeight - 108) + 'px'
			// #endif
			// #ifdef MP-ALIPAY
			this.height = (uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - uni
				.getSystemInfoSync().titleBarHeight - uni.upx2px(88) - 46) + 'px'
			// #endif

		},
		created() {
			this.getCategoryList()
this.getList()
		},
		methods: {
			getList() {
				uni.$u.http.post('/user/info/courseList', {
					...this.params
				}, {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {
					this.list = res
					// console.log("res:", res);
				})
			},
			onSelected(params) {
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '控制台查看筛选结果'
				// })
				console.log("params:", params[1][0]);
				this.params.hasLive = params[2][0].value
				this.params.categoryId = params[1][0].value
				this.params.hasFree = params[0][0].value
				this.getList()
			},
			dateChange(d) {
				uni.showToast({
					icon: 'none',
					title: d
				})
			},
			getCategoryList() {
				uni.$u.http.post('/user/info/public/categoryNoList', {}, {
					custom: {
						load: true
					}
				}).then((res) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					const categories = res.map(item => {
						return {
							text: item.name,
							value: item.id
						}
					})
					this.$set(this.filterData, 1, [{
						text: '全部课程类型',
						value: ''
					}, ...categories])
					this.$refs.renDropdownFillter.refreshStatus()
				}).catch((err) => {
					//联网失败, 结束加载
					uni.$u.toast("请求错误")
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f2f2f2;
	}
</style>
