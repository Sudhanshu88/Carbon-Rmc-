import express from 'express';
import { protect } from '../middleware/auth.js';
import Contact  from '../models/Contact.js';
import Project  from '../models/Project.js';
import Employee from '../models/Employee.js';
import Office   from '../models/Office.js';
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const [totalContacts, newContacts, totalProjects, ongoingProjects, totalEmployees, totalOffices, recentInquiries] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.countDocuments(),
      Project.countDocuments({ status: 'Ongoing' }),
      Employee.countDocuments({ active: true }),
      Office.countDocuments({ active: true }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
    ]);
    res.json({ success: true, stats: { totalContacts, newContacts, totalProjects, ongoingProjects, totalEmployees, totalOffices }, recentInquiries });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
