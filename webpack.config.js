const proxyPort = require("./server/config").proxyPort,
    autoprefixer = require("autoprefixer"),
    webpack = require("webpack"),
    path = require("path");

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
                    + "presets[]=react&presets[]=es2015&"
                    + "plugins[]=transform-strict-mode"
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

const devConfig = {
    module: wpModule,
    resolve,
    postcss,
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
        "path": `${__dirname}/hot-reload-server/`,
        "publicPath": `http://localhost:${proxyPort}/hot-reload-server/`,
        "filname": "bundle.js"
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ]
};

const testConfig = {
    module: wpModule,
    resolve,
    postcss,
    "eslint": {
        "failOnWarning": false,
        "failOnError": true
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

const prodConfig = {
    module: wpModule,
    resolve,
    postcss,
    "entry": "./client/app.js",
    "eslint": {
        "failOnWarning": true,
        "failOnError": true
    },
    "output": {
        "path": path.join(__dirname, "public", "build"),
        "filname": "bundle.js"
    },
    "plugins": [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "'production'"
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],
    "stats": true
};

module.exports = {
    devConfig,
    testConfig,
    prodConfig
};
