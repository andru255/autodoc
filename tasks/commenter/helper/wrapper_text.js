var wrapperText = function( content ) {
    this.content = String(content);
};

wrapperText.prototype.getTotalLines = function() {
    var lines = this.content.split("\n");
    return lines.length - 1;
};

wrapperText.prototype.prependContentToLine = function( numLine, text ) {
    var lines = this.content.split("\n");
    lines[numLine - 1] = text + lines[numLine -1];
    this.content = lines.join("\n");
};

wrapperText.prototype.appendContentToLine = function( numLine, text ) {
    var lines = this.content.split("\n");
    lines[numLine] = text + lines[numLine];
    this.content = lines.join("\n");
};

wrapperText.prototype.getContent = function() {
    return this.content;
};

wrapperText.prototype.search = function(queryString){
    var lines = this.content.split("\n");
    var index;
    var results = []
    for(index = 0; index < lines.length; index++){
        if(lines[index].indexOf(queryString) != -1){
            results.push(index);
        }
    }
    return {
        founded:this.content.indexOf(queryString),
        lines: results
    };
};

wrapperText.prototype.searchAndDo = function(queryString, whenItsFounded){
    var search = this.search.call(this, queryString);
    whenItsFounded.call(this, search.founded, search.lines);
};
module.exports = wrapperText;
