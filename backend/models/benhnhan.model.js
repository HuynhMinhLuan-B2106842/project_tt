const mongoose = require('mongoose');

const BenhnhanSchema = new mongoose.Schema({
  ho_ten: String,
  ngay_sinh: Date,
  gioi_tinh: String,
  dien_thoai: String,
  email: String,
  dia_chi: String,
  ngay_tao_ho_so: { type: Date, default: Date.now },

  tai_khoan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaiKhoan',
    required: true, 
  }
});

module.exports = mongoose.model('Benhnhan', BenhnhanSchema);
