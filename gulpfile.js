var SRC_PATH = "src/";
var BUILD_PATH = "build/";


var gulp  = require("gulp"),
    gutil = require("gulp-util");

var runMainTask = function( taskName, options ){
    var taskSelf = require("./tasks/"+ taskName + "/main.js");
    var librariesForTask = {
        gutil: gutil
    };
    return new taskSelf(gulp, options, librariesForTask);
};

var paths = {
    esprima: {
        src: SRC_PATH + "*.js",
        target: SRC_PATH + "esprima/"
    },
    translator : {
        src: SRC_PATH + "esprima/*.js",
        target: SRC_PATH + "real-translator/"
    },
    commenter: {
        src: SRC_PATH + "*.js",
        feed: SRC_PATH + "real-translator/",
        external: "./docsrc/",
        target: BUILD_PATH + "dist/"
    }
};

//generates the esprima files
runMainTask("esprima", {
    config: {
        pretty: true
    },
    src: paths.esprima.src,
    target: paths.esprima.target
});

runMainTask("translator", {
    config: {
        pretty: true
    },
    src: paths.translator.src,
    target: paths.translator.target
});

runMainTask("commenter", {
    config:{
        feed: paths.commenter.feed,
        external: paths.commenter.external
    },
    src: paths.commenter.src,
    target: paths.commenter.target
});

gulp.task("default", ["esprima", "translator", "commenter"]);
