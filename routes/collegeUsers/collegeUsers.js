
'use strict'
var express = require("express");
var _ = require("lodash");
var S = require("string");

var validator = require("../../lib/validator/validator");

var schema = require("./schema");

var router = express.Router();
var db = require("../../lib/resources/db")

var MongoQs = require("mongo-querystring");

var ObjectId = require("mongoskin").ObjectId;


var commonOptions = require("../../lib/routeBuilder/commonOptions");
var routeBuilder = require("../../lib/routeBuilder/routeBuilder")
var errorHandler = require("../../lib/routeBuilder/errorHandler")
var encrytion = require("../../lib/utils/encrytion")

commonOptions.validations = require('./validations');
commonOptions.schema = require('./schema');
// routeBuilder.build(router,commonOptions);


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


function login(req,res){
    

    // encrytion.getSalt
    
    // $2a$10$ExKF4q3AA43hsYZ8S8AL6e
    encrytion.getHashAsync("root","$2a$10$ExKF4q3AA43hsYZ8S8AL6e")
        .then(function(hash){
            res.send(hash)
        })
    

    /**
     * Validate
     */
    // console.log("-------")
    // console.log(req.body);
    // errorHandler.ifJoiError(validator.validate(commonOptions.validations.login,req.body),res)
    
    // schema.table.findOne({
    //     where:{
    //         email:req.body.email,
    //     }})
    //     .then(function(data){
    //         if(data){
    //             encrytion.getHashAsync(req.body.password,data.salt)
    //                 .then(function(hash){

    //                     if(hash == data.password){
    //                         res.send({
    //                             token: encrytion.jwtEncode({
    //                                 id:data.id
    //                             })
    //                         });
    //                     }
    //                     else{
    //                         errorHandler.invalidUP(res)
    //                     } 
    //                 })
    //                 .catch(function(err){
    //                     errorHandler.unexpectedError(err,res)
    //                 })
    //         }
    //         else{
    //             errorHandler.invalidUP(res)
    //         }
    //     })
    //     .catch(function(err){
    //         errorHandler.unexpectedDbError(err,"Login",res)
    //     })

}


var ext = {
    login
}
module.exports = {
    ext,
    router
};