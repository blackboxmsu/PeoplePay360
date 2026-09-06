import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendOTPEmail } from '../config/mailer.js';

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'peoplepay360_secret_key_development_only';
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId
    },
    secret,
    { expiresIn: '7d' }
  );
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Step 1: Send OTP to user's registered work email
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid registered work email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No account found with email '${normalizedEmail}'`
      });
    }

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = expiryTime;
    await user.save();

    // Send email via Nodemailer
    await sendOTPEmail({
      to: user.email,
      name: user.name,
      otp
    });

    res.json({
      success: true,
      message: `A 6-digit OTP verification code has been sent to ${user.email}. Please check your email inbox.`,
      email: user.email,
      expiresInMinutes: 10
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Step 2 (Optional pre-check): Verify that the entered OTP is correct
 */
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and 6-digit OTP are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check and try again.'
      });
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new OTP.'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully. You may now enter your new password.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Step 3: Authenticate OTP and update password
 */
export const resetPasswordWithOTP = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, verification OTP, and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check the code sent to your email.'
      });
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a fresh OTP.'
      });
    }

    // Hash the new password
    const newHash = await User.hashPassword(newPassword);
    user.passwordHash = newHash;

    // Clear reset OTP fields
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    console.log(`[Auth] 🔒 Password successfully reset for user ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been updated successfully! You can now sign in with your new password.'
    });
  } catch (error) {
    next(error);
  }
};

