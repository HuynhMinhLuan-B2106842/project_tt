const Benhnhan = require("../models/benhnhan.model");

// Tạo hồ sơ bệnh nhân mới
const taoHoSoBenhNhan = async (req, res) => {
    try {
        const { ho_ten, ngay_sinh, gioi_tinh, dien_thoai, email, dia_chi } = req.body;

        const benhnhan = new Benhnhan({
            ho_ten,
            ngay_sinh,
            gioi_tinh,
            dien_thoai,
            email,
            dia_chi,
        });

        await benhnhan.save();
        res.status(201).json({ message: "Tạo hồ sơ bệnh nhân thành công", benhnhan });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

// Lấy danh sách hồ sơ bệnh nhân
const layDanhSachBenhNhan = async (req, res) => {
    try {
        const benhnhanList = await Benhnhan.find().populate('tai_khoan_id', 'ten_dang_nhap');
        res.status(200).json(benhnhanList);
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

const Timkiembenhnhan = async (req, res) => {
  try {
    const { ho_ten } = req.params;

    const benhnhans = await Benhnhan.find({
      ho_ten: { $regex: ho_ten, $options: 'i' } 
    });

    if (benhnhans.length === 0) {
      return res.status(200).json({ message: "Không tìm thấy hồ sơ bệnh nhân" });
    }

    res.status(200).json(benhnhans);
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Lấy chi tiết hồ sơ bệnh nhân theo ID
const layChiTietBenhNhan = async (req, res) => {
    try {
        const { id } = req.params;
        const benhnhan = await Benhnhan.findById(id);
        if (!benhnhan) {
            return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân" });
        }
        res.status(200).json(benhnhan);
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};


// Lấy chi tiết hồ sơ bệnh nhân theo tài khoản ID
const layChiTietBenhNhanTheoID_TK = async (req, res) => {
    try {
        const { id_tk } = req.params;

        const benhnhan = await Benhnhan.findOne({ tai_khoan_id: id_tk });

        if (!benhnhan) {
            return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân theo tài khoản" });
        }

        res.status(200).json(benhnhan);
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

// Cập nhật hồ sơ bệnh nhân theo ID
const capNhatHoSoBenhNhan = async (req, res) => {
    try {
        const { id } = req.params;
        const { ho_ten, ngay_sinh, gioi_tinh, dia_chi, dien_thoai, email } = req.body;

        // Lấy thông tin cũ trước khi cập nhật
        const thongTinCu = await Benhnhan.findById(id);
        if (!thongTinCu) {
            return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân để cập nhật" });
        }

        // Cập nhật hồ sơ bệnh nhân
        const thongTinMoi = await Benhnhan.findByIdAndUpdate(
            id,
            { ho_ten, ngay_sinh, gioi_tinh, dia_chi, dien_thoai, email },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Cập nhật hồ sơ bệnh nhân thành công",
            thongTinCu,
            thongTinMoi
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};


// Xóa hồ sơ bệnh nhân theo ID
const xoaBenhNhan = async (req, res) => {
    try {
        const { id } = req.params;
        const benhnhan = await Benhnhan.findByIdAndDelete(id);

        if (!benhnhan) {
            return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh nhân để xóa" });
        }

        res.status(200).json({ message: "Xóa hồ sơ bệnh nhân thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};


module.exports = {
    taoHoSoBenhNhan,
    layDanhSachBenhNhan,
    layChiTietBenhNhan,
    layChiTietBenhNhanTheoID_TK,
    capNhatHoSoBenhNhan,
    xoaBenhNhan,
    Timkiembenhnhan,
};

