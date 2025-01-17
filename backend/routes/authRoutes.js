import express from "express";
import {Login,
        logOut,
        Me,
        verifyEmail,
        register,
        forgotPassword,
        verifyOtpAndResetPassword} from "../controllers/auth.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', verifyUser, Me);
router.post('/login', Login);
router.delete('/logout', logOut);

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtpAndResetPassword);

export default router;
