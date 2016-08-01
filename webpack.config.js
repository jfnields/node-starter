const proxyPort = process.env.PROXY_PORT || 35412,
    autoprefixer = require("autoprefixer"),
    webpack = require("webpack");

const devConfig = {
    "entry": [
        `webpack-dev-server/client?http://localhost:${proxyPort}`,
        "webpack/hot/only-dev-server",
        "./client/app.js"
    ],
    "eslint": {
        "failOnWarning": false,
        "failOnError": true
    },
    "output": {
        "path": `${__dirname}/public/`,
        "publicPath": `http://localhost:${proxyPort}/public/`,
        "filname": "bundle.js"
    },
    "module": {
        "preLoaders": [
            {
                test: /\.jsx?$/,
                loader: "eslint",
                exclude: /(node_modules|public)/
            }
        ],
        "loaders": [
            {
                "exclude": /node_modules/,
                "test": /\.jsx?$/,
                "loaders": [
                    "react-hot",
                    "babel?"
                        + "presets[]=react&presets[]=es2015&"
                        + "plugins[]=transform-strict-mode",
                ],
            },
            {
                "test": /\.s[ac]ss?$/,
                "loaders": [
                    "style",
                    "css?modules",
                    "postcss",
                    "sass?outputStyle=compressed"
                ]
            },
            {
                test: /\.json$/,
                loader: "json",
            }
        ]
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ],
    "postcss": () => [autoprefixer],
    "resolve": {
        "extensions": [
            "",
            ".js",
            ".jsx",
            ".sass",
            ".scss",
            ".css",
            ".json"
        ]
    },
    "stats": {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
};

const testConfig = {
    "eslint": {
        "failOnWarning": false,
        "failOnError": false
    },
    externals: {
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    },
    "module": {
        "preLoaders": [
            {
                test: /\.jsx?$/,
                loader: "eslint",
                exclude: /(node_modules|public)/
            }
        ],
        "loaders": [
            {
                "exclude": /node_modules/,
                "test": /\.jsx?$/,
                "loaders": [
                    "babel?"
                        + "presets[]=react&presets[]=es2015&"
                        + "plugins[]=transform-strict-mode",
                ],
            },
            {
                "test": /\.s[ac]ss?$/,
                "loaders": [
                    "style",
                    "css?modules",
                    "postcss",
                    "sass?outputStyle=compressed"
                ]
            },
            {
                test: /\.json$/,
                loader: "json",
            }
        ]
    },
    "output": {
        "path": __dirname + "/build",
        "filename": "tests.js",
    },
    "postcss": () => [autoprefixer],
    "resolve": {
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
    },
    "stats": {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    "target": "node"
};

module.exports = {
    get devConfig() {
        return devConfig;
    },
    get testConfig() {
        return testConfig;
    }
};
