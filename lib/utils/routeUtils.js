
var _ = require("lodash");

var immutable = require("immutable");

var MongoQs = require("mongo-querystring");
var sqs = require('sequelize-querystring')

var routeUtils = {
    getQueryFromUrl : getQueryFromUrl,
    getFieldsFromUrl : getFieldsFromUrl,
    getPageOptions: getPageOptions
}

function getQueryFromUrl(req){


    return req.query.filter?sqs.find(req.query.filter):{};

    // return req.query.q?(new MongoQs()).parse(req.query.q):{};
}

function getPageOptions(req){

    var pageSize = req.pageSize?parseInt(req.pageSize):10
    var page = req.pageSize?parseInt(req.page):1
    var pageOptions = {
        pageSize: pageSize,
        page: page,
        skip: pageSize * (page - 1),
        limit: pageSize,
    }

    return pageOptions;
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