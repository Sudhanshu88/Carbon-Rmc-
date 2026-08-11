// PATCH /api/contact/[id] — Update status (admin)
// DELETE /api/contact/[id] — Delete inquiry (admin)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Contact from '@/models/Contact';

export async function PATCH(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();
    const contact = await Contact.findByIdAndUpdate(params.id, body, { new: true });
    if (!contact) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, contact });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
