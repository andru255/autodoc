var esprima = require("esprima"),
    through2 = require("through2");

var Task = function(gulp, options, libraries){

    var esprimaInPipe = function(){
        var stringify = JSON.stringify;
        if(options.config.pretty){
            stringify = function (tree) {
                return JSON.stringify(tree, null, 2);
            }
        }

        return through2.obj(function( file, encoding, callback){
            if(file.isNull()){
                this.push(file);
                return callback();
            }

            try {
                var code = String(file.contents),
                    tree = esprima.parse(code, options.config || {});

                file.contents = new Buffer(stringify.call(undefined, tree));
                this.push(file);

            } catch(err){
                console.warn("Error caught from esprima.parse:" + err);
                this.push(file);
            }

            return callback();
        });
    };

    var taskSelf = function(){
        gulp.src(options.src)
            .pipe(esprimaInPipe(options.config))
            .pipe(gulp.dest(options.target))
    };

    gulp.task("esprima", taskSelf);
}
module.exports = Task;
