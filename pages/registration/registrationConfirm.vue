<template>
	<view class="reg-box">
		<view class="content-box" v-html="info.content"></view>
		<view class="reg-btn">
			<u-button @click="getUserInfo()" :disabled="btnDisabled" type="primary" :text="btnTitle"></u-button>
		</view>
		<u-action-sheet :show="dialogVisible" @close="close" :round="10" title="提交">
			<view class="popupBox">
				<u--form labelPosition="left" labelWidth="180rpx" :model="addData" :rules="rules" ref="uForm">
					<u-form-item label="真实姓名" prop="name" borderBottom ref="nameRef">
						<u--input v-model="addData.name"></u--input>
					</u-form-item>
				</u--form>
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['PrimaryColor'])
		},
		data() {
			return {
				info: {},
				addData: {
					name: "",
					phone: "",
					stNum: ""
				},
				rules: {
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
				},
				btnTitle: "我已阅读并同意本协议",
				dialogVisible: false,
				timer: "",
				nameVisible: false,
				btnDisabled: true,
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad() {
			this.getInfo(6)
			this.openTime()
		},
		methods: {
			...mapMutations(['setUserInfo', 'setToken']),
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
			openTime() {
				this.btnDisabled = true;
				let time = 9;
				this.timer = setInterval(() => {
					// 判断剩余秒数
					if (time == 0) {
						// 清除定时器和复原按钮
						this.btnTitle = `我已阅读并同意本协议`;
						clearInterval(this.timer);
						this.btnDisabled = false;
					} else {
						this.btnTitle = `我已阅读并同意本协议（ ${time}s ）`;
						time--;
					}
				}, 1000);
			},
			open() {
				this.dialogVisible = true;
			},
			close() {
				this.dialogVisible = false;
				this.addData.name = ""
			},
			getUserInfo() {
				uni.$u.http.post('/user/info/getPersonData', {}, {
					custom: {
						load: false,
						auth: true
					}
				}).then(res => {
					if (res.name === null || res.name === "" || res.name == undefined) {
						//弹出填写真实姓名的框
						this.dialogVisible = true
					} else {
						this.submit()
					}

				})

			},
			submit() {
				// uni.navigateTo({
				// 	url:"/pages/registration/bindPhone"
				// })
				uni.$u.http.post('/user/info/register', this.addData, {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {
					uni.showToast({
						title: '注册学籍成功~',
						icon: 'none'
					});
					this.setUserInfo(res)
					uni.switchTab({
						url: "/pages/my/myInfo"
					})
				}).catch((err) => {
					//联网失败, 结束加载
					console.log(err)
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
			width: 100%;
			background: #fff;
			position: fixed;
			padding: 20rpx 100rpx;
			bottom: 0rpx;
			// margin: 30rpx auto;

		}
	}

	.content-box {
		padding: 20rpx;
		font-size: 20rpx;
		padding-bottom: 60rpx;
	}

	.popupBox {
		padding: 40rpx !important;
	}
</style>
