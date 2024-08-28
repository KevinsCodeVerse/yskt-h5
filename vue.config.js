module.exports = {
	devServer: {
		// 配置不同的后台API地址
		proxy: {
			'/apiV2': {
				// target: "http://www.pengfkt.com/apiV2/",
				target: "http://156.236.66.97:6444/apiV2/",
				// target: "http://127.0.0.1:9000/",
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/apiV2': '',
				}
			}
		}
	}
}