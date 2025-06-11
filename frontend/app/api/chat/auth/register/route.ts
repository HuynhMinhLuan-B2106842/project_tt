import { NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone, role } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, mật khẩu và tên là bắt buộc' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const result = await registerUser({
      email,
      password,
      name,
      phone,
      role: role || 'patient',
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        userId: result.userId,
      });
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
