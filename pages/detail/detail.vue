<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="course-cover">
			<!-- <image :src="info.image" mode=""></image> -->
			<view class="course-video">
				<video
					:src="info.image"
					:autoplay="false"
					:loop="false"
					:muted="false"
					:controls="true"
					:objectFit="'contain'"
					@play="onPlay"
					@pause="onPause"
					@ended="onEnded"
					:enableProgressGesture="true"
					style="width: 100%; height: 400rpx"
				></video>
			</view>
		</view>
		<view class="course-info">
			<view class="header">
				<view class="price">
					￥
					<text>{{ info.underlinedPrice > 0 ? info.underlinedPrice : '免费' }}</text>
				</view>
				<view class="hot">
					<image style="width: 40rpx; height: 40rpx" src="../../static/hot.svg" mode=""></image>
					<text>{{ info.readCount }}人学习</text>
				</view>
			</view>
			<view class="title">
				{{ info.name }}
			</view>
			<view class="overview">
				{{ info.overview }}
			</view>
			<view class="bottom-box">
				<view class="b-left">主讲：{{ info.teacherName }}</view>
				<view class="b-right">
					<u-button type="primary" size="small" text="我要报名"></u-button>
				</view>
			</view>
		</view>

		<view class="course-desc">
			<view class="title">课程介绍</view>
			<view class="content" v-html="info.content"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			courseId: '',
			info: {},
			getDate
		};
	},
	onLoad(options) {
		this.courseId = options.id;
		this.getCourseDetailInfo();
	},
	methods: {
		getCourseDetailInfo() {
			uni.$u.http
				.post(
					'/user/info/public/courseDetail',
					{
						id: this.courseId
					},
					{
						custom: {
							load: false,
							auth: true
						}
					}
				)
				.then((res) => {
					this.info = res;
				})
				.catch((err) => {
					//联网失败, 结束加载
					this.$u.toast('加载错误~');
				});
		},
		onPlay() {
			console.log('视频开始播放');
		},
		onPause() {
			console.log('视频暂停');
		},
		onEnded() {
			console.log('视频播放结束');
		}
	}
};
</script>

<style lang="less" scoped>
.course-cover {
	width: 100%;

	image {
		width: 100%;
		height: 450rpx;
	}
}

.course-info {
	width: 96%;
	margin: auto;
	background: #fff;
	border-radius: 30rpx;
	mini-height: 380rpx;
	position: relative;
	top: -30rpx;
	padding: 10rpx;

	.header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx;

		.price {
			font-size: 32rpx;
			color: #e40212;

			text {
				font-size: 48rpx;
			}
		}

		.hot {
			font-size: 30rpx;
			color: #666;
			display: flex;
			align-items: center;
			image {
				padding-right: 6rpx;
			}
		}
	}

	.title {
		font-weight: bold;
		padding: 10rpx;
	}

	.overview {
		font-size: 28rpx;
		color: #666;
		padding: 10rpx;
	}

	.bottom-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;

		.b-left {
			font-size: 26rpx;
			color: #666;
		}
	}
}

.course-desc {
	width: 96%;
	margin: auto;
	background: #fff;
	border-radius: 30rpx;
	padding: 20rpx;
	min-height: 380rpx;

	.title {
		position: relative;
		font-size: 30rpx;
		font-weight: bold;
		padding-left: 16rpx;
		margin-bottom: 10rpx;

		&::before {
			content: '';
			position: absolute;
			left: 0px;
			top: 10%;
			width: 6rpx;
			border-radius: 4rpx;
			background: #3a85ee;
			height: 80%;
		}
	}

	.content {
		font-size: 28rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
}
</style>
