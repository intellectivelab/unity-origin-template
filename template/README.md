# Unity Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the Unity Origin template.

## Available Scripts

In the project directory, you can run:

### ```yarn start```
Runs the app in the development mode.

Open http://localhost:9081 to view it in the browser. To change the default port, modify the **.env.development** file.

In dev mode, there are two variants of using the API.

#### Proxying Unity API

In order to connect the app to a running Unity instance, it requires a proxy setup.
Check out the default proxy configuration in the `src/setupProxy.js`.

First, install `http-proxy-middleware` using yarn:

```shell
yarn add http-proxy-middleware
```

Next, navigate to the `src/setupProxy.js`. It should have a content like the following:

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // ...
};
```

You can now register proxies as you wish! Here's an example using the above http-proxy-middleware:

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	const filter = (pathname) => pathname.match('^/api') || pathname.match('^(/.*)?/public/api');

	/**
	 * Proxy setup to the running Unity application (Example)
	 * Note: the .env file should have the same port as the running instance of Unity.
	 * For example, if the Unity application is running on 9081 port, the .evn file should have 9081.
	 */
	app.use(createProxyMiddleware(filter, {
		target: 'http://unity-dev-host:9081/unity',
		pathRewrite: {
			'^/unity': '',
			'^/api': '/public/api'
		},
		auth: "p8admin:V3ga123456"
	}));
};
```

>Note: You do not need to import this file anywhere. It is automatically registered when you start the development server.

>Note: This file only supports Node's JavaScript syntax. Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).

>Note: Passing the path to the proxy function allows you to use globbing and/or pattern matching on the path, which is more flexible than the express route matching.

>Note: In dev mode, the app and the Unity instance can't be run on one machine as they should be using the same port.

#### Proxying Mock API

`yarn mocks`

Runs a **node.js** server that provides a mock implementation for the Unity API. By default, the server is available by [http://localhost:4000](http://localhost:4000).
Using mock API, allows creating UI components with zero dependencies on the backend systems.

First, install `@intellective/unity-api-mocks` using yarn:

```shell
yarn add --dev @intellective/unity-api-mocks
```

Next, navigate to the `src/setupProxy.js`.

You should now register a proxy to the mock server:

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	const filter = (pathname) => pathname.match('^/api') || pathname.match('^(/.*)?/public/api');

	app.use(createProxyMiddleware(filter, {
		target: 'http://localhost:4000',
		pathRewrite: {'^/api/1.0.0': '/api'}
	}));
};
```

Run `yarn mocks`.

### ```yarn test```
Launches the test runner in the interactive watch mode. See the section about running tests for more information.

### ```yarn build```
Builds react scripts for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
If necessary, classnames and function names can be enabled for profiling purposes.
See the production build section for more information.

### ```mvn package```
Builds the app for production to the target folder. The target folder contains an executable jar file with a **spring-boot-loader**.

Spring Boot Loader-compatible jar files should be structured in the following way:

```text
my-app.jar
 |
 +-META-INF
 |  +-MANIFEST.MF
 +-org
 |  +-springframework
 |     +-boot
 |        +-loader
 |           +-<spring boot loader classes>
 +-BOOT-INF
    +-classes
    |  +-com.intellective
    |     +-unity
    |        +-UnityApplication.class
    |        +-WebSecurityConfig.class
    +-lib
       +-dependency1.jar
       +-dependency2.jar
```
Read more about the executable jar format [here](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-executable-jar-format.html)

Your app is ready to be deployed!
