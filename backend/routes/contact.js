import express from 'express';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

// GET /api/contact — Admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(+limit);
    res.json({ success: true, contacts, total, page: +page, pages: Math.ceil(total/limit) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/contact — Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, projectType, message } = req.body;
    if (!name || !phone || !projectType || !message) return res.status(400).json({ error: 'All required fields must be filled' });
    const contact = await Contact.create({ name, phone, email, projectType, message });
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', id: contact._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/contact/:id
router.patch('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, contact });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/contact/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
