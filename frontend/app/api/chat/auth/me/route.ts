import { NextResponse } from 'next/server';
import { verifyToken, getUserById } from '../../../../lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token không được cung cấp' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = verifyToken(token);
      const user = await getUserById(decoded.userId);

      if (!user) {
        return NextResponse.json(
          { error: 'Người dùng không tồn tại' },
          { status: 404 }
        );
      }

      // Remove password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (tokenError) {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
