var through2 = require("through2");
//Exporter
var Exporter = require("./exporter");

var readConfigFile = function(){
    var parsed = {};

};

var Task = function(gulp, options, libraries){
    var readerInPipe = function(){
        return through2.obj(function( file, encoding, callback){
            if(file.isNull()){
                this.push(file);
                return callback();
            }

            try {
                var stringCode = String(file.contents),
                    objExporter = new Exporter(stringCode, {
                        constant: {
                            consider: ["yOSON"]
                        }
                    });

                file.contents = new Buffer(objExporter.generateData());
                this.push(file);

            } catch(err){
                console.warn("Error caught from translator:" + err);
                this.push(file);
            }

            return callback();
        });
    };

    var taskSelf = function(){
        return gulp.src(options.src)
            .pipe(readerInPipe())
            .pipe(gulp.dest(options.target))
    };

    gulp.task("translator", taskSelf);
}
module.exports = Task;
