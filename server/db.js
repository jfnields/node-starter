const orm = require("orm");
orm.connect("", function(err,db) {
    module.exports = db;
});
