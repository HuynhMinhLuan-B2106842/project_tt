const mongoose = require('mongoose');

const ThucthiquytrinhSchema = new mongoose.Schema({
  ma_MQT: { type: mongoose.Schema.Types.ObjectId, ref: 'Mauquytrinh', required: true },
  ma_LKB: { type: mongoose.Schema.Types.ObjectId, ref: 'Lankham', required: true },
  ma_TK: { type: mongoose.Schema.Types.ObjectId, ref: 'Taikhoan' },
  ngay_tao_TTQT: { type: Date, default: Date.now },
  tao_boi_TTQT: String
});

module.exports = mongoose.model('Thucthiquytrinh', ThucthiquytrinhSchema);
