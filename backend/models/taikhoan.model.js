const mongoose = require('mongoose');

const TaikhoanSchema = new mongoose.Schema({
  ten_TK: String,
  ten_dang_nhap: { type: String, required: true, unique: true },
  mat_khau: { type: String, required: true },
  vai_tro: { type: String, enum: ['patient', 'staff', 'admin'], required: true }
}, { timestamps: true })

module.exports = mongoose.model('TaiKhoan', TaikhoanSchema);