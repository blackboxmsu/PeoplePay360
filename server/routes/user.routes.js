import { Router } from 'express';
import {
  registerUser,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

// All user management routes require valid authentication
router.use(requireAuth);

/**
 * @route   POST /api/users/register
 * @desc    Register a new user and assign a role (Nodemailer credential delivery)
 * @access  HR Manager & Admin only (Ordinary users cannot register)
 */
router.post(
  '/register',
  authorizeRoles('hr_manager', 'admin'),
  registerUser
);

/**
 * @route   GET /api/users
 * @desc    Get all users list
 * @access  HR Manager & Admin only
 */
router.get(
  '/',
  authorizeRoles('hr_manager', 'admin'),
  getAllUsers
);

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Update a user's role assignment
 * @access  HR Manager & Admin only
 */
router.patch(
  '/:id/role',
  authorizeRoles('hr_manager', 'admin'),
  updateUserRole
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Admin only
 */
router.delete(
  '/:id',
  authorizeRoles('admin'),
  deleteUser
);

export default router;
