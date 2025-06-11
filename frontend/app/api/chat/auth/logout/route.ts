import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Đăng xuất thành công',
    });

    // Clear the auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
