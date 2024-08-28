<template>
	<view>
		<view class="order-item" v-for="order in list">
			<view class="header u-flex">
				<view class="order">
					订单号：{{ order.orderNum}}
				</view>
				<view class="status">
					{{ order.openStatus === 1 ? "已开通" : "未开通"}}
				</view>
			</view>
			<view class="course-info">
				<view class="left-cover">
					<u-scroll-list :indicator="false">
						<view class="u-flex u-flex-column u-p-r-14" v-for="(item,index) in order.courseVoList" :key="index">
							<image class="course-cover" :src="item.image"></image>
							<text class="u-line-2">{{ item.name}}</text>
						</view>
						
					</u-scroll-list>
				</view>
				<view class="right-num">
					<view class="price">
						￥<text>{{order.price}}</text>
					</view>
					<view class="num">
						共{{order.count}}课程
					</view>
					<view class="btn">
						<u-button @click="handleToDetail(order)" size="mini" type="primary" text="查看详情"></u-button>
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
					url: `/pages/live/live?id=${item.courseId}&orderNum=${item.orderNum}`,

				})
			},
			handleToDetail(item) {
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?orderNum=${item.orderNum}`,
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.order-item {
		padding: 20rpx 32rpx;
		border-bottom: 2rpx solid #f5f5f5;
		background: #fff;
		align-items: flex-start;

		.header {
			justify-content: space-between;
			padding-bottom: 16rpx;
			font-size: 24rpx;
			color: #666;
		}

		.course-cover {
			width: 170rpx;
			height: 130rpx;
			border-radius: 4rpx;
		}

		.course-info {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			text-align: right;
			.left-cover {
				width: 80%;
				font-size: 24rpx;
				// border: 1px solid #999;
				text {
					padding-top: 10rpx;
					text-align: left;
				}
			}
			

			.right-num {
				flex: 1;
				padding-left: 10rpx;
				.price {
					font-size: 28rpx;
					text {
						font-size: 40rpx;
					}
				}
				.num {
					margin-bottom: 30rpx;
					color: #666;
				}
				
				.btn {
					padding-bottom: 20rpx;
				}
			}
		}

	}
</style>