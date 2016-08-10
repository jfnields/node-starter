const notAllowed = require("../helpers/api-defaults").methodNotAllowed;
const User = db => {
    return db.define(
        "user", {
            "firstName": String,
            "lastName": String,
            "hashedPassword": Buffer,
            "schema": "gum"
        },
        {
            methods: {

            }
        }
    );
};
User.get = User.put = User.delete = User.post = notAllowed;
module.exports = User;
