<template>
	<view class="reg-box">
		<view class="content-box" v-html="info.content"></view>
		<view class="reg-btn">
			<u-button type="primary" @click="handleToDetail" text="立即生成学籍号"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad() {
			this.getInfo(11)
		},
		methods: {
			getInfo(id) {
				uni.$u.http.post('/user/info/public/articleDetail', {
					id
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
			handleToDetail() {
				uni.navigateTo({
					url: "/pages/registration/registrationConfirm"
				})
			}
		}
	}
</script>

<style lang="scss">
.reg-box {
	background: #fff;
	min-height: 2000rpx;
	.title {
		width: 100%;
		text-align: center;
	}
	
	.reg-btn {
		width: 60%;
		
		margin: 30rpx auto;
		
	}
}
.content-box {
	padding: 20rpx;
	font-size: 20rpx;
}
</style>
