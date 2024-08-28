<template>
	<view>
		<view style="z-index: 2;">
			<u-loading-page :loading="loading"></u-loading-page>
		</view>
		
		<u-subsection :list="list" :current="current" @change="changeIndex"></u-subsection>
		<view style="margin: 25rpx;" v-if="workList">
			<view style="margin: 20rpx 0rpx;" v-for="(item,index) in workList">
				<view style="font-size: 10rpx;color: #afafaf;">{{item.time}}</view>
				<view style="font-size: 30rpx;">{{item.name}}</view>
			</view>
		</view>
		<view style="z-index: 1;">
			<u-empty  mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" v-if="workList.length==0">
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['已提交', '未提交'],
				current: 0,
				workList: [],
				loading:false
			}
		},
		onLoad() {
			this.getWorkList()
		},
		methods: {
			changeIndex(e) {
				this.current = e;
				console.log(this.current);
				this.getWorkList()
			},
			getWorkList() {
				this.loading=true
				//查询已提交的作业
				let url = this.current == 0 ? "/user/info/myWork" : "/user/info/unSubWorkList"
				uni.$u.http.post(url, "", {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {
					this.workList = res;
					this.workList.forEach(item => {
						if (item.url) {
							let urlStr = item.url.replace(/\\(.)/mg, "$1");
							item.url = JSON.parse(urlStr)
						}
					})
					console.log("this.workList:", this.workList);
					this.loading=false
				}).catch((err) => {
					//联网失败, 结束加载
					console.log(err)
				})
			}
		}
	}
</script>

<style>

</style>
