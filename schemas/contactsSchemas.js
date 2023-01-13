const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required(),
    email: Joi.string()
        .required(),
    phone: Joi.string()
        .min(6)
        .max(16)
        .required(),
    favorite: Joi.boolean()
}).required();

const updateContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20),
    email: Joi.string(),
    phone: Joi.string()
        .min(6)
        .max(16)
}).min(1).required();

const updateStatusSchema = Joi.object({
    favorite: Joi.boolean()
        .required(),
});

module.exports = {
    addContactSchema,
    updateContactSchema,
    updateStatusSchema,
};