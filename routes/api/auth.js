const express = require('express');
const { addAuthValidation } = require('../../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../../schemas/authSchemas');
const { register } = require('../../controllers/authController');

const router = express.Router();

router.post("/register", addAuthValidation(registerSchema), register);
// router.post("/login", addAuthValidation(loginSchema), login);

module.exports = router;