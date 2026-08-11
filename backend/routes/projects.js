import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, status, featured } = req.query;
    const query = {};
    if (category) query.category = category;
    if (status)   query.status   = status;
    if (featured) query.featured  = true;
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, project });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, project });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
