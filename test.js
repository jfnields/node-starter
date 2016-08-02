const webpack = require("webpack"),
    config = require("./webpack.config").testConfig,
    Mocha = require("mocha"),
    path = require("path"),
    Module = module.constructor,
    MemoryFs = require("memory-fs"),
    memoryFs = new MemoryFs(),
    output = path.resolve(
        config.output.path,
        config.output.filename
    ),
    clear = require("clear"),
    glob = require("glob"),
    chokidar = require("chokidar"),
    watch = process.argv.indexOf("--watch") > -1,
    jsdom = require("jsdom").jsdom,
    exposedProperties = ["window", "navigator", "document"],
    testsGlob = "./client/specs/**/*.js";

let watcher,
    runner;

setupGlobals();
compileAndRun();

function setupGlobals() {
    global.document = jsdom("");
    global.window = global.document.defaultView;
    Object.keys(global.document.defaultView).forEach((property) => {
        if (typeof global[property] === "undefined") {
            exposedProperties.push(property);
            global[property] = global.document.defaultView[property];
        }
    });
    global.navigator = {
        userAgent: "node.js"
    };
    global.documentRef = global.document;

    config.entry = glob.sync(testsGlob);
    if(watch) {
        chokidar.watch(testsGlob)
            .on("add", () => {
                config.entry = glob.sync(testsGlob);
                compileAndRun({});
            })
            .on("unlink", () => {
                config.entry = glob.sync(testsGlob);
                compileAndRun({});
            });
    }
    // change Mocha to load modules from the in-memory fs
    // instead of via the ordinary require
    const newFunc = `(function(require){
        return ${Mocha.prototype.loadFiles.toString()};
    }(${mfsRequire.name}));`;
    Mocha.prototype.loadFiles = eval(newFunc);
}

// compile a file from the in-memory fs into a module
function mfsRequire(file) {
    // we're not using the require cache because
    // we are only requiring the webpack bundle
    // of all the tests.

    // this function is only called
    // when it changes.
    const m = new Module(),
        src = memoryFs.readFileSync(file);
    m._compile(src.toString(), file);
    return m.exports;
}

function compileAndRun() {

    watcher && watcher.close();

    const compiler = webpack(config);
    compiler.outputFileSystem = memoryFs;

    compile();
    function compile() {
        if (watch) {
            let thisWatcher = watcher = compiler.watch({}, (err) => {

                // this is not the most recent watcher.
                // files have changed since
                // this bundle was created
                if (thisWatcher !== watcher)
                    return;

                if (err) {
                    console.error(err);
                    return;
                }

                // last runner is still running tests.
                // let's let it finish before we try
                // running them again.
                if (runner)
                    runner.abort();
                run();
            });
        } else {
            compiler.run(() => {
                run(() => process.exit(0));
            });
        }
    }

    function run(fn) {
        try {
            clear(true);
            runner = new Mocha().addFile(output).run();
            runner.on("end", () => {
                runner = null;
                fn && fn();
            });
        } catch(e) {
            console.error(e);
            runner = null;
        }
    }
}
