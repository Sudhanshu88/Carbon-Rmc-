// GET /api/offices — All offices & plants (public)
// POST /api/offices — Add location (admin)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Office from '@/models/Office';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'office' or 'plant'
    const query = { active: true };
    if (type) query.type = type;

    const offices = await Office.find(query).sort({ isHQ: -1, name: 1 });
    return NextResponse.json({ success: true, offices });
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
    const office = await Office.create(body);
    return NextResponse.json({ success: true, office }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
