# Unity React Template

The official Unity template for [Create React App](https://github.com/facebook/create-react-app)

## Prerequisites

* You’ll need to have Node >= 8.10 on your local development machine. 
Download and install nodejs - https://nodejs.org/en/download/

* Install yarn:
```npm install -g yarn```

* Install create-react-app tool:
```npm -g install create-react-app```

* Setup Intellective NPM repository:   
    1. [Encrypt](https://help.sonatype.com/repomanager3/formats/npm-registry#npmRegistry-AuthenticationUsingBasicAuth) your Intellective credentials.
    2. Put encrypted string into your ~/.npmrc file (create if absent)
        ```text
        email=ichukanov@intellective.com 
        always-auth=true 
        _auth=INSERT_ENCRYPTED_PASSWORD_HERE
        ```
    3. Run command, 
        ```sh
        npm set @intellective:registry https://npm.intellective.com/repository/npm-main/
       ```
 
## Usage

To use this template, add --template @intellective/unity-origin when creating a new app.

For example:

```sh
npx create-react-app my-app --template @intellective/unity-origin
# or
yarn create react-app my-app --template @intellective/unity-origin
```
Check out README file in the app folder.

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.