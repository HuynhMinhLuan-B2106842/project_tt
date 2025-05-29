const mongoose = require('mongoose');

const YeucauSchema = new mongoose.Schema({
  ma_BN: { type: mongoose.Schema.Types.ObjectId, ref: 'Benhnhan', required: true },
  ngay_muon_kham: Date,
  chuyen_khoa: String,
  trieu_chung: String,
  trang_thai_YC: { type: String, enum: ['cho_duyet', 'da_duyet', 'tu_choi'], default: 'cho_duyet' }
});

module.exports = mongoose.model('Yeucau', YeucauSchema);
