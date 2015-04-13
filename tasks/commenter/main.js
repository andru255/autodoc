var through2 = require("through2");
var path = require("path");
var gutil = require("gulp-util");

var Helper_WrapperText = require("./helper/wrapper_text");
var Helper_StringFile = require("./helper/string_file");

var parseFeedContent = function(path, fileName, whenExistsFile, whenFileNotExists) {
    var defaultContent = {order:[]},
        feedContent;
    try {
        var fileContent =  Helper_StringFile(path, fileName);
        whenExistsFile.call(this, JSON.parse(fileContent));
    } catch(err){
        if(typeof whenFileNotExists === "function"){
            whenFileNotExists.call(this, err);
        }
    }
};

var printTags = function(tags){
    var result = "";
    for(var i = 0; i < tags.length; i++){
        result += gutil.template("* <%= tag %>\n", {tag: tags[i], file:""} );
    }
    return result;
};

var printComment = function(dataObject) {
    var startComment        = "/**\n";
    var endComment          = "**/\n";
    var templateConstant    = "";

    var template            = startComment;

    var dynamicFeedtemplate = "* @property <%= name %>\n";
    dynamicFeedtemplate    += "* @type <%= type %>\n";

    template += gutil.template(dynamicFeedtemplate, {
        "name": dataObject.name,
        "type": dataObject.type,
        "file": ""
    });

    template += printTags(dataObject.tags);
    template += endComment;

    return template;
};

var Task = function( gulp, options, libraries ){
    var withCommentInPipe = function(){
        return through2.obj(function( file, encoding, callback){
            if(file.isNull()){
                this.push(file);
                return callback();
            }

            try {
                var that = this;
                var objWrapperContent  = new Helper_WrapperText(file.contents);
                parseFeedContent(options.config.feed, path.basename(file.history), function(parsedContent){
                    var order = parsedContent.items;
                    console.log('order', order);
                    for(var i = 0; i < order.length; i++){
                        objWrapperContent.searchAndDo(order[i].name, function(founded, lines){
                            objWrapperContent.appendContentToLine(lines[0], printComment(order[i]));
                        });
                    }
                    file.contents = new Buffer(objWrapperContent.getContent());
                    that.push(file);
                });

            } catch(err){
                console.warn("Error caught commenter:" + err);
                this.push(file);
            }

            return callback();
        });
    };

    var taskSelf = function(){
        return gulp.src(options.src)
            .pipe(withCommentInPipe(options.config))
            .pipe(gulp.dest(options.target))
    };

    gulp.task("commenter", taskSelf);
}
module.exports = Task;

