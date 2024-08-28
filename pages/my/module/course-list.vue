<template>
	<view>
		<view class="goodsBox u-flex" v-for="(item,index) in list" :key="index">
			<view style="position: relative;">
				<image class="goodsImg" :src="item.image"></image>
				<view style="position: absolute;top: -10rpx;left: -10rpx;">
					<u-tag text="直播中" size="mini" v-if="item.liveStatus==1&&item.hasLive==0" type="warning"></u-tag>
					<u-tag text="未开播" size="mini" v-if="item.liveStatus==0&&item.hasLive==0" ></u-tag>
				</view>
			</view>
			<view class="info u-flex u-flex-m">
				<view class="title">{{item.courseName}}</view>
				<view>
					<u-tag text="直播" size="mini" v-if="item.hasLive==0"></u-tag>
					<u-tag text="录播" size="mini" v-if="item.hasLive==1" type="success"></u-tag>
				</view>
				<view class="desc u-line-1">{{item.overview || '暂无简介'}}</view>
				<view class="tag-desc">
					<view class="teacher">
						主讲老师：{{item.teacherName}}
					</view>
					<view class="tag">
						<view class="demo-tag-owner">
							<u-button type="primary" @click="handleStudy(item)" size="mini" text="立即学习"></u-button>
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
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			}
		},
		//第一次加载
		created(e) {

		},
		methods: {
			onJump(url) {
				uni.navigateTo({
					url: url
				})
			},
			handleStudy(item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/live/live?${item.courseId}`,

				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.goodsBox {
		padding: 50rpx 32rpx;
		border-bottom: 2rpx solid #f5f5f5;
		background: #fff;
		align-items: flex-start;

		.goodsImg {
			width: 285rpx;
			height: 180rpx;
			border-radius: 4rpx;
		}

		.info {
			height: 180rpx;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			padding-left: 20rpx;

			.title {
				font-size: 20rpx;
				color: #333;
			}

			.desc {
				width: 100%;
				font-size: 26rpx;
				// margin-top: 10rpx;
				color: #666;
			}

			.demo-tag-owner {
				// background-color: #fa3534;
				// color: #FFFFFF;
				// display: flex;
				// align-items: center;
				// padding: 4rpx 14rpx;
				// border-radius: 50rpx;
				// font-size: 20rpx;
				// line-height: 1;
			}

			.tag-desc {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #666;
				margin-top: 15rpx;
			}
		}

	}
</style>
