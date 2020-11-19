This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn mocks`

Runs the API mocks that come with the Unity React template. Using API mocks allows creating UI components with zero dependencies on backend systems.<br />

By default, the server is available by [http://localhost:4000](http://localhost:4000). <br/>

**Note: server requires dev dependencies to be installed.** <br/>

Run the following command to install dev dependencies:
`yarn add --dev @intellective/unity-api-mocks`

### `yarn start`

Runs the app in dev mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

**Note: in order to start the app in dev mode, it requires a proxy to the Unity API**

Check out the default proxy configuration in `src/setupProxy.js`. 

### `mvn clean install`

This command builds a standalone application for production use. <br>

It also creates a bundle (jar file) containing only UI scripts. <br/> 