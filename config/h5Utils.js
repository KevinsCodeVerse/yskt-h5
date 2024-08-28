import store from '@/store';
import base from "@/config/baseUrl";

// 获取链接参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
// h5登录
export const h5Login = (callback) => {
	// if (isWechat()) {
	//     // 公众号登录
	//     var local = encodeURIComponent(window.location.href);
	//     var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + base.publicAppId + "&redirect_uri=" + local + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
	//     var code = getUrlParam("code");
	//     if (!code) {
	//         window.location = url;
	//     } else {
	//         var httpData = {
	//             code: code
	//         }
	//         uni.$u.http.post('/user/login', httpData).then((res) => {
	//             let userInfo = {
	//                 ...res,
	//                 token:true,//token用于判断是否登录
	//             }
	//             store.commit('setUserInfo',userInfo)
	//             callback && callback(res)
	//         })
	//     }
	// } else {
	//     // 通用登录页--验证码登录
	//     uni.showModal({
	//     	title:"温馨提示",
	//     	content:"您还未登录，请先登录~",
	//     	confirmText: "去登录",
	//     	cancelText: "再逛会",
	//     	success: (res) => {
	//     		if(res.confirm){
	//     			uni.navigateTo({
	//     				url: "/pages/user/login"
	//     			});
	//     		}
	//     	}
	//     });
	// }
	// 通用登录页--验证码登录
	uni.showModal({
		title: "温馨提示",
		content: "您还未登录，请先登录~",
		confirmText: "去登录",
		cancelText: "再逛会",
		success: (res) => {
			if (res.confirm) {
				uni.navigateTo({
					url: "/pages/user/loginPassword"
				});
			}
		}
	});
}
// 浏览器判断是否微信
export const isWechat = () => {
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		//console.log('是微信客户端')  
		return true;
	} else {
		//console.log('不是微信客户端')  
		return false;
	}
};


/**
 * 获取年月日 时分秒
 *
 * @param {String} dateStr 时间毫秒数
 * @returns 格式化后的时间
 */
export function getDate(dateStr, formate) {
	if (!dateStr) return ""
	return formatDate(dateStr, formate ? formate : "yyyy-MM-dd HH:mm:ss")
}
/**
 * 格式化时间
 *
 * @param {String} dateStr 时间毫秒数
 * @returns 格式化后的时间
 */
export function formatDate(dateStr, format) {
	if (!dateStr) return ""
	var date = new Date(parseInt(dateStr))
	return date.pattern(format)
}
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).pattern('yyyy-MM-dd hh:mm:ss.S')==> 2006-07-02 08:09:04.423
 * (new Date()).pattern('yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern('yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern('yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern('yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
		"H+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		S: this.getMilliseconds() // 毫秒
	}
	var week = {
		0: "\u65e5",
		1: "\u4e00",
		2: "\u4e8c",
		3: "\u4e09",
		4: "\u56db",
		5: "\u4e94",
		6: "\u516d"
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		)
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(RegExp.$1.length > 1 ?
				RegExp.$1.length > 2 ?
				"\u661f\u671f" :
				"\u5468" :
				"") + week[this.getDay() + ""]
		)
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			)
		}
	}
	return fmt
}