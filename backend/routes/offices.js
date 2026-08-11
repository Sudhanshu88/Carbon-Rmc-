import express from 'express';
import Office from '../models/Office.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = { active: true };
    if (type) query.type = type;
    const offices = await Office.find(query).sort({ isHQ: -1, name: 1 });
    res.json({ success: true, offices });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, office });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const office = await Office.create(req.body);
    res.status(201).json({ success: true, office });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const office = await Office.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!office) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, office });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Office.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
