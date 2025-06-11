const Yeucau = require("../models/yeucau.model");

const guiYeuCauKham = async (req, res) => {
    try {
        const yeucau = new Yeucau(req.body);
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
    try {
        const { id } = req.params;
        const yeucau = await Yeucau.findByIdAndUpdate(
            id,
            { trang_thai_YC: "da_duyet" },
            { new: true }
        );
        if (!yeucau) {
            return res.status(404).json({ message: "Không tìm thấy yêu cầu để duyệt" });
        }
        res.status(200).json({ message: "Đã duyệt yêu cầu khám", yeucau });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
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
};
