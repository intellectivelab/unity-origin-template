# Unity Origin React Template

The official Unity template for [Create React App](https://github.com/facebook/create-react-app)

## Prerequisites

* You’ll need to have Node >= 8.10 on your local development machine. 
Download and install nodejs - https://nodejs.org/en/download/

* Install yarn:
```npm install -g yarn```

* Install create-react-app tool:
```npm -g install create-react-app```

* Setup Intellective NPM repository:   
    1. [Encrypt](https://help.sonatype.com/repomanager3/formats/npm-registry#npmRegistry-AuthenticationUsingBasicAuth) your Intellective credentials in the following format: **intellective_email:password**.
       [Bade64 Encode/Decode Online](https://www.base64encode.org)
    2. Put encrypted string into your ~/.npmrc file (create if absent)
        ```text
        email=ichukanov@intellective.com 
        always-auth=true 
        _auth=INSERT_ENCRYPTED_PASSWORD_HERE
        ```
        **Note: .npmrc should be in the user home directory.**
    3. Run command, 
        ```sh
        npm set @intellective:registry https://npm.intellective.com/repository/npm-main/
       ```
     
    Check your .npmrc file, it should look like the following:

    ```text
     @intellective:registry=https://npm.intellective.com/repository/npm-main/
     email=!your-id@intellective.com
     always-auth=true
     _auth=[YOUR_ENCRYPTED_CREDENTIALS]
    ```

## Usage

To use this template, add --template @intellective/unity-origin when creating a new app.

For example:

```sh
create-react-app my-app --template @intellective/unity-origin

# or
npx create-react-app my-app --template @intellective/unity-origin

# or
yarn create-react-app my-app --template @intellective/unity-origin
```
Check out README file in the app folder.

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
