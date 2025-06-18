const mongoose = require('mongoose');

const buocSchema = new mongoose.Schema({
  maBuoc: {
    type: String,
    required: true,
  },
  tenBuoc: {
    type: String,
    required: true,
  },
  trangThai: {
    type: String,
    enum: ['cho_xu_ly', 'dang_xu_ly', 'hoan_thanh', 'bo_qua'],
    default: 'cho_xu_ly',
  },
  thoiGianHoanThanh: {
    type: Date,
  },
  thoiGianBatDau: {
    type: Date,
  },
  nguoiThucHien: {
    type: String,
  },
  ghiChu: {
    type: String,
  },
});

module.exports = mongoose.model('Buoc', buocSchema);