// GET /api/contact    — Get all inquiries (admin only)
// POST /api/contact   — Submit contact form (public)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Contact from '@/models/Contact';

export async function GET(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page   = parseInt(searchParams.get('page') || '1');
    const limit  = parseInt(searchParams.get('limit') || '20');

    const query = status ? { status } : {};
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ success: true, contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, phone, email, projectType, message } = body;

    if (!name || !phone || !projectType || !message)
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });

    const contact = await Contact.create({ name, phone, email, projectType, message });

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully!', id: contact._id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
