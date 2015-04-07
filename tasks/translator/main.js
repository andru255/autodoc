var through2 = require("through2");
var Task = function(gulp, options, libraries){

    var templates = "@method {{methodName}}";

    var rulesInStatement = function(dataType, dataName){
        var rules = {
            "FunctionExpression": function(dataName) {
                return "@method " + dataName;
            }
        };
        return rules[dataType](dataName);
    };

    var readJSON = function(data) {
        var result = "";
        var body = data.body;
        var item = "";
        var index;
        for(index = 0; index < data.body.length; index++ ){
            item = data.body[index].declarations[0];
            result += rulesInStatement(item.init.type, item.id.name);
        }
        return result;
    };

    var readerInPipe = function(){
        return through2.obj(function( file, encoding, callback){
            if(file.isNull()){
                this.push(file);
                return callback();
            }

            try {
                var stringCode = String(file.contents),
                    jsonCode = JSON.parse(stringCode),
                    test = readJSON(jsonCode);

                file.contents = new Buffer(test);
                this.push(file);

            } catch(err){
                console.warn("Error caught from translator:" + err);
                this.push(file);
            }

            return callback();
        });
    };

    var taskSelf = function(){
        gulp.src(options.src)
            .pipe(readerInPipe())
            .pipe(gulp.dest(options.target))
    };

    gulp.task("translator", taskSelf);
}
module.exports = Task;
