module.exports = {
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        // "eslint:all",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        // overrides
        "react/prop-types": "off",
        "no-mixed-spaces-and-tabs": "off",
        "react/display-name": "off",
	    "func-style": "off",

        "semi": "error",
        "no-eq-null": "error",

        "implicit-arrow-linebreak": "warn",
        "no-unused-vars": "warn"
    }
};