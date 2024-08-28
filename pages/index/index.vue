<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="wrap">
			<u-swiper :list="imageList" keyName="image"></u-swiper>
		</view>
		<contentList :contentList="classList"></contentList>
		<f-tabbar></f-tabbar>
	</view>
</template>
<script>
	import fTabbar from '@/components/module/f-tabbar/f-tabbar';
	import contentList from './contentList/contentList.vue';

	export default {
		components: {
			fTabbar,
			contentList,
		},
		data() {
			return {
				imageList: [
				],
				classList: [{
						id: 1,
						name: "公开课",
						icon: "/static/graduation.png",
						content: [
						]

					},
					{
						id: 2,
						name: "会员课",
						icon: "/static/emblem.png",
						content: [
						]

					},
					{
						id: 3,
						name: "直播课",
						icon: "/static/live.png",
						content: [
						]
					
					}
				]

			}
		},
		onLoad() {
			// 隐藏原生的tabbar
			uni.hideTabBar();
		},
		created() {
			this.getIndexCourse()
			// this.getIndexCourse(1)
			// this.getIndexCourse(2)
			this.getIndexSwiper()
		},
		methods: {
			onJump(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 拷贝
			copy(notice) {
				uni.setClipboardData({
					data: notice,
					success(res) {
						uni.showToast({
							title: '复制成功',
							duration: 1000
						})
					}
				})
			},
			getIndexCourse(index) {
				uni.$u.http.post('/user/info/public/getIndexCourse', {}, {custom: {load:false}}).then((res) => {
				    //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.classList = res
				}).catch((err) =>{
				    //联网失败, 结束加载
				    uni.$u.toast("请求错误")
				})
			},
			getIndexSwiper() {
				uni.$u.http.post('/user/info/public/getIndexBanner', {}, {custom: {load:false}}).then((res) => {
				    //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.imageList = res
				}).catch((err) =>{
				    //联网失败, 结束加载
				    uni.$u.toast("请求错误")
				})
			}
		},
		
		

	}
</script>

<style lang="scss" scoped>
	
</style>