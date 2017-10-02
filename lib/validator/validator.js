var joi = require("joi");
var _ = require("lodash");

var check = function validate(schema,data){
    if(schema){
        var joiReturn = joi.validate(data,schema)

        if(joiReturn.error){
            (joiReturn.error._object && delete joiReturn.error._object);
            (joiReturn.error.details && 
                delete _.forEach(joiReturn.error.details,function(val){
                delete val.context
            }));            
        }

        return joiReturn;
    }
}
var validate = function(schema,data){

    if(data){
        return check(schema,data);
    }
    else{
        function validate(req,res,next){
            
            var joiReturn = check(schema,req.body,schema)

            if(joiReturn && joiReturn.error){
                delete joiReturn.error._object;
                res.send(422,joiReturn.error);
                return;
            }

            next();
        }
        return validate;
    }
}

module.exports = {
    validate,
    check
}