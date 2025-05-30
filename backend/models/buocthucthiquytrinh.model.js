const mongoose = require('mongoose');

const BuocthucthiquytrinhSchema = new mongoose.Schema({
  ma_TTQT: { type: mongoose.Schema.Types.ObjectId, ref: 'Thucthiquytrinh', required: true },
  ma_TK: { type: mongoose.Schema.Types.ObjectId, ref: 'Taikhoan' },
  ten_BTTQT: String,
  thu_tu_BTTQT: Number,
  trang_thai_BTTQT: { type: String, enum: ['cho_xu_ly', 'dang_thuc_hien', 'hoan_thanh'], default: 'cho_xu_ly' },
  thoi_diem_bat_dau_buoc: Date,
  thoi_diem_hoan_thanh_buoc: Date,
  ghi_chu_buoc: String
});

module.exports = mongoose.model('Buocthucthiquytrinh', BuocthucthiquytrinhSchema);
