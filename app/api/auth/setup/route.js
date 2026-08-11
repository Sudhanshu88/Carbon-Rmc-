// POST /api/auth/setup — Create first admin (run once)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    const existing = await User.findOne({ role: 'superadmin' });
    if (existing)
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });

    const admin = await User.create({
      name: 'Carbon RMC Admin',
      email: 'admin@carbonrmc.com',
      password: 'Admin@1234',   // Change this after first login!
      role: 'superadmin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created! Login with admin@carbonrmc.com / Admin@1234',
      id: admin._id,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
