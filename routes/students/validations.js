var Joi = require("joi");



module.exports = {
    post : {
        "full_name":Joi.any(),
        "engrip_user_id":Joi.any(),
        "phone_number":Joi.any()
    },
    login : {
        "email":Joi.string().email(),
        "password":Joi.string().strip()
    }
}