import { connectToDatabase } from './mongodb';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'doctor' | 'staff' | 'patient';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function verifyToken(
  token: string
): { userId: string; email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

function generateToken(userId: string, email: string, role: string): string {
  const payload = { userId, email, role };
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN };

  return jwt.sign(payload, JWT_SECRET as string, options);
}

export async function authenticateUser(credentials: LoginCredentials): Promise<{
  success: boolean;
  message: string;
  token?: string;
  user?: unknown;
  error?: string;
}> {
  try {
    const { db } = await connectToDatabase();
    const user = await db
      .collection('users')
      .findOne({ email: credentials.email });

    if (!user) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
        error: 'Invalid credentials',
      };
    }

    const isValidPassword = await verifyPassword(
      credentials.password,
      user.password
    );
    if (!isValidPassword) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
        error: 'Invalid credentials',
      };
    }

    const token = generateToken(user._id.toString(), user.email, user.role);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Lỗi hệ thống', error: 'System error' };
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase();
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });
    return user as User | null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function sendPasswordResetEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return { success: false, error: 'Email không tồn tại trong hệ thống' };
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '15m',
    });

    const resetLink = `https://your-app.com/reset-password?token=${token}`;
    console.log(`🔐 Reset password link for ${email}: ${resetLink}`);

    return { success: true };
  } catch (error) {
    console.error('sendPasswordResetEmail error:', error);
    return { success: false, error: 'Lỗi gửi email' };
  }
}

// ✅ ADD registerUser HERE:
export async function registerUser(userData: {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'doctor' | 'staff' | 'patient';
  phone?: string;
}): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const { db } = await connectToDatabase();

    const existingUser = await db
      .collection('users')
      .findOne({ email: userData.email });
    if (existingUser) {
      return {
        success: false,
        message: 'Email đã được đăng ký',
        error: 'Email exists',
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
      phone: userData.phone || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('users').insertOne(newUser);

    return { success: true, message: 'Đăng ký thành công' };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Lỗi hệ thống', error: 'System error' };
  }
}
