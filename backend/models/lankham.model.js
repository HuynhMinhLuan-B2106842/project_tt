const mongoose = require('mongoose');

const LankhamSchema = new mongoose.Schema({
  ma_BN: { type: mongoose.Schema.Types.ObjectId, ref: 'Benhnhan', required: true },
  ngay_kham: Date,
  trang_thai: { type: String, enum: ['dang_kham', 'hoan_thanh', 'huy'], default: 'dang_kham' },
  ghi_chu: String
});

module.exports = mongoose.model('Lankham', LankhamSchema);
