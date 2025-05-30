const Buoc = require("../models/buocthucthiquytrinh.model");


exports.layChiTietBuoc = async (req, res) => {
  try {
    const buoc = await Buoc.findById(req.params.id).populate("ma_TTQT ma_TK");
    if (!buoc) return res.status(404).json({ error: "Không tìm thấy bước" });
    res.json(buoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.layDanhSachBuocTrongQuyTrinh = async (req, res) => {
  try {
    const ds = await Buoc.find({ ma_TTQT: req.params.id }).sort("thu_tu_BTTQT");
    res.json(ds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.hoanThanhBuoc = async (req, res) => {
  try {
    const buoc = await Buoc.findById(req.params.id);
    if (!buoc) return res.status(404).json({ error: "Không tìm thấy bước" });

    buoc.trang_thai_BTTQT = "hoan_thanh";
    buoc.thoi_diem_hoan_thanh_buoc = new Date();
    await buoc.save();

    res.json({ message: "Đã hoàn thành bước", buoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
