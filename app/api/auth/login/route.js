// POST /api/auth/login
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { signToken } from '@/lib/auth';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const user = await User.findOne({ email, active: true });
    if (!user)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
