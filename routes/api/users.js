const express = require('express');

const { addBodyValidation } = require('../../middlewares/validationMiddleware');
const { authValidation } = require('../../middlewares/authMiddleware');
const { upload } = require('../../middlewares/uploadMiddleware');
const { registerSchema, loginSchema } = require('../../schemas/authSchemas');

const { register, login, logout } = require('../../controllers/authController');
const { getCurrentUser, verifyEmail } = require('../../controllers/userController');
const { updateAvatar } = require('../../controllers/loadingController');

const router = express.Router();

router.post("/register", addBodyValidation(registerSchema), register);
router.get("/login", addBodyValidation(loginSchema), login);
router.post("/logout", authValidation, logout);
router.get("/current", authValidation, getCurrentUser);
router.patch("/avatars", authValidation, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);

module.exports = router;