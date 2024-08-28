<template>
	<view class="content">
		<view class="list" v-for="(list, index) in contentList" :key="index">
			<view class="openClass-box">
				<u-icon class="icon-image" :label="list.categoryName" size="30" name="/static/live.png"></u-icon>
				<u-icon label="" size="20" name="more-dot-fill"></u-icon>
			</view>
			<view class="content-block">
				<view class="demo-warter" v-for="(item, index) in list.courseList" :key="index" @click="handleToDetail(item)">
					<u--image :showLoading="true" :lazy-load="true" :src="item.image" height="120px" width="100%"></u--image>
					<view class="demo-title">
						{{ item.name }}
					</view>
					<view class="demo-tag">
						<view class="demo-shop">主讲老师： {{ item.teacherName }}</view>
						<view class="demo-tag-owner">
							{{ item.hasFree == 1 ? '收费' : '免费' }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		contentList: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	components: {},
	data() {
		return {};
	},
	onLoad() {},

	methods: {
		handleToDetail(item) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${item.id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.openClass-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 20rpx 15rpx;

	// .item1 {
	// 	/deep/.u-icon__img {
	// 		background: linear-gradient(0deg, rgba(9, 216, 162, 1), rgba(90, 242, 217, 1)) !important;
	// 		border-radius: 30rpx;
	// 	}
	// }

	// .item2 {
	// 	/deep/.u-icon__img {
	// 		background: linear-gradient(0deg, rgba(255, 126, 34, 1), rgba(240, 184, 27, 1));
	// 		border-radius: 30rpx;
	// 	}
	// }

	.icon-image {
		/deep/.u-icon__img {
			background: linear-gradient(0deg, rgba(251, 184, 35, 1), rgba(255, 228, 40, 1));
			border-radius: 30rpx;
		}
	}
}

.content-block {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	.demo-warter {
		width: 47%;
	}
}

.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	position: relative;

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: #303133;
	}

	.demo-tag {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: #fa3534;
		color: #ffffff;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid #2979ff;
		color: #2979ff;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: #fa3534;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: #909399;
		// margin-top: 5px;
	}
}
</style>
