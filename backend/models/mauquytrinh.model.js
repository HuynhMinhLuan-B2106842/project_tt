const mongoose = require('mongoose');

const MauquytrinhSchema = new mongoose.Schema({
  ten_MQT: String,
  mo_ta_MQT: String,
  ngay_tao_MQT: { type: Date, default: Date.now },
  ngay_cap_nhat_MQT: Date,
  bpmn_xml: String,
  diagramId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagram' }
});

module.exports = mongoose.model('Mauquytrinh', MauquytrinhSchema);
