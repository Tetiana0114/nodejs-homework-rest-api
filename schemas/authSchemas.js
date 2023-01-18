const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string()
        .required(),
    password: Joi.string()
        .min(6)
        .max(12)
        .required(),
    subscription: Joi.string()
}).required();

const loginSchema = Joi.object({
    email: Joi.string()
        .required(),
    password: Joi.string()
        .min(6)
        .max(12)
        .required(),
}).required();

module.exports = {
    registerSchema,
    loginSchema,
};