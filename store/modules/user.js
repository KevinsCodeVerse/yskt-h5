import {
	isWechat
} from '@/config/h5Utils';
import {
	setCookie,
	getCookie,
	removeCookie
} from '@/plugins/cookie';
export const state = {
	//用户数据
	userInfo: {},
	token: ""
};
export const mutations = {
	//储存用户信息
	setUserInfo(state, data) {
		if (data) {
			state.userInfo = Object.assign({}, state.userInfo, data);
			// #ifdef H5
			// if(isWechat()){
			// 微信浏览器使用cookie存储---ios微信浏览器使用此方式可以拿到cookie
			var val = encodeURIComponent(JSON.stringify(state.userInfo)) //这里对保存的数据进行编码
			setCookie('userInfo', val, 15)
			// }else{
			// 	window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo));
			// }
			// #endif
			// #ifndef H5
			uni.setStorageSync('userInfo', state.userInfo);
			// #endif
		}
	},
	setToken(state, token) {
		if (token) {
			state.token = token;
			// #ifdef H5
			// if(isWechat()){
			// 微信浏览器使用cookie存储---ios微信浏览器使用此方式可以拿到cookie
			// var val = encodeURIComponent(JSON.stringify(state.userInfo)) //这里对保存的数据进行编码
			setCookie('token', token, 15)
			// }else{
			// 	window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo));
			// }
			// #endif
			// #ifndef H5
			uni.setStorageSync('token', token);
			// #endif
		}
	},
	// 退出APP
	emptyUserInfo(state) {
		state.userInfo = {};
		// #ifdef H5
		// if(isWechat()){
		removeCookie('token')
		removeCookie('userInfo')

		// }else{
		// 	window.sessionStorage.removeItem("userInfo");
		// }
		// #endif
		// #ifndef H5
		uni.removeStorageSync("token");
		uni.removeStorageSync("userInfo");
		// #endif
		state.token = ""
		state.userInfo = {}
	},
};
export const actions = {

};