const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
	const apiFilter  = (pathname) => pathname.match('^/api') || pathname.match('^(/.*)?/public/api');
	const notificationsFilter = (pathname) => pathname.match('^/notifications');

	// default proxy setup to the mock(dev) server
	app.use(createProxyMiddleware(apiFilter, {
		target: 'http://localhost:4000',
		pathRewrite: {'^/api/1.0.0': '/api'}
	}));

	app.use(createProxyMiddleware(notificationsFilter, {
		target: 'http://localhost:4000'
	}));

	/**
	 * Proxy setup to the running Unity application (Example)
	 * Note: the .env file should have the same port as the running instance of Unity.
	 * For example, if the Unity application is running on 9081 port, the .evn file should have 9081.
	 */
	/*app.use(createProxyMiddleware(filter, {
		target: 'http://172.31.20.119:9081/react-demo',
		pathRewrite: {
			'^/react-demo': '',
			'^/api': '/public/api'
		},
		auth: "p8admin:V3ga123456"
	}));*/
};