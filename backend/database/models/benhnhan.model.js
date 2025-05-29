const mongoose = require('mongoose');

const BenhnhanSchema = new mongoose.Schema({
  ho_ten: String,
  ngay_sinh: Date,
  gioi_tinh: String,
  dien_thoai: String,
  email: String,
  dia_chi: String,
  ngay_tao_ho_so: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Benhnhan', BenhnhanSchema);
