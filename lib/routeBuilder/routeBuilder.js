

var express = require("express");

var validator = require("../validator/validator");
var commonRoutes = require("./commonRoutes")


var routeBuilder = {
    build : function(router,options){

        router.get("/",
            shareData.bind(this),
            options.middleware.get.ALL.before,
            commonRoutes.get.ALL,
            options.middleware.get.ALL.after,
            endResult)

        router.get("/:id",
            shareData.bind(this),
            options.middleware.get.ONE.before,
            commonRoutes.get.ONE,
            options.middleware.get.ONE.after,
            endResult)


        router.post("/",
            shareData.bind(this),
            validator(options.validations.post),
            options.middleware.post.ONE.before,
            commonRoutes.post.ONE,
            options.middleware.post.ONE.after,
            endResult)


        router.patch("/:id",
            shareData.bind(this),
            validator(options.validations.patch),
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

function endResult(req,res){
    res.set({
        "x-page-options": req.pageOptions
    })

    res.send(req.sharedData.data);
}


module.exports = routeBuilder;