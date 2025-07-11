const Lankham = require("../models/lankham.model");
const Yeucau = require("../models/yeucau.model");
const BenhNhan = require('../models/benhnhan.model');

const taoLanKham = async (req, res) => {
    try {
        const { yeu_cau_id, ngay_kham, ghi_chu } = req.body;

        const yeucau = await Yeucau.findById(yeu_cau_id);
        if (!yeucau) {
            return res.status(404).json({ message: "Không tìm thấy yêu cầu khám" });
        }

        if (yeucau.trang_thai_YC !== "da_duyet") {
            return res.status(400).json({ message: "Yêu cầu chưa được duyệt" });
        }

        const lankham = new Lankham({
            ma_BN: yeucau.ma_BN,
            ngay_kham,
            ghi_chu,
            trang_thai: "dang_kham",
        });

        await lankham.save();

        // Sau khi tạo lần khám, có thể cập nhật trạng thái yêu cầu nếu muốn
        yeucau.trang_thai_YC = "da_duyet"; // hoặc chuyển sang "da_kham" nếu bạn có trạng thái đó
        await yeucau.save();

        res.status(201).json({ message: "Tạo lần khám thành công", lankham });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const layDanhSachLanKham = async (req, res) => {
    try {
        const danhSach = await Lankham.find().populate("ma_BN");
        res.status(200).json(danhSach);
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const layChiTietLanKham = async (req, res) => {
    try {
        const lankham = await Lankham.findById(req.params.id).populate("maBenhNhan");
        if (!lankham) {
            return res.status(404).json({ message: "Không tìm thấy lần khám" });
        }
        res.status(200).json(lankham);
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const capNhatTrangThaiLanKham = async (req, res) => {
    try {
        const { id } = req.params;
        const { trang_thai } = req.body;

        const lankham = await Lankham.findByIdAndUpdate(
            id,
            { trang_thai },
            { new: true }
        );

        if (!lankham) {
            return res.status(404).json({ message: "Không tìm thấy lần khám" });
        }

        res.status(200).json({ message: "Cập nhật trạng thái thành công", lankham });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};

const xoaLanKham = async (req, res) => {
    try {
        const { id } = req.params;
        const lankham = await Lankham.findByIdAndDelete(id);

        if (!lankham) {
            return res.status(404).json({ message: "Không tìm thấy lần khám để xoá" });
        }

        res.status(200).json({ message: "Đã xoá lần khám thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  };
// const layLanKhamCuaToi = async (req, res) => {
//     try {
//         const benhNhanId = req.user.id || req.user._id;

//         const danhSach = await Lankham.find({ ma_BN: benhNhanId }).populate("ma_BN");
//         res.status(200).json(danhSach);
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
//     }
//     console.log("Thông tin user từ token:", req.user);
// };
const layLanKhamCuaToi = async (req, res) => {
  try {
    const taiKhoanId = req.user.id; // từ token decode ra
    const benhNhan = await BenhNhan.findOne({ tai_khoan_id: taiKhoanId });
    

    if (!benhNhan) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân tương ứng với tài khoản." });
    }
    const danhSachLanKham = await Lankham.find({ maBenhNhan: benhNhan._id });
    return res.json(danhSachLanKham);
  } catch (error) {
    console.error("❌ Lỗi tại layLanKhamCuaToi:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi server.", error: error.message });
  }
};

module.exports = {
    taoLanKham,
    layDanhSachLanKham,
    layChiTietLanKham,
    capNhatTrangThaiLanKham,
    xoaLanKham,
    layLanKhamCuaToi,
};
