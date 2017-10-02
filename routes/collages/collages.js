
'use strict'
var express = require("express");
var router = express.Router();


var schema = require("./schema");
var db = require("../../lib/resources/db")
var validator = require("../../lib/validator/validator");
var commonOptions = require("../../lib/routeBuilder/commonOptions")()
var routeBuilder = require("../../lib/routeBuilder/routeBuilder")
var errorHandler = require("../../lib/routeBuilder/errorHandler")


commonOptions.validations = require('./validations');
commonOptions.schema = require('./schema');
routeBuilder.build(router,commonOptions);


var ext = {}
module.exports = {
    ext,
    router
};