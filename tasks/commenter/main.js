var through2 = require("through2");
var wrapperText = require("./helper/wrapper-text");

var renderTemplate = function(template, data){
    var result = "";
    for(var key in data){
        var toReplace = new RegExp("{{"+ key.toUpperCase()+"}}", "gi");
        result+= template.replace(toReplace, data[key]);
    }
    return result;
};

var Task = function( gulp, options, libraries ){
    var withCommentInPipe = function(){
        return through2.obj(function( file, encoding, callback){
            if(file.isNull()){
                this.push(file);
                return callback();
            }

            try {
                var toInsert = "/** Hi :D\n ";
                toInsert    += "*  I'm a dummy content! and this is a function called {{NAME}} \n";
                toInsert    += " */\n";

                objWrapperContent  = new wrapperText(file.contents);

                var order = [
                    "suma",
                    "resta"
                ];

                for(var i = 0; i < order.length; i++){
                    objWrapperContent.searchAndDo(order[i], function(founded, lines){
                        objWrapperContent.appendContentToLine(lines[0], renderTemplate(toInsert, {
                                name: order[i]
                            }
                        ));
                    });
                }

                file.contents = new Buffer(objWrapperContent.getContent());
                this.push(file);

            } catch(err){
                console.warn("Error caught commenter:" + err);
                this.push(file);
            }

            return callback();
        });
    };

    var taskSelf = function(){
        gulp.src(options.src)
            .pipe(withCommentInPipe())
            .pipe(gulp.dest(options.target))
    };

    gulp.task("commenter", taskSelf);
}
module.exports = Task;

