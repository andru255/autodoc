var SyntaxNamespace = function(node, config){
    this.nodeToCompare = {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "yOSON"
          },
          "property": {
            "type": "Identifier",
            "name": "version"
          }
        },
        "right": {
          "type": "Literal",
          "value": "0.0.1",
          "raw": "\"0.0.1\""
        }
      }
    };

    this.config = config || {consider:[]};
    this.node = node;
    this.tags = [ "@namespace"];
    this.result = {};
};

SyntaxNamespace.prototype.isUpperCase = function(value){
    return /^[A-Z0-9_]*$/.test(value);
};

SyntaxNamespace.prototype.getDeclaration = function(){
    var keyName = "expression";
    var declaration;
    var result = {};
     if(this.checkType()){
         if(this.node[keyName]){
             declaration = this.node[keyName];
             result.type  = declaration.init.type;
             result.name  = declaration.id.name;
             result.value = declaration.init.value;
         } else {
            result.none = true;
         }
     } else {
         result.none = true;
     }
     return result;
};

SyntaxNamespace.prototype.checkType = function(){
    var keyName = "type";
    return this.node[keyName] == this.nodeToCompare[keyName];
};

SyntaxNamespace.prototype.generateData = function(whenIsConstant, whenNoIsConstant){
    var declaration = this.getDeclaration();
    if(this.config.consider.indexOf(declaration.name) == -1){
        if(this.isUpperCase(declaration.name)){
            declaration.tags = this.tags;
            whenIsConstant.call(this, declaration);
        } else {
            whenNoIsConstant.call(this);
        }
    } else {
        declaration.tags = this.tags;
        whenIsConstant.call(this, declaration);
    }
};

module.exports = SyntaxNamespace;
