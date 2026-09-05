import crypto from 'crypto';
import User, { USER_ROLES } from '../models/user.model.js';
import { sendCredentialsEmail } from '../config/mailer.js';

/**
 * Register a new user and assign a role
 * Restricted to: 'hr_manager', 'admin'
 * Ordinary users cannot register themselves.
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, role = 'employee', password } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields'
      });
    }

    // Role validation
    if (!USER_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role '${role}'. Allowed roles are: ${USER_ROLES.join(', ')}`
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A user with email '${normalizedEmail}' already exists`
      });
    }

    // Generate a secure default password if none was supplied
    const plainPassword = password && password.trim() ? password.trim() : `PP360#${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const passwordHash = await User.hashPassword(plainPassword);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role
    });

    // Send credentials email via Nodemailer
    const loginUrl = `${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/login`;
    const emailResult = await sendCredentialsEmail({
      to: newUser.email,
      name: newUser.name,
      email: newUser.email,
      password: plainPassword,
      role: newUser.role,
      loginUrl
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Credentials email dispatched via Nodemailer.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      },
      credentialsGenerated: {
        email: newUser.email,
        temporaryPassword: plainPassword
      },
      emailDelivery: emailResult
    });
  } catch (error) {
    next(error);
  }
};

/**
 * List all users in the system
 * Restricted to: 'hr_manager', 'admin'
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users: users.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user role
 * Restricted to: 'hr_manager', 'admin'
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !USER_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed roles are: ${USER_ROLES.join(', ')}`
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User role successfully updated to '${role}'`,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a user
 * Restricted to: 'admin'
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent deleting own user account
    if (req.user && req.user.userId === id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own administrative account'
      });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User '${deleted.email}' was successfully removed`
    });
  } catch (error) {
    next(error);
  }
};
