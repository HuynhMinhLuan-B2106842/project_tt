const MQT = require("../models/mauquytrinh.model");

// POST - Tạo mới mẫu quy trình
exports.taoMau = async (req, res) => {
  try {
    const newMau = await MQT.create(req.body);
    res.status(201).json(newMau);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET - Lấy tất cả mẫu quy trình
exports.layTatCa = async (req, res) => {
  try {
    const ds = await MQT.find();
    res.json(ds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - Chi tiết mẫu
exports.layChiTiet = async (req, res) => {
  try {
    const mau = await MQT.findById(req.params.id);
    if (!mau) return res.status(404).json({ error: "Không tìm thấy mẫu" });
    res.json(mau);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - Cập nhật mẫu
exports.capNhat = async (req, res) => {
  try {
    const data = {
      ...req.body,
      ngay_cap_nhat_MQT: new Date()
    };
    const updated = await MQT.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Xoá mẫu
exports.xoa = async (req, res) => {
  try {
    await MQT.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xoá mẫu thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
