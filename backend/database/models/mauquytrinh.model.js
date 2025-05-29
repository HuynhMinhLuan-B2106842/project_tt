const mongoose = require('mongoose');

const MauquytrinhSchema = new mongoose.Schema({
  ten_MQT: String,
  mo_ta_MQT: String,
  ngay_tao_MQT: { type: Date, default: Date.now },
  ngay_cap_nhat_MQT: Date,
  bpmn_xml: String
});

module.exports = mongoose.model('Mauquytrinh', MauquytrinhSchema);
