var SyntaxConstant = function(node){
    this.nodeToCompare = {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "CONST_APP"
          },
          "init": {
            "type": "Literal",
            "value": "MyApp",
            "raw": "\"MyApp\""
          }
        }
      ],
      "kind": "var"
    };

    this.node = node;
    this.tags = [ "@static", "@final" ];
    this.result = {};
};

SyntaxConstant.prototype.isUpperCase = function(value){
    return /^[A-Z0-9_]*$/.test(value);
};

SyntaxConstant.prototype.getDeclaration = function(){
    var keyName = "declarations";
    var declaration;
    var result = {};
     if(this.checkType()){
         if(this.node[keyName].length == 1){
             declaration = this.node[keyName][0];
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

SyntaxConstant.prototype.checkType = function(){
    var keyName = "type";
    return this.node[keyName] == this.nodeToCompare[keyName];
};

SyntaxConstant.prototype.generateData = function(whenIsConstant, whenNoIsConstant){
    var declaration = this.getDeclaration();
    if(this.isUpperCase(declaration.name)){
        declaration.tags = this.tags;
        whenIsConstant.call(this, declaration);
    } else {
        whenNoIsConstant.call(this);
    }
};

module.exports = SyntaxConstant;
