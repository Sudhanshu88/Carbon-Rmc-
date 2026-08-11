import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../lib/auth.js';
const router = express.Router();

// POST /api/auth/setup — Create first superadmin (one-time)
router.post('/setup', async (req, res) => {
  try {
    const existing = await User.findOne({ role: 'superadmin' });
    if (existing) return res.status(400).json({ error: 'Admin already exists' });
    const admin = await User.create({ name: 'Carbon RMC Admin', email: 'admin@carbonrmc.com', password: 'Admin@1234', role: 'superadmin' });
    res.json({ success: true, message: 'Admin created! Email: admin@carbonrmc.com | Pass: Admin@1234', id: admin._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await User.findOne({ email, active: true });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
