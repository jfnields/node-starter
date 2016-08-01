const config = require("./webpack.config"),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    express = require("express"),
    proxy = require("proxy-middleware"),
    url = require("url"),
    app = express(),
    port = process.env.PORT || 3000,
    proxyPort = process.env.PROXY_PORT || 35412;

app.use(
    "/public",
    proxy(url.parse(`http://localhost:${proxyPort}/public/`))
);

app.use(
    "/api",
    proxy(url.parse(`http://localhost:${proxyPort}/public/`))
);

app.get(
    "/*",
    function(req, res) {
        res.sendFile(`${__dirname}/server/views/index.html`);
    }
);

const server = new WebpackDevServer(
    webpack(config.devConfig),
    {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: "/public/",
        stats: {
            colors: true,
            errorDetails: true
        }
    }
);

server.listen(proxyPort, "localhost");
app.listen(port);
