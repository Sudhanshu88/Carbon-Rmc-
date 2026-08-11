// GET /api/employees — All employees (public)
// POST /api/employees — Add employee (admin)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Employee from '@/models/Employee';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('department');
    const query = { active: true };
    if (dept) query.department = dept;

    const employees = await Employee.find(query).sort({ department: 1, name: 1 });
    return NextResponse.json({ success: true, employees });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();

    // Auto-generate empId if not provided
    if (!body.empId) {
      const count = await Employee.countDocuments();
      body.empId = `CRMC-${String(count + 1).padStart(3, '0')}`;
    }

    const employee = await Employee.create(body);
    return NextResponse.json({ success: true, employee }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
