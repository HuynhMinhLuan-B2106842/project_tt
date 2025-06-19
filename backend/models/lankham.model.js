const mongoose = require('mongoose');

const LanKhamSchema = new mongoose.Schema({
  maBenhNhan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Benhnhan',
    required: true,
  },
  ngay_kham: Date,
  trang_thai: {
    type: String,
    enum: ['dang_kham', 'hoan_thanh', 'huy'],
    default: 'dang_kham',
  },
  ghi_chu: String
});

module.exports = mongoose.model('LanKham', LanKhamSchema); // <- PHẢI có dòng này
