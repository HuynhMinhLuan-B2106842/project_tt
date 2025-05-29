require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database/config/db');
const {
  TaiKhoan,
  BenhNhan,
  YeuCauKham
} = require('./database/models');

const runTest = async () => {
  await connectDB();

  // 1. Tạo tài khoản mẫu
  const tk = await TaiKhoan.create({
    ten_TK: 'Bác sĩ A',
    ten_dang_nhap: 'bs_a',
    mat_khau: '123456',
    vai_tro: 'staff'
  });

  // 2. Tạo bệnh nhân
  const bn = await BenhNhan.create({
    ho_ten: 'Nguyễn Văn A',
    ngay_sinh: new Date('2000-01-01'),
    gioi_tinh: 'Nam',
    dien_thoai: '0901234567',
    email: 'a@gmail.com',
    dia_chi: 'Hà Nội'
  });

  // 3. Tạo yêu cầu khám
  const yc = await YeuCauKham.create({
    ma_BN: bn._id,
    ngay_muon_kham: new Date(),
    chuyen_khoa: 'Nội tổng quát',
    trieu_chung: 'Đau đầu, sốt nhẹ',
    trang_thai_YC: 'cho_duyet'
  });

  console.log('✅ Tạo thành công!');
  console.log({ tk, bn, yc });

  process.exit();
};

runTest().catch((err) => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
