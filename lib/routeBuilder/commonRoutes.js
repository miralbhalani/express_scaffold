

var express = require("express");
var _ = require("lodash");

var immutable = require("immutable");
var S = require("string");

var ObjectId = require("mongoskin").ObjectId;

var db = require("../resources/db")
var routeUtils = require("../utils/routeUtils")
var errorHandler = require("./errorHandler")

var validator = require("../validator/validator");


var collages = require("../../routes/collages/schema");


var commonRoutes = {
    get:{
        ALL : getAll,
        ONE : getOne
    },
    post:{
        ONE:postOne
    },
    patch:{
        ONE:patchOne
    }
}

function getAll(req,res,next){

    var schema = req.sharedData.options.schema;
    var query = req.sharedData.query;
    var fields = req.sharedData.fields;
    

    schema.table.count({
        where:query,
    })
    .then(function(count){
        if(!errorHandler.isNoRecord(count,schema.tableTitle,res)){
            return count
        }
    })
    .then(function(count){
        var pageOptoins = routeUtils.getPageOptions(req);
        req.sharedData.pageOptoins = pageOptoins;
        req.sharedData.pageOptoins.count = count;


        var findAllParams = {
            // include: [{
            //     model: collages.table,
            //     as:"collage"
            // }],
            where:query,
            // attributes:fields,
            offset: pageOptoins.skip,
            limit: pageOptoins.limit,
        }

        if(req.sharedData.include){
            findAllParams.include = req.sharedData.include
        }

        return schema.table.findAll(findAllParams)
    })
    .then(function(data){
        req.sharedData.data = data;
        next();
    })
    .catch(function(err){
        errorHandler.unexpectedDbError(err,schema.tableTitle,res)
    })

}


function getOne(req,res,next){

    var schema = req.sharedData.options.schema;

    var options = {};
    if(req.sharedData.include){
        options.include=req.sharedData.include
    }
    schema.table.findById(req.params.id,options)
        .then(function(data){
            req.sharedData.data = data;
            next();
        })
        .catch(function(err){
            errorHandler.unexpectedDbError(err,schema.tableTitle,res)
        })

    // var collection = req.sharedData.collection;
    // var fields = routeUtils.getFieldsFromUrl(req);

    // db.collection(collection).findOne({"_id":new ObjectId(req.params.id)},function(err,data){
    //     if(errorHandler.hasErrorToGet(err,collection,res)){
    //         return;
    //     }
    //     req.data = data;
    //     next();
    // })

}


function postOne(req,res,next){

    var schema = req.sharedData.options.schema;

    schema.table.create(req.body)
        .then(function(data){
            req.sharedData.data = data;
            next();
        })
        .catch(function(err){
            errorHandler.unexpectedDbError(err,schema.tableTitle,res)
        })
}


function patchOne(req,res,next){

    var schema = req.sharedData.options.schema;

    schema.table.update(req.body,{
        where:{
            id:req.params.id
        }
    }).then(function(data){
            req.sharedData.data = data;
            next();
        })
        .catch(function(err){
            errorHandler.unexpectedDbError(err,schema.tableTitle,res)
        })

    // var collection = req.sharedData.collection;

    // db.collection(collection).update({"_id":new ObjectId(req.params.id)},req.body,function(err,data){
    //     if(errorHandler.hasErrorToPost(err,collection,res)){
    //         return
    //     }
    //     req.data = data;
    //     next()
    // })
}

module.exports = commonRoutes;