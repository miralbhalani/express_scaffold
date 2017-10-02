

var express = require("express");

var validator = require("../validator/validator");
var commonRoutes = require("./commonRoutes")
var errorHandler = require("./errorHandler")

var encrytion = require("../utils/encrytion")
var routeUtils = require("../utils/routeUtils")

var routeBuilder = {
    build : function(router,options){

        router.get("/",
            authenticate,
            shareData.bind(this),
            querying,
            options.middleware.get.ALL.before,
            commonRoutes.get.ALL,
            options.middleware.get.ALL.after,
            endResult)

        router.get("/:id",
            authenticate,
            shareData.bind(this),
            options.middleware.get.ONE.before,
            commonRoutes.get.ONE,
            options.middleware.get.ONE.after,
            endResult)


        router.post("/",
            authenticate,
            shareData.bind(this),
            validator.validate(options.validations.post),
            options.middleware.post.ONE.before,
            commonRoutes.post.ONE,
            options.middleware.post.ONE.after,
            endResult)


        router.patch("/:id",
            authenticate,
            shareData.bind(this),
            validator.validate(options.validations.patch),
            options.middleware.patch.ONE.before,
            commonRoutes.patch.ONE,
            options.middleware.patch.ONE.after,
            endResult)


        function shareData(req,res,next){
            req.sharedData = {};
            req.sharedData.options = options;
            next();
        }

    }
}

function querying(req,res,next){
    
    req.sharedData.query = routeUtils.getQueryFromUrl(req);
    req.sharedData.fields = routeUtils.getFieldsFromUrl(req);

    next()
}

function endResult(req,res){
    
    routeUtils.setPageOptions(req,res)
    

    res.send(req.sharedData.data);
}

function authenticate(req,res,next){
    if(!req.headers["x-token"]){
        return errorHandler.unauthorized(res)
    }

    if(encrytion.jwtDecode(req.headers["x-token"])){
        next()
    }
    else{
        return errorHandler.unauthorized(res)
    }

}


module.exports = routeBuilder;