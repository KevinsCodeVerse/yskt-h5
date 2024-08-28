<!-- 订单详情 -->
<template>
	<view class="orderDetailContent">
		<!-- <view class="title">订单详情</view> -->
		<view class="shadow">
			<view class="subTitle">课程及服务</view>
			<view class="content-item">
				<view class="item">
					<view class="label">课程名称：</view>
					<view class="content">{{ info.courseName }}</view>
				</view>
				<view class="item">
					<view class="label">课程套餐：</view>
					<view class="content">{{ info.setMealName }}</view>
				</view>
			</view>
		</view>
		<view class="shadow">
			<view class="subTitle">订单及费用</view>
			<view class="content-item">
				<view class="item">
					<view class="label">订单编号：</view>
					<view class="content">{{ info.orderNum }}</view>
				</view>
				<view class="item">
					<view class="label">开始/结束时间：</view>
					<view class="content">{{ info.stAndEdTime }}</view>
				</view>
				<view class="item">
					<view class="label">创建时间：</view>
					<view class="content">
						{{ getDate(info.createTime, "yyyy-MM-dd HH:mm:ss") }}
					</view>
				</view>
				<view class="item">
					<view class="label">付款状态：</view>
					<view class="content">{{ getNameByStatus(info.status) }}</view>
				</view>
				<u-line></u-line>
				<view class="item">
					<view class="label">课程总价：</view>
					<view class="content">￥{{ info.marketPrice }}</view>
				</view>
				<view class="item">
					<view class="label">应付款：</view>
					<view class="content">￥{{ info.unReceivedPrice }}</view>
				</view>
				<view class="item">
					<view class="label">已付款：</view>
					<view class="content">￥{{ info.receivedPrice }}</view>
				</view>
				<view class="item">
					<view class="label">未付款：</view>
					<view class="content">￥{{ info.unReceivedPrice }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import { getOrderDetailApi } from "@/common/api/course";
	// import { getDate } from "@/utils/tools";
	import { getDate } from "@/config/h5Utils.js";
	export default {
		data() {
			return {
				info: {},
				orderNum: "",
				getDate
			};
		},

		created() {},
		onLoad(options) {
			this.orderNum = options.orderNum
			this.getOrderDetail(options.orderNum)
		},

		methods: {
			async getOrderDetail(orderNum) {
				uni.$u.http.post('/user/info/myOrderDetail', {
					orderNum
				}, {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {
					this.info = res;
				}).catch((err) => {
					//联网失败, 结束加载
					console.log(err)
				})

			},
			getNameByStatus(status) {
				if (status === 0) {
					return "未支付"
				} else if (status === 7) {
					return "已取消"
				} else if (status === 1) {
					return "已支付"
				} else {
					return "已支付"
				}
			}
		},
	};
</script>
<style lang="less" scoped>
	.orderDetailContent {
		color: #666;
		padding: 10px;
		font-size: 28rpx;
		.subTitle {
			padding-left: 15px;
			margin-bottom: 10px;
			font-weight: bold;
		}
		.content-item {
			margin-bottom: 5px;

			.item {
				display: flex;
				margin: 20rpx 0rpx;

				.label {
					width: 240rpx;
					text-align: right;
				}
			}
		}
	}

	.title {
		position: relative;
		font-size: 16px;
		font-weight: bold;
		padding-left: 10px;
		margin-bottom: 20px;

		&::before {
			content: "";
			position: absolute;
			left: 0px;
			top: 10%;
			width: 4px;
			border-radius: 2px;
			background: #3a85ee;
			height: 80%;
		}
	}
	.shadow {
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 20rpx 0rpx;
		
	}
</style>