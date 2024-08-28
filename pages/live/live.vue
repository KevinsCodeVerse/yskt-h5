<template>
	<view>
		<yingbing-video v-if="src" ref="video" autoplay muted :controls="controls" :barrage-show="barragesShow"
			title="测试视频" :src="src" @error="handleError" />
		<!-- <video autoplay controls controlslist="nodownload" width="100%" height="100%" id="videoElement"></video> -->
		<view class="info-box">
			<view v-if="info.adCourse" class="course-name">
				<text class="name">{{ info.adCourse.name }}</text>
				<view class="hot-box">
					<image style="width: 30rpx;height: 30rpx;" src="../../static/hot.svg" mode=""></image>
					<text>{{info.adCourse.readCount}}学习热度</text>
				</view>
			</view>
			<text class="title">讲师</text>
			<view class="teacher-box">
				<image style="width: 80rpx;height: 80rpx;" src="../../static/woman.svg" mode=""></image>
				<text>{{info.teacherName}}</text>
			</view>
			<view class="course-list">
				<text class="title">直播课程</text>
				<view v-if="info.chapterList">
					<!-- 	<view class="ddd" v-for="test in info.chapterList">
						{{ test}}
					</view> -->
					<!-- {{ info.chapterList }} -->
					<view v-for="chapters in info.chapterList" :key="chapters.courseId">
						<text style="font-weight: bold; padding-top: 20rpx;">{{chapters.name}}</text>
						<view v-if="chapters.children && chapters.children.length > 0">
							<view class="course-item">
								<view class="item" v-for="item in  chapters.children" :key="item.courseId"
									:class="{isActive: item.name === curChapterName}" @click="handleChapter(item)">
									<text>{{item.name}}</text>
									<view v-if="item.url" class="time">
										<image style="width: 30rpx;height: 30rpx;" src="../../static/time.svg" mode="">
										</image>
										<!--										<text>{{item.lengthTime}}</text>-->
									</view>
									<view v-else class="no_video">
										暂无视频
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="info.adCourse" class="course-desc">
				<text class="title">直播描述</text>
				<view class="live-desc" v-html="info.adCourse.content">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import rsa from "@/config/rsa.js";
	import flvjs from "flv.js";
	import {
		listToTree
	} from "../../config/common";
	import cellGroup from "../../uni_modules/uview-ui/libs/config/props/cellGroup";
	export default {
		data() {
			return {   
				src: '',
				flvConfig: {
					cors: true
				},
				curChapterName: "",
				barragesShow: true,
				controls: true,
				info: {},
				emptyVisible: false,
				emptyMessage: "",
				courseId: "",
				orderNum: ""
			}
		},
		onLoad(options) {
			console.log("options", options);
			// this.courseId = options.id;
			var url = window.location.href;
			url = url.replace("=", "")
			let urls = url.split("?")
			if (urls.length == 2) {
				this.courseId = urls[1]
			}
			// this.orderNum = options.orderNum;
			this.getStudentInfo()
		},
		methods: {
			fullscreen() {
				this.$refs.video.launchFullscreen()
			},
			handleError(e) {
				console.log('error', e);
				// this.$u.toast(e.type)

				if (e.type == "networkError") {
					if (e.response.code == 404) {
						uni.showToast({
							title: "当前暂无直播",
							icon: 'none'
						});
					}
				} else {
					uni.showToast({
						title: e.type,
						icon: 'none'
					});

				}
			},
			handleFullscreenChange(e) {
				if (e.fullscreen) {
					this.controls = true
				} else {
					this.controls = false
				}
			},
			getStudentInfo() {
				const httpData = {
					courseId: this.courseId,
					// orderNum: this.orderNum
				}

				uni.$u.http.post('/user/info/student', httpData, {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {
					const {
						chapterList,
						...rest
					} = res
					this.info = {
						...rest,
						chapterList: listToTree(chapterList)
					}
					this.courseName = this.info.adCourse.name;
					if (this.info.liveUrl) {
						const url = rsa.decryptByPublicKey(this.info.liveUrl);
						this.src = url
						// this.createVideo(url)
					} else {
						this.emptyVisible = true;
						this.emptyMessage = "当前暂无直播";
					}
				}).catch((err) => {
					//联网失败, 结束加载
					console.log(err)
				})


			},

			handleChapter(chapter) {
				
				if (!chapter.url) {
					uni.showToast({
						title: "暂无视频",
						icon: 'none'
					});
					return
				}
				
				this.curChapterName = chapter.name
				const url = rsa.decryptByPublicKey(chapter.url)
				this.src = url
				let httpData={
					chapterId:chapter.id
				}
				uni.$u.http.post('/user/info/watchSave', httpData, {
					custom: {
						load: false,
						auth: true
					}
				}).then((res) => {})
			},
			createVideo(url, type = "flv") {
				console.log(flvjs.isSupported())
				if (flvjs.isSupported()) {
					var videoElement = document.getElementById("videoElement");

					window.oncontextmenu = function(e) {
						//取消默认的浏览器自带右键 很重要！！
						e.preventDefault();
					};
					var flvPlayer = flvjs.createPlayer({
						type: type,
						url: url, //你的url地址
					});
					flvPlayer.attachMediaElement(videoElement);
					flvPlayer.load();
					flvPlayer.play();
					flvPlayer.on(flvjs.Events.ERROR, (error, status, res) => {
						if (res.code === 404) {
							console.log(error)
							// this.emptyVisible = true;
							// this.$message.error("暂无当前直播信号源，请稍后重试");
							// this.emptyMessage = "暂无当前直播信号源，请稍后重试";
						}
					});
				}

			},
		},
		onReady() {
			setTimeout(() => {
				this.barragesShow = false
			}, 100)
		},

	}
</script>

<style lang="scss" scoped>
	.title {
		position: relative;
		display: inline-block;
		font-size: 30rpx;
		font-weight: bold;
		padding-left: 16rpx;
		margin-bottom: 30rpx;
		margin-top: 20rpx;

		&::before {
			content: "";
			position: absolute;
			left: 0px;
			top: 10%;
			width: 6rpx;
			border-radius: 4rpx;
			background: #3a85ee;
			height: 80%;
		}
	}

	image {
		margin-right: 10rpx;
	}

	.info-box {
		font-size: 26rpx;
		padding: 20rpx;
		color: #666;

	}

	.isActive {
		color: #3a85ee;
	}

	.course-name {
		margin-bottom: 32rpx;

		.name {
			font-size: 36rpx;
			font-weight: bold;
		}

		display: flex;
		justify-content: space-between;
		align-items: center;

		.hot-box {
			display: flex;
			align-items: stretch;
			font-size: 24rpx;
		}

	}

	.teacher-box {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}

	.course-list {
		margin-top: 32rpx;

		.course-item {
			display: flex;
			flex-direction: column;
			padding: 16rpx;

			// margin-bottom: 32rpx;

			.item {
				display: flex;
				margin: 21rpx 0rpx;
				justify-content: space-between;
				align-items: center;

				.time {
					display: flex;
					align-items: center;
				}
			}
		}

	}

	.live-desc {
		margin-top: 10rpx;
		padding: 10rpx;
	}
</style>
