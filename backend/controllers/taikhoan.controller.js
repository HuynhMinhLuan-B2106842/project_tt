const TaiKhoan = require("../models/taikhoan.model");
const Benhnhan = require("../models/benhnhan.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.dangKy = async (req, res) => {
  try {
    const { ten_dang_nhap, mat_khau, repassword  } = req.body;

    const existing = await TaiKhoan.findOne({ ten_dang_nhap });
    if (existing) return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });

    if (!mat_khau || !repassword || mat_khau !== repassword) {
      return res.status(400).json({ error: "Mật khẩu xác nhận không khớp" });
    }
    
    const hashed = await bcrypt.hash(mat_khau, 10);
    const taiKhoanMoi = await TaiKhoan.create({
      ten_dang_nhap,
      mat_khau: hashed,
      vai_tro: 'patient'
    });

    await Benhnhan.create({
      tai_khoan_id: taiKhoanMoi._id,
      ho_ten: null,
      ngay_sinh: null,
      gioi_tinh: null,
      email: null,
      dia_chi: null,
      dien_thoai: null
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

exports.doiMatKhau = async (req, res) => {
  try {
    const { mat_khau_cu, mat_khau_moi, mat_khau_moi_laplai } = req.body;

    if (!mat_khau_cu || !mat_khau_moi || !mat_khau_moi_laplai) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (mat_khau_moi !== mat_khau_moi_laplai) {
      return res.status(400).json({ error: "Mật khẩu mới không khớp" });
    }

    const taiKhoanId = req.user.id; // Lấy từ middleware xác thực JWT
    const taiKhoan = await TaiKhoan.findById(taiKhoanId);

    if (!taiKhoan) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    const match = await bcrypt.compare(mat_khau_cu, taiKhoan.mat_khau);
    if (!match) {
      return res.status(400).json({ error: "Mật khẩu cũ không đúng" });
    }

    const hashed = await bcrypt.hash(mat_khau_moi, 10);
    taiKhoan.mat_khau = hashed;
    await taiKhoan.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
