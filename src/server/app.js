import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import proxy from "proxy-middleware";
import url from "url";
import devConfig from "../../webpack.config.client.dev";
import { proxyPort } from "../../config";

const app = express();

if (app.get("env") === "development") {
    app.use(
        "/hot-reload-server",
        proxy(url.parse(`http://localhost:${proxyPort}/hot-reload-server/`))
    );
    new WebpackDevServer(
        webpack(devConfig),
        {
            contentBase: __dirname,
            hot: true,
            quiet: false,
            noInfo: false,
            publicPath: "/hot-reload-server/",
            stats: "errors-only"
        }
    ).listen(proxyPort, "localhost");
}

// app.use(ntlm());

// view engine setup
app.set("views", path.join(__dirname, "src", "server", "views"));
app.set("view engine", "pug");

app.use(
    favicon(
        path.join(__dirname, "public", "favicon.ico")
    )
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    "/public",
    express.static(
        path.join(__dirname, "public")
    )
);

app.use("/", routes);

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
