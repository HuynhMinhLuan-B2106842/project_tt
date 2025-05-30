const ThucThi = require("../models/thucthiquytrinh.model");

// POST /api/thucthiquytrinh - tạo mới
exports.taoThucThi = async (req, res) => {
  try {
    const data = await ThucThi.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/thucthiquytrinh - tất cả
exports.layTatCa = async (req, res) => {
  try {
    const ds = await ThucThi.find().populate("ma_MQT ma_LKB ma_TK");
    res.json(ds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/thucthiquytrinh/:id - chi tiết
exports.layChiTiet = async (req, res) => {
  try {
    const item = await ThucThi.findById(req.params.id).populate("ma_MQT ma_LKB ma_TK");
    if (!item) return res.status(404).json({ error: "Không tìm thấy quy trình" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/thucthiquytrinh/:id - cập nhật
exports.capNhat = async (req, res) => {
  try {
    const updated = await ThucThi.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/thucthiquytrinh/:id - xóa
exports.xoa = async (req, res) => {
  try {
    await ThucThi.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
