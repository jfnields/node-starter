const autoprefixer = require("autoprefixer");

const wpModule = {
    "preLoaders": [
        {
            test: /\.jsx?$/,
            loader: "eslint",
            exclude: /node_modules/
        }
    ],
    "loaders": [
        {
            "exclude": /node_modules/,
            "test": /\.jsx?$/,
            "loaders": [
                "react-hot",
                "babel?"
                    + "presets[]=react"
                    + "&presets[]=es2015"
                    + "&plugins[]=transform-strict-mode"
            ],
        },
        {
            "test": /\.s[ac]ss?$/,
            "loaders": [
                "style",
                "css?modules&camelCase",
                "postcss",
                "sass?outputStyle=compressed"
            ]
        },
        {
            test: /\.json$/,
            loader: "json",
        }
    ]
};
const resolve = {
    "root": __dirname,
    "extensions": [
        "",
        ".js",
        ".jsx",
        ".sass",
        ".scss",
        ".css",
        ".json"
    ]
};
const postcss = () => [autoprefixer];

module.exports = {
    module: wpModule,
    resolve,
    postcss,
    "eslint": {
        "failOnWarning": false,
        "failOnError": false
    },
    externals: {
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    },
    "output": {
        "path": __dirname + "/build",
        "filename": "tests.js",
    },
    "stats": {
        colors: true,
        modules: false,
        reasons: true,
        errorDetails: true
    },
    "target": "node"
};
