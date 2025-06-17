import api from './api'
import { getUserIdFromToken } from '@/utils/token'

const id_token = getUserIdFromToken()
console.log('ID người dùng:', id_token)

export interface TaiKhoan {
  _id?: string
  ten_TK: string
  ten_dang_nhap: string
  mat_khau?: string
  vai_tro: string
}

// Đăng ký tài khoản
export const dangKy = async (payload: TaiKhoan) => {
  const res = await api.post('/taikhoan/dangky', payload)
  return res.data
}

// Đăng nhập
// services/taikhoan.service.ts
export const dangNhap = async (ten_dang_nhap: string, mat_khau: string) => {
  const res = await api.post('/taikhoan/login', {
    ten_dang_nhap,
    mat_khau
  });
  return res.data;
}


// Lấy danh sách tài khoản
export const layDanhSachTaiKhoan = async () => {
  const res = await api.get('/taikhoan/list')
  return res.data
}

export const layThongTinTaiKhoan = async (id: string): Promise<TaiKhoan> => {
  const res = await api.get(`/taikhoan/${id}`)
  return res.data
}

// Cập nhật tài khoản
export const capNhatTaiKhoan = async (id: string, payload: Partial<TaiKhoan>) => {
  const res = await api.put(`/taikhoan/${id}`, payload)
  return res.data
}

// Xóa tài khoản
export const xoaTaiKhoan = async (id: string) => {
  const res = await api.delete(`/taikhoan/${id}`)
  return res.data
}