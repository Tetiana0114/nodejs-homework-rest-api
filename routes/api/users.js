const express = require('express');

const { addBodyValidation } = require('../../middlewares/validationMiddleware');
const { authValidation } = require('../../middlewares/authMiddleware');
const { upload } = require('../../middlewares/uploadMiddleware');
const { registerSchema, loginSchema } = require('../../schemas/authSchemas');

const { register, login, logout } = require('../../controllers/authController');
const { getCurrentUser } = require('../../controllers/userController');
const { uploadAvatar } = require('../../controllers/loadingControllers');

const router = express.Router();

router.post("/register", addBodyValidation(registerSchema), register);
router.get("/login", addBodyValidation(loginSchema), login);
router.post("/logout", authValidation, logout);
router.get("/current", authValidation, getCurrentUser);
router.patch("/avatars", upload.single("avatar"), uploadAvatar);

module.exports = router;