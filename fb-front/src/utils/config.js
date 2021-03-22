var isDev = process.env.NODE_ENV === 'development'
var token = '' // 浏览器自用token
var host = 'http://test.api.kdkdcn.com/'
var staticHost = 'http://localhost:8080/'
var amapKey = '7acb6cbb0082e9a87c14b64762fc31d5' // 高德地图的key
var isTest = true // 测试
var isProduction = false // 是否正式环境
if (isDev) {
	host = 'https://live.aicai.com/'
	staticHost = 'http://localhost:8080/'
}
if (isTest) {
	host = 'https://live.aicai.com/'
	staticHost = 'https://test-m.kdkdcn.com/'
}
if (isProduction) {
	host = 'https://live.aicai.com/'
	staticHost = 'http://localhost:8080/'
}
module.exports = {
	token: token,
	host: host,
	staticHost,
	isDev: isDev,
	isTest: isTest,
	amapKey: amapKey,
	homepage: '/pages/main/main',
	defaultImg: {
		shareDetailBk: 'https://image.kdkdcn.com/wxApplet/1600003953129.png',
		assets: {}
	},
	ShareMessage: {
		title: '优质单身活动，快来奔现', // 当前小程序名称
		desc: '优质单身活动，快来奔现', // 描述
		imageUrl: 'https://image.kdkdcn.com/h5/1601277336941.png', // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		path: '/pages/index/index' // 当前页面 path ，必须是以 / 开头的完整路径
	}
}
