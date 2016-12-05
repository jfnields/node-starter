import { Router } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import routes from "../../client/routes";
import jsdom from "jsdom";

const router = Router(),
    env = process.env.NODE_ENV || "development";

router.get("/", function(req, res) {
    jsdom.env(
        {
            url: req.url,
            referrer: req.get("referer"),
            cookie: req.get("cookie"),
            userAgent: req.get("user-agent"),
            done: function(err, window) {
                console.log("created dom.");
                matchRoutes(req, res, window);
            }
        }
    );
});

function matchRoutes(req, res, window) {
    match({ routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search);
        } else if (!props) {
            res.status(404).send("Not Found");
        }
        const options = {
            title: "Express",
            lang: "en"
        };
        global.window = window;
        console.log("setting window as global: ");
        options.markup = renderToString(<RouterContext {...props}/>);
        if (env === "development") {
            options.bundlePath = "hot-reload-server/bundle.js";
        } else {
            options.bundlePath = "public/build/bundle.js";
        }
        res.render("index", options);
    });
}
module.exports = router;
