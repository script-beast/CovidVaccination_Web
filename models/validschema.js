const Joi = require("joi")

module.exports.dataSchema = Joi.object({
    UserData: Joi.object({
        username: Joi.string(),
        password: Joi.string(),
        name: Joi.string().required(),
        district: Joi.string().required(),
        state: Joi.string().required(),
        pin: Joi.number().required().min(100000).max(999999),
        dose1: Joi.string(),
        dose2: Joi.string()
    }).required()
})