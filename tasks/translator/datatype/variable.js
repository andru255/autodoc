var Datatype_Variable = function(value){
    var that = this;
    this.value = value;

    this.dataType = {
        "isString"  : "String",
        "isInteger" : "Integer",
        "isFloat"   : "Float",
        "isBoolean" : "Boolean",
        "isArray"   : "Array",
        "isObject"  : "Object"
    };

    this.validators = {
        isString: function(value){
            return Object.prototype.toString.call(value) === '[object String]';
        },
        isInteger: function(value){
            return Number(value) === value && value%1 == 0;
        },
        isFloat: function(value){
            return value === +value && value !== (value|0);
        },
        isBoolean: function(value){
            return /^(true|false|1|0)$/ig.test(value);
        },
        isArray: function(value){
            return Object.prototype.toString.call(value) === "[object Array]";
        },
        isObject: function(value){
            return ( typeof value === "object" ) && ( value !== null);
        }
    };
};

Datatype_Variable.prototype.getDataType = function(){
    var value = this.value;
    var dataType = this.dataType;

    for(var validator in this.validators){
        if( this.validators[validator](value) ){
             return dataType[validator];
        }
    }
};

module.exports = Datatype_Variable;
