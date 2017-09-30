var Joi = require("joi");



module.exports = {
    post : {
        "firstName":Joi.any(),
        "lastName":Joi.any()
    },
    login : {
        "email":Joi.string().email(),
        "password":Joi.string().strip()
    }
}