const express = require("express"),
    router = express.Router(),
    env = process.env.NODE_ENV || "development";

/* GET home page. */
router.get("/", function(req, res) {
    const options = {
        title: "Express",
        lang: "en"
    };
    if (env === "development") {
        options.bundlePath = "hot-reload-server/bundle.js";
    } else {
        options.bundlePath = "public/build/bundle.js";
    }
    res.render("index", options);
});

module.exports = router;
