const autoprefixer = require("autoprefixer"),
    webpack = require("webpack"),
    path = require("path");

module.exports =  {
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
                    "babel?"
                        + "presets[]=react"
                        + "&presets[]=es2015"
                        + "&plugins[]=transform-strict-mode"
                ],
            },
            {
                "test": /\.s[ac]ss?$/,
                "loaders": [
                    "css/locals?modules&camelCase",
                    "postcss",
                    "sass?outputStyle=compressed"
                ]
            },
            {
                "test": /\.css$/,
                "loaders": [
                    "css/locals?modules&camelCase",
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
    "entry": "./src/client",
    "eslint": {
        "failOnWarning": true,
        "failOnError": true
    },
    "output": {
        "path": path.join(__dirname, "public", "build"),
        "filename": "bundle.js"
    },
    "plugins": [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],
    "stats": {

    }
};
