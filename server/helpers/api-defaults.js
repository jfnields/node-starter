exports.methodNotAllowed = (Resource, message) => {
    return (req, res) => {

    };
};

exports.unauthorized = (Resource, message) => {
    return (req, res) => {

    };
};

exports.get = Resource => {
    return (req,res) => {
        let query = req.params.id;
        const size = Math.min(req.params.$pageSize || 10, 1000);
        delete req.params.$pageSize;

        if (query == null) {
            query = req.params;
        }
        Resource.find(query, size, (err,items) => {
            res.json(items);
        });
    };
};

exports.put = (Resource) => {
    return (req, res) => {
        // const id = req.params.id;
        let toUpdate = req.body;
        // validatePut(req,res);
        if (Array.isArray(toUpdate)) {
            return;
        } else {
            toUpdate = new Resource(toUpdate);
            toUpdate.update(err => {
                if(err) {
                    res.json(err, 400);
                } else {
                    res.json(toUpdate);
                }
            });
        }
    };
};

exports.post = (Resource) => {
    return (req, res) => {
        // const id = req.params.id;
        let toPost = req.body;
        // validatePut(req,res);
        if (Array.isArray(toPost)) {
            return;
        } else {
            toPost = new Resource(toPost);
            toPost.save(err => {
                if(err) {
                    res.json(err, 400);
                } else {
                    res.json(toPost);
                }
            });
        }
    };
};

exports.delete = (Resource) => {
    return (req, res) => {
        // const id = req.params.id;
        let toPost = req.body;
        // validatePut(req,res);
        if (Array.isArray(toPost)) {
            return;
        } else {
            toPost = new Resource(toPost);
            toPost.save(err => {
                if(err) {
                    res.json(err, 400);
                } else {
                    res.json(toPost);
                }
            });
        }
    };
};
