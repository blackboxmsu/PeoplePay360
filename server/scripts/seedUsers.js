import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/peoplepay360';

export const DEMO_USERS = [
  {
    name: 'Raviraj Dhokiya',
    email: 'admin@peoplepay360.com',
    role: 'admin',
    password: 'Demo@123'
  },
  {
    name: 'Raviraj Dhokiya',
    email: 'raviraj@peoplepay360.com',
    role: 'admin',
    password: 'Demo@123'
  },
  {
    name: 'Meet Rathod',
    email: 'hrmanager@peoplepay360.com',
    role: 'hr_manager',
    password: 'Demo@123'
  },
  {
    name: 'Meet Rathod',
    email: 'meet@peoplepay360.com',
    role: 'hr_manager',
    password: 'Demo@123'
  },
  {
    name: 'Meet Rathod',
    email: 'meetrathod470@gmail.com',
    role: 'hr_manager',
    password: 'Demo@123'
  },
  {
    name: 'Neev Chovatiya',
    email: 'payrolluser@peoplepay360.com',
    role: 'hr_payroll_user',
    password: 'Demo@123'
  },
  {
    name: 'Neev Chovatiya',
    email: 'neev@peoplepay360.com',
    role: 'hr_payroll_user',
    password: 'Demo@123'
  },
  {
    name: 'Ujjwal Rathod',
    email: 'payrollmanager@peoplepay360.com',
    role: 'hr_payroll_manager',
    password: 'Demo@123'
  },
  {
    name: 'Ujjwal Rathod',
    email: 'ujjwal@peoplepay360.com',
    role: 'hr_payroll_manager',
    password: 'Demo@123'
  },
  {
    name: 'Parth Solanki',
    email: 'employee@peoplepay360.com',
    role: 'employee',
    password: 'Demo@123'
  },
  {
    name: 'Parth Solanki',
    email: 'parth@peoplepay360.com',
    role: 'employee',
    password: 'Demo@123'
  },
  {
    name: 'Ayush Moradiya',
    email: 'ayush@peoplepay360.com',
    role: 'employee',
    password: 'Demo@123'
  },
  {
    name: 'Krish Palat',
    email: 'krish@peoplepay360.com',
    role: 'employee',
    password: 'Demo@123'
  },
  {
    name: 'Rooney',
    email: 'rooney@peoplepay360.com',
    role: 'employee',
    password: 'Demo@123'
  }
];

export async function seedUsers() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Connected to database.');

    for (const demo of DEMO_USERS) {
      const passwordHash = await User.hashPassword(demo.password);

      const updated = await User.findOneAndUpdate(
        { email: demo.email.toLowerCase() },
        {
          name: demo.name,
          email: demo.email.toLowerCase(),
          passwordHash,
          role: demo.role
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`[Seed] Seeded user: ${updated.email} (${updated.role})`);
    }

    console.log('[Seed] All 5 demo users seeded successfully!');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed] Database disconnected.');
  }
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('seedUsers.js')) {
  seedUsers().then(() => process.exit(0));
}
