<template>
	<view>
		<view class="goodsBox u-flex" v-for="(item,index) in list" :key="index" @click="handleToDetail(item)">
			<image class="goodsImg" :src="item.image"></image>
			<view class="info u-flex u-flex-m">
				<view class="title">{{item.name}}</view>
				<view class="desc u-line-1">{{item.overview || '暂无详情'}}</view>
				<view class="tag-desc">
					<view class="teacher">
						主讲老师：{{item.teacherName}}
					</view>
					<view class="tag">
						<view class="demo-tag-owner">
							{{item.hasFree == 1 ? "收费" : "免费"}}
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
			handleToDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item.id}`
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
				font-size: 30rpx;
				color: #333;
			}

			.desc {
				width: 100%;
				font-size: 26rpx;
				// margin-top: 10rpx;
				color: #666;
			}
			
			.demo-tag-owner {
				background-color: #fa3534;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				padding: 4rpx 14rpx;
				border-radius: 50rpx;
				font-size: 20rpx;
				line-height: 1;
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