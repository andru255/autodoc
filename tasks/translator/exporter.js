//Datatypes
var Datatype_Variable = require("./datatype/variable");
//Syntax
var SyntaxConstant = require("./syntax/constant");

var exporter = function(data){
    this.readJSON(data);
};

exporter.prototype.readJSON = function(data) {
    this.dataJSON = JSON.parse( data );
};

exporter.prototype.eachNode = function(whichNode){
    var i;
    if(this.dataJSON.body){
        var body = this.dataJSON.body;
        var node;
        for( i=0; i < body.length; i++ ){
            node = body[i];
            whichNode.call(this, i, node);
        }
    }
};

exporter.prototype.verifySyntax = function(nodeToTranslate, whenItsDone) {
    var result = {};
    var objConstant = new SyntaxConstant(nodeToTranslate);
    var objDataType;
    objConstant.generateData(function(nodeResult){
        objDataType = new Datatype_Variable(nodeResult.value);
        nodeResult.type = objDataType.getDataType();
        whenItsDone.call(this, nodeResult);
    }, function(){

    });
};

exporter.prototype.generateData = function() {
    var dataToExport = {};
    var items = [];
    var that = this;

    this.eachNode(function(i, node){
        that.verifySyntax(node, function(translatedNode){
            items.push(translatedNode);
        });
    });

    dataToExport.items = items;
    return JSON.stringify(dataToExport);
};

module.exports = exporter;
