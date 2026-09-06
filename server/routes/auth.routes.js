import { Router } from 'express';
import {
  login,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPasswordWithOTP
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', requireAuth, getMe);

// OTP-based Password Reset flow
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPasswordWithOTP);

export default router;

