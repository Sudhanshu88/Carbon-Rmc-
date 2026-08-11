import express from 'express';
import Employee from '../models/Employee.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    const query = { active: true };
    if (department) query.department = department;
    const employees = await Employee.find(query).sort({ department: 1, name: 1 });
    res.json({ success: true, employees });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, employee: emp });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const body = req.body;
    if (!body.empId) {
      const count = await Employee.countDocuments();
      body.empId = `CRMC-${String(count + 1).padStart(3, '0')}`;
    }
    const employee = await Employee.create(body);
    res.status(201).json({ success: true, employee });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, employee: emp });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ success: true, message: 'Employee deactivated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
