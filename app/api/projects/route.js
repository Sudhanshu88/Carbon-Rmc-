// GET /api/projects  — All projects (public)
// POST /api/projects — Create project (admin)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import Project from '@/models/Project';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status   = searchParams.get('status');
    const featured = searchParams.get('featured');

    const query = {};
    if (category) query.category = category;
    if (status)   query.status   = status;
    if (featured) query.featured  = true;

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, projects });
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
    const project = await Project.create(body);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
