const proxyPort = require("./config").proxyPort,
    autoprefixer = require("autoprefixer"),
    webpack = require("webpack");

module.exports =  {
    devtool: "cheap-module-eval-source-map",
    module: {
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
                "test": /\.css$/,
                "loaders": [
                    "style",
                    "css?modules&camelCase",
                    "postcss"
                ]
            },
            {
                test: /\.json$/,
                loader: "json",
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file"
            }
        ]
    },
    resolve: {
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
    postcss: () => [autoprefixer],
    "entry": [
        `webpack-dev-server/client?http://localhost:${proxyPort}`,
        "webpack/hot/only-dev-server",
        "./src/client"
    ],
    "eslint": {
        "failOnWarning": false,
        "failOnError": true
    },
    "output": {
        "path": `${__dirname}/public/build`,
        "publicPath": `http://localhost:${proxyPort}/hot-reload-server/`,
        "filename": "bundle.js"
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ]
};
