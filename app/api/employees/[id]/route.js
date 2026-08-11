// GET/PUT/DELETE /api/employees/[id]
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Employee from '@/models/Employee';

export async function GET(_, { params }) {
  try {
    await connectDB();
    const emp = await Employee.findById(params.id);
    if (!emp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, employee: emp });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const emp = await Employee.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!emp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, employee: emp });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    // Soft delete — set active: false
    await Employee.findByIdAndUpdate(params.id, { active: false });
    return NextResponse.json({ success: true, message: 'Employee deactivated' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
