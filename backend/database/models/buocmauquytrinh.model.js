const mongoose = require('mongoose');

const BuocmauquytrinhSchema = new mongoose.Schema({
  ma_MQT: { type: mongoose.Schema.Types.ObjectId, ref: 'ProcessTemplate', required: true },
  ten_buoc_MQT: String,
  thu_tu_buoc_MQT: Number,
  ma_buoc_tiep_theo: String,
  ngay_tao_buoc_MQT: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Buocmauquytrinh', BuocmauquytrinhSchema);
