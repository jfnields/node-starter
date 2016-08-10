const express = require("express"),
    path = require("path"),
    favicon = require("serve-favicon"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    // ntlm = require("express-ntlm"),
    routes = require("./routes/index"),
    api = require("./routes/api"),
    config = require("../webpack.config"),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    proxy = require("proxy-middleware"),
    url = require("url"),
    proxyPort = require("./config").proxyPort;

const app = express();


if (app.get("env") === "development") {
    app.use(
        "/hot-reload-server",
        proxy(url.parse(`http://localhost:${proxyPort}/hot-reload-server/`))
    );
    new WebpackDevServer(
        webpack(config.devConfig),
        {
            contentBase: __dirname,
            hot: true,
            quiet: false,
            noInfo: false,
            publicPath: "/hot-reload-server/",
            stats: "errors-only"
        }
    ).listen(proxyPort, "localhost");
} else {
    webpack(config.prodConfig);
}

// app.use(ntlm());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use("/", routes);
app.use("/api", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
} else {
    webpack(config.prodConfig, (err) => {
        if (err) throw err;
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


module.exports = app;
