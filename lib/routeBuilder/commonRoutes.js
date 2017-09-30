

var express = require("express");
var _ = require("lodash");

var immutable = require("immutable");
var S = require("string");

var ObjectId = require("mongoskin").ObjectId;

var db = require("../resources/db")
var routeUtils = require("../utils/routeUtils")
var errorHandler = require("./errorHandler")

var validator = require("../validator/validator");

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

    var schema = req.sharedData.options.schema;;
    var query = routeUtils.getQueryFromUrl(req);
    var fields = routeUtils.getFieldsFromUrl(req);

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

        return schema.table.findAll({
            where:query,
            // attributes:fields,
            limit: pageOptoins.limit,
            skip: pageOptoins.skip
        })
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

    schema.table.findById(req.params.id)
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