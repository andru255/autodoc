var ParseTemplate = function(template, data){
    var result = "";
    for(var key in data){
        var toReplace = new RegExp("{{"+ key.toUpperCase()+"}}", "gi");
        result+= template.replace(toReplace, data[key]);
    }
    return result;
};

module.exports = ParseTemplate;
