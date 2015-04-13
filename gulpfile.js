var SRC_PATH = "src/";
var BUILD_PATH = "build/";


var gulp         = require("gulp"),
    gutil        = require("gulp-util"),
    runSequence  = require("run-sequence"),
    gclean       = require("gulp-clean");

var runMainTask = function( taskName, options ){
    var taskSelf = require("./tasks/"+ taskName + "/main.js");
    var librariesForTask = {
        gutil: gutil
    };
    return taskSelf(gulp, options, librariesForTask);
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

gulp.task("cleanEsprimaFiles", function(){
    return gulp.src(paths.esprima.target, {read: false})
               .pipe(gclean());
});

var dispatchTasks = function(queueTasks){
    var index = 0;
    var inEveryTask = function(taskName,onEnd){
        return function() {
            gulp.start(taskName, onEnd);
        }
    };
    var recursive = function(list){
        var nextTask = function(){
            index++;
            recursive(list);
        };
        if(index < list.length){
            gulp.task("taskWrapperInqueue::"+ list[index], inEveryTask(list[index],nextTask));
            gulp.start("taskWrapperInqueue::"+list[index]);
        }
    };
    recursive(queueTasks);
};

gulp.task("dispatchAutoDocTask", function(onEndTask){
    onEndTask(dispatchTasks(["esprima", "translator", "commenter"]));
});

gulp.task("cleanTranslatorFiles", function(){
    return gulp.src(paths.translator.target, {read: false}).pipe(gclean());
});

gulp.task("cleanCommenterFiles", function(){
    return gulp.src(paths.commenter.target, {read: false}).pipe(gclean());
});

gulp.task("clean", ["cleanEsprimaFiles", "cleanTranslatorFiles", "cleanCommenterFiles"]);
gulp.task("autodoc", ["dispatchAutoDocTask"]);

gulp.task("default", function(onEndTask){
    onEndTask(dispatchTasks(["clean", "autodoc"]));
});

