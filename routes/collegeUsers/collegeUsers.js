
'use strict'
var express = require("express");
var router = express.Router();


var schema = require("./schema");
var db = require("../../lib/resources/db")
var validator = require("../../lib/validator/validator");
var commonOptions = require("../../lib/routeBuilder/commonOptions")()
var routeBuilder = require("../../lib/routeBuilder/routeBuilder")
var errorHandler = require("../../lib/routeBuilder/errorHandler")
var encrytion = require("../../lib/utils/encrytion")


commonOptions.validations = require('./validations');
commonOptions.schema = require('./schema');
// routeBuilder.build(router,commonOptions);

/**
 * this route will be used to get hash and salt from password
 */
router.get("/getsaltandhash/:password",function(req,res){

    encrytion.getSaltAsync()
        .then(function(salt){
            req.salt = salt
            return encrytion.getHashAsync(req.params.password,salt)
        })
        .then(function(hash){
            res.send({
                salt:req.salt,
                hash:hash
            });
        })
        .catch(function(err){
            errorHandler.unexpectedError(err,res);
        })

})


/**
 * NOTE: this login function is used from routes/index.js
 * 
 * @param {*} req 
 * @param {*} res 
 */
function login(req,res){


    /**
     * Validate if login
     */
    errorHandler.ifJoiError(validator.validate(commonOptions.validations.login,req.body),res)
    
    /**
     * #schema.table is a sequalize object on which 
     * we can fire all db operation of sequalize for perticular table
     * 
     * hear to check validate login we will search wia email first 
     * once we have data of user with email we will get SALT  
     * from it and will apply salt on given password if it matches with 
     * db password then hurrey we will give JWT token
     */
    schema.table.findOne({
        where:{
            email:req.body.email,
        }})
        .then(function(data){
            /**
             * #data has user information with given email
             */
            if(data){
                /**
                 * get hash from obtained salt in data #data.salt
                 */
                encrytion.getHashAsync(req.body.password,data.salt)
                    .then(function(hash){
                        /**
                         * if we have matched generated hash with db password hash
                         * then hurrey we can give JWT token
                         */
                        if(hash == data.password){
                            
                            res.send({
                                token: encrytion.jwtEncode({
                                    id:data.id
                                }),
                                loginInfo:{
                                    collage_id:data.collage_id,
                                    full_name:data.full_name,
                                    email:data.email,
                                    contact_number:data.contact_number,
                                    last_login:data.last_login
                                }
                            });
                        }
                        else{
                            errorHandler.invalidUP(res)
                        } 
                    })
                    .catch(function(err){
                        errorHandler.unexpectedError(err,res)
                    })
            }
            else{
                errorHandler.invalidUP(res)
            }
        })
        .catch(function(err){
            errorHandler.unexpectedDbError(err,"Login",res)
        })

}


var ext = {
    login
}
module.exports = {
    ext,
    router
};