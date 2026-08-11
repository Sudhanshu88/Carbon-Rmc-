// GET /api/stats — Dashboard statistics (admin)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Contact from '@/models/Contact';
import Project from '@/models/Project';
import Employee from '@/models/Employee';
import Office from '@/models/Office';

export async function GET(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [
      totalContacts,
      newContacts,
      totalProjects,
      ongoingProjects,
      totalEmployees,
      totalOffices,
      recentInquiries,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.countDocuments(),
      Project.countDocuments({ status: 'Ongoing' }),
      Employee.countDocuments({ active: true }),
      Office.countDocuments({ active: true }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts,
        newContacts,
        totalProjects,
        ongoingProjects,
        totalEmployees,
        totalOffices,
      },
      recentInquiries,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
