const express = require('express');
const { addBodyValidation } = require('../../middlewares/validationMiddleware');
const { authValidation } = require('../../middlewares/authMiddleware');
const { registerSchema, loginSchema } = require('../../schemas/authSchemas');
const { register, login, logout } = require('../../controllers/authController');
const { getCurrentUser } = require('../../controllers/userController');

const router = express.Router();

router.post("/register", addBodyValidation(registerSchema), register);
router.post("/login", addBodyValidation(loginSchema), login);
router.post("/logout", authValidation, logout);
router.get("/current", authValidation, getCurrentUser);

module.exports = router;