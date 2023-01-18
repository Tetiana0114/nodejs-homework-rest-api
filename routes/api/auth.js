const express = require('express');
const { addBodyValidation } = require('../../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../../schemas/authSchemas');
const { register } = require('../../controllers/authController');

const router = express.Router();

router.post("/register", addBodyValidation(registerSchema), register);
// router.post("/login", addBodyValidation(loginSchema), login);

module.exports = router;