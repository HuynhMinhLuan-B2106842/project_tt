const TaiKhoan = require("../models/taikhoan.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.dangKy = async (req, res) => {
  try {
    const { ten_TK, ten_dang_nhap, mat_khau, vai_tro } = req.body;

    const existing = await TaiKhoan.findOne({ ten_dang_nhap });
    if (existing) return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });

    const hashed = await bcrypt.hash(mat_khau, 10);
    const taiKhoanMoi = await TaiKhoan.create({
      ten_TK,
      ten_dang_nhap,
      mat_khau: hashed,
      vai_tro
    });

    res.status(201).json({ message: "Đăng ký thành công", taiKhoan: taiKhoanMoi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dangNhap = async (req, res) => {
  try {
    const { ten_dang_nhap, mat_khau } = req.body;
    const tk = await TaiKhoan.findOne({ ten_dang_nhap });

    if (!tk) return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });

    const match = await bcrypt.compare(mat_khau, tk.mat_khau);
    if (!match) return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });

    const token = jwt.sign({ id: tk._id, vai_tro: tk.vai_tro }, "secret_key", { expiresIn: "7d" });

    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.layThongTinTaiKhoan = async (req, res) => {
  try {
    const taiKhoan = await TaiKhoan.findById(req.params.id).select('-mat_khau');

    if (!taiKhoan) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    res.json(taiKhoan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.laydanhSachTaiKhoan = async (req, res) => {
    try{
        const ds = await TaiKhoan.find().select('-mat_khau')
        res.json(ds);
    } catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.capNhatTaiKhoan = async (req,res) => {
    try{
        const updated = await TaiKhoan.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) return res.status(404).json({error:"Khong tim thay tai khoan"});
        res.json(updated)
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.xoaTaiKhoan = async(req, res) => {
    try{
        const deleted = await TaiKhoan.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({error: "Khong tim thay tai khoan"});
        res.json({message: "Xoa tai khoan thanh cong"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
}