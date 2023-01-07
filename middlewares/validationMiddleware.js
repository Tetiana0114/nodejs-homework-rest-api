const Joi = require('joi');

const useValidation = (req, res, next) => {
const schema = Joi.object({
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
});
    
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ status: result.error.details })
    }
    next()
}
module.exports = {
    useValidation,
}