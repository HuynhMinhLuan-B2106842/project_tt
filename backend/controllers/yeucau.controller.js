const Yeucau = require("../models/yeucau.model");
const Benhnhan = require("../models/benhnhan.model");
const LanKham = require("../models/lankham.model");
const QuyTrinh = require("../models/QuyTrinh");
const Buoc = require("../models/Buoc");
const mongoose = require('mongoose');
const guiYeuCauKham = async (req, res) => {
    try {
        const taiKhoanId = req.user.id;

        // Tìm bệnh nhân tương ứng với tài khoản
        const benhnhan = await Benhnhan.findOne({ tai_khoan_id: taiKhoanId });
        if (!benhnhan) {
            return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân" });
        }

        const yeucau = new Yeucau({
            ma_BN: benhnhan._id,
            chuyen_khoa: req.body.chuyen_khoa,
            trieu_chung: req.body.trieu_chung,
            ngay_muon_kham: req.body.ngay_muon_kham,
        });

        await yeucau.save();
        res.status(201).json({ message: "Gửi yêu cầu thành công", yeucau });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  };

const layDanhSachYeuCau = async (req, res) => {
    try {
        const danhSach = await Yeucau.find().populate("ma_BN");
        res.status(200).json(danhSach);
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const layYeuCauCuaBenhNhanDangNhap = async (req, res) => {
  try {
    const taiKhoanId = new mongoose.Types.ObjectId(req.user.id); // 🟢 ép kiểu rõ ràng

    const benhnhan = await Benhnhan.findOne({ tai_khoan_id: taiKhoanId });
    if (!benhnhan) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ bệnh nhân của người dùng này' });
    }

    const danhSachYeuCau = await Yeucau.find({ ma_BN: benhnhan._id }).populate('ma_BN');
    res.status(200).json(danhSachYeuCau);
  } catch (error) {
    console.error("🔥 Lỗi khi truy vấn yêu cầu khám:", error.message);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};


const layChiTietYeuCau = async (req, res) => {
    try {
        const { id } = req.params;
        const yeucau = await Yeucau.findById(id).populate("ma_BN");
        if (!yeucau) {
            return res.status(404).json({ message: "Không tìm thấy yêu cầu" });
        }
        res.status(200).json(yeucau);
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const duyetYeuCau = async (req, res) => {
    const LanKham = require("../models/lankham.model"); // nhớ thêm dòng này!
   try {
    const id = req.params.id;
    const yeuCau = await Yeucau.findById(id).populate('ma_BN');

    if (!yeuCau) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }

    yeuCau.trang_thai_YC = 'da_duyet';
    await yeuCau.save();

    const maBN = yeuCau.ma_BN?._id;
    if (!maBN) {
      return res.status(400).json({ message: 'Thiếu thông tin bệnh nhân để tạo lần khám' });
    }

    // 1. Tạo lần khám
    const lanKhamMoi = await LanKham.create({
      maBenhNhan: maBN,
      ngay_kham: new Date(),
      trang_thai: 'dang_kham',
        ghi_chu: `${yeuCau.chuyen_khoa} - ${yeuCau.trieu_chung}`
    });

    // 2. Tạo một bước duy nhất (VD: Tiếp nhận)
    const buocDau = await Buoc.create({
      maBuoc: "tiep_nhan",
      tenBuoc: "Tiếp nhận",
      trangThai: "dang_xu_ly"
    });

    // 3. Tạo quy trình (chưa có sơ đồ)
    await QuyTrinh.create({
      ten: `Quy trình khám ${yeuCau.chuyen_khoa}`,
      maBenhNhan: maBN,
      lanKhamId: lanKhamMoi._id,
      cacBuoc: [buocDau._id],
      buocHienTai: buocDau.maBuoc,
      trangThai: "dang_xu_ly"
      // Không cần diagramId lúc này
    });

    return res.status(200).json({ message: 'Duyệt yêu cầu và tạo quy trình thành công' });
  } catch (error) {
    console.error("❌ Lỗi trong duyetYeuCau:", error);
    return res.status(500).json({ message: 'Lỗi server khi duyệt yêu cầu', error: error.message });
  }
};

  

const huyYeuCau = async (req, res) => {
    try {
        const { id } = req.params;
        const yeucau = await Yeucau.findByIdAndUpdate(
            id,
            { trang_thai_YC: "tu_choi" },
            { new: true }
        );
        if (!yeucau) {
            return res.status(404).json({ message: "Không tìm thấy yêu cầu để hủy" });
        }
        res.status(200).json({ message: "Yêu cầu đã bị hủy", yeucau });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const timKiemYeuCau = async (req, res) => {
    try {
        const ten = req.params.ten;

        // Tìm các yêu cầu khám có tên bệnh nhân khớp (dùng populate)
        const danhSach = await Yeucau.find().populate({
            path: 'ma_BN',
            match: { ho_ten: { $regex: ten, $options: 'i' } }, // tìm tên gần đúng, không phân biệt hoa thường
        });

        // Chỉ giữ lại những yêu cầu có ma_BN không null (nghĩa là tên khớp)
        const ketQua = danhSach.filter(yc => yc.ma_BN !== null);

        res.status(200).json(ketQua);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
    }
  };

module.exports = {
    guiYeuCauKham,
    layDanhSachYeuCau,
    layChiTietYeuCau,
    duyetYeuCau,
    huyYeuCau,
    timKiemYeuCau,
    layYeuCauCuaBenhNhanDangNhap,
};
