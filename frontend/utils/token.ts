import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  id: string;
  vai_tro: string;
  iat?: number;
  exp?: number;
}

export const getUserIdFromToken = (): string | null => {
  if (typeof window === 'undefined') return null; // đảm bảo đang ở client

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.id || null;
  } catch (err) {
    console.error('❌ Lỗi khi decode token:', err);
    return null;
  }
};
