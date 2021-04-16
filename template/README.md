# Unity Origin Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in dev mode.<br />

**Note: in order to start the app in dev mode, it requires a proxy to the Unity API**

Check out the default proxy configuration in `src/setupProxy.js`. 

### `yarn mocks`

Runs the dev server that provides the Unity API mock endpoints. Using API mocks allows creating UI components with zero dependencies on backend systems.<br />

By default, the server is available by [http://localhost:4000](http://localhost:4000). <br/>

**Note: server requires dev dependencies to be installed.** <br/>

Run the following command to install dev dependencies:
`yarn add --dev @intellective/unity-api-mocks`

### `mvn clean install`

This command builds a standalone application for production use. <br>
