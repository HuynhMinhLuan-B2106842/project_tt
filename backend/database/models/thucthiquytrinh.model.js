const mongoose = require('mongoose');

const ThucthiquytrinhSchema = new mongoose.Schema({
  ma_MQT: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessTemplate', required: true },
  ma_LKB: { type: mongoose.Schema.Types.ObjectId, ref: 'Examination', required: true },
  ma_TK: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // người gán
  ngay_tao_TTQT: { type: Date, default: Date.now },
  tao_boi_TTQT: String
});

module.exports = mongoose.model('Thucthiquytrinh', ThucthiquytrinhSchema);
