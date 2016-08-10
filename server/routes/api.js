const express = require("express"),
    router = express.Router(),
    resources = require("../models"),
    i = require("inflected"),
    defaults = require("../helpers/api-defaults");

resources.forEach((Resource) => {
    const collection = i.dasherize(
        i.underscore(
            i.pluralize(Resource.name)
        )
    );

    // use defaults or
    router.get(
        collection + "/:id",
        Resource.get || defaults.get(Resource)
    );
    router.put(
        collection + "/:id",
        Resource.put || defaults.put(Resource)
    );
    router.post(
        collection,
         Resource.post || defaults.post(Resource)
     );
    router.delete(
        collection + "/:id",
        Resource.delete || defaults.delete(Resource)
    );

    // head / options have no default
    Resource.options && router.options(`${collection}/:id`, Resource.options);
    Resource.head && router.head(`${collection}/:id`, Resource.head);
});

module.exports = router;
