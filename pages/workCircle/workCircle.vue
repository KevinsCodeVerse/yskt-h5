<template>
	<view>
		<view style="z-index: 2">
			<u-loading-page :loading="loading"></u-loading-page>
		</view>
		<u-subsection :list="list" :current="current" @change="changeIndex"></u-subsection>
		<view>
			<view style="margin: 30rpx">
				<view v-for="(item, index) in workList" :key="index">
					<view style="display: flex">
						<u--image :src="item.avatar" width="40px" height="40px" shape="circle"></u--image>
						<view style="display: flex; flex-direction: column; margin-left: 10rpx">
							<text style="font-size: 30rpx; font-weight: bold">{{ item.name }}</text>
							<text style="font-size: 25rpx">{{ item.time }}</text>
						</view>
					</view>
					<view style="margin-top: 10rpx; font-size: 25rpx; display: flex; flex-direction: column; gap: 10rpx">
						<text>提交作业了 来自</text>
						<text style="color: #3498db; font-weight: bold">{{ item.chapterName }}</text>
					</view>
					<view style="display: flex; gap: 30rpx; margin-top: 20rpx">
						<u--image :src="work" width="100px" height="70px" v-for="(work, index) in item.url" :key="index"></u--image>
					</view>
					<view>
						<text style="font-weight: bold; color: #7f8c8d; font-size: 35rpx">讲师评论：{{ item.comment }}</text>
					</view>
					<u-line margin="20rpx 0rpx 20rpx 0rpx"></u-line>
				</view>
			</view>
		</view>
		<fTabbar></fTabbar>
	</view>
</template>

<script>
import fTabbar from '@/components/module/f-tabbar/f-tabbar';
export default {
	components: {
		fTabbar
	},
	data() {
		return {
			total: 0,
			list: ['广场', '我的作业'],
			current: 0,
			workList: [],
			loading: false,
			params: {
				pageNo: 1,
				pageSize: 10
			},
			allLoaded: false // 用于标记是否所有数据已加载完成
		};
	},

	onLoad() {
		this.getList();
	},

	onReachBottom() {
		// 滚动到底部时加载更多数据
		if (!this.allLoaded) {
			this.params.pageNo += 1;
			this.getList();
		}
	},

	methods: {
		changeIndex(e) {
			this.current = e;
			console.log(this.current);
			if (this.current == 0) {
				this.resetAndGetList();
			} else if (this.current == 1) {
				uni.navigateTo({
					url: '/pages/workCircle/workList'
				});
			}
		},

		resetAndGetList() {
			// 切换选项卡时重置分页和数据
			this.params.pageNo = 1;
			this.allLoaded = false;
			this.workList = [];
			this.getList();
		},

		getList() {
			this.loading = true;
			uni.$u.http
				.post('/user/info/public/workList', this.params, {
					custom: {
						load: false,
						auth: true
					}
				})
				.then((res) => {
					this.loading = false;
					if (res.list.length < this.params.pageSize) {
						this.allLoaded = true; // 数据已全部加载
					}
					this.total = res.total;
					this.workList = [...this.workList, ...res.list];

					this.workList.forEach((item) => {
						if (item.url) {
							let urlStr = item.url.replace(/\\(.)/gm, '$1');
							item.url = JSON.parse(urlStr);
						}
					});
				})
				.catch((err) => {
					console.log(err);
					this.loading = false;
				});
		}
	}
};
</script>

<style></style>
