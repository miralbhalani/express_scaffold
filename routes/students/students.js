
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
var collages = require("../collages/schema")

commonOptions.validations = require('./validations');
commonOptions.schema = require('./schema');


commonOptions.middleware.get.ALL.before = function(req,res,next){
    // req.sharedData.query

    var collageQuery = {};
    if(req.sharedData.query.collage_name){
        collageQuery.collage_name = req.sharedData.query.collage_name;
        delete req.sharedData.query.collage_name;
    }
    var collageIncludeQuery = {
        model: collages.table,
        as:"collage",
        attributes:["collage_name"]
    }

    if(Object.keys(collageQuery).length>0){
        collageIncludeQuery.where = collageQuery
    }

    req.sharedData.include = [collageIncludeQuery],

    next()
}

commonOptions.middleware.get.ONE.before = function(req,res,next){
    // req.sharedData.query

    req.sharedData.include = [{
        model: collages.table,
        as:"collage",
        attributes:["collage_name"]
    }],

    next()
}


routeBuilder.build(router,commonOptions);

router.get("/get-token/:id",function(req,res){
    res.send(encrytion.jwtEncode({
        "id":req.params.id
    }));
})

var ext = {}
module.exports = {
    ext,
    router
};