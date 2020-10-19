const path = require('path');

module.exports = {
	paths: function (paths, env) {
		paths.appSrc = path.resolve(__dirname, 'src/main/react');
		paths.appIndexJs = path.resolve(__dirname, 'src/main/react/index.js');

		if (process.env.BUILD_TARGET === "unity") {
			paths.appBuild = path.resolve(__dirname, 'build-unity');
		}

		return paths;
	},
};