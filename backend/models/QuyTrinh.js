const mongoose = require('mongoose');
const Buoc = require('./Buoc');
const LanKham = require('./lankham.model')

const quyTrinhSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
  },
  lanKhamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LanKham',
    required: true,
  },
  ngayBatDau: {
    type: Date,
    default: Date.now,
  },
  trangThai: {
    type: String,
    enum: ['cho_xu_ly', 'dang_xu_ly', 'hoan_thanh'],
    default: 'cho_xu_ly',
  },
  buocHienTai: {
    type: String,
    default: null,
  },
  diagramId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagram',
    required: false,
  },
  cacBuoc: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buoc',
  }],
  ngayCapNhat: {
    type: Date,
    default: Date.now,
  },
});

// Hàm chạy trước khi lưu để cập nhật ngày
quyTrinhSchema.pre('save', async function(next) {
  if (this.isModified('cacBuoc')) {
    this.ngayCapNhat = Date.now();
  }
  next();
});

module.exports = mongoose.model('QuyTrinh', quyTrinhSchema);