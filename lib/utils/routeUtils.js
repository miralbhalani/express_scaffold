
var _ = require("lodash");

var immutable = require("immutable");

var MongoQs = require("mongo-querystring");
var sqs = require('sequelize-querystring')

var routeUtils = {
    getQueryFromUrl : getQueryFromUrl,
    getFieldsFromUrl : getFieldsFromUrl,
    getPageOptions: getPageOptions,
    setPageOptions
}

function getQueryFromUrl(req){


    return req.query.filter?sqs.find(req.query.filter):{};

    // return req.query.q?(new MongoQs()).parse(req.query.q):{};
}

function getPageOptions(req){

    var pageSize = req.query.pageSize?parseInt(req.query.pageSize):10
    var page = req.query.page?parseInt(req.query.page):1
    var pageOptions = {
        pageSize: pageSize,
        page: page,
        skip: pageSize * (page - 1),
        limit: pageSize,
    }

    return pageOptions;
}

function setPageOptions(req,res){
    if(req.sharedData.pageOptoins){
        res.set({
            "x-page-options-count": req.sharedData.pageOptoins.count,
            "x-page-options-page": req.sharedData.pageOptoins.page,
            "x-page-options-pagesize": req.sharedData.pageOptoins.pageSize
        })
    }
}

function getFieldsFromUrl(req){
    
    if(req.query.fields){
        return immutable.List(req.query.fields.split(','));

        // _.forEach(req.query.fields,function(field){
        //     if(field[0]=="!"){
        //         fields[field.slice(1)] = 0;    
        //     }else{
        //         fields[field] = 1;
        //     }
        // })
    }
    return [];
}

module.exports = routeUtils;