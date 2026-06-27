const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const authMiddleware = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer");

router.post("/firebase-login", authController.firebaseLogin);

router.post("/login", authController.loginWithEmail);

router.post("/register", authController.registerWithEmail);

router.get("/me", authMiddleware, authController.getMe);
router.patch("/me", authMiddleware, authController.updateMe);
router.patch("/me/photo", authMiddleware, upload.single("photo"), authController.uploadMyPhoto);

module.exports = router;
