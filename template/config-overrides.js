const path = require('path');

const rewireCompressionPlugin = require('react-app-rewire-compression-plugin');

module.exports = {
	paths: function (paths, env) {
		paths.appSrc = path.resolve(__dirname, 'src/main/react');
		paths.appIndexJs = path.resolve(__dirname, 'src/main/react/index.js');

		if (process.env.BUILD_TARGET === "unity") {
			paths.appBuild = path.resolve(__dirname, 'build-unity');
		}

		return paths;
	},

	webpack: function(config, env) {
		if (env === 'production') {
			// Compress generated js files
			config = rewireCompressionPlugin(config, env, {
				test: /\.js(\?.*)?$/i,
				cache: true
			})

		}
		return config
	}
};
