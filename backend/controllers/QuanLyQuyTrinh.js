const mongoose = require("mongoose");
const QuyTrinh = require("../models/QuyTrinh");
const Buoc = require("../models/Buoc");
const Diagram = require("../models/Diagram.model");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

exports.layTatCaQuyTrinh = async (req, res) => {
  try {
    const danhSachQuyTrinh = await QuyTrinh.find()
      .populate({
        path: "lanKhamId",
        populate: {
          path: "maBenhNhan",
          model: "Benhnhan",
          select: "ho_ten _id",
        },
      })
      .populate("cacBuoc")
      .populate("diagramId", "name xml")
      .select(
        "ten lanKhamId ngayBatDau trangThai buocHienTai diagramId ngayCapNhat"
      );

    const response = danhSachQuyTrinh.map((qt) => {
      const benhNhan = qt.lanKhamId?.maBenhNhan;
      return {
        _id: qt._id,
        ten: qt.ten,
        ngayBatDau: qt.ngayBatDau,
        trangThai: qt.trangThai,
        buocHienTai: qt.buocHienTai,
        diagramId: qt.diagramId,
        cacBuoc: qt.cacBuoc,
        maBenhNhan: benhNhan?._id,
        tenBenhNhan: benhNhan?.ho_ten || "Không rõ",
      };
    });
    res.json(danhSachQuyTrinh);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách quy trình", error: err.message });
  }
};

exports.layQuyTrinhTheoId = async (req, res) => {
  try {
    const quyTrinh = await QuyTrinh.findById(req.params.id)
      .populate({
        path: "lanKhamId",
        populate: {
          path: "maBenhNhan",
          model: "Benhnhan",
          select: "ho_ten _id",
        },
      })
      .populate("cacBuoc")
      .populate("diagramId", "name xml")
      .select(
        "ten lanKhamId ngayBatDau trangThai buocHienTai diagramId cacBuoc ngayCapNhat"
      );

    if (!quyTrinh) {
      return res.status(404).json({ message: "Không tìm thấy quy trình" });
    }

    res.json(quyTrinh);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy chi tiết quy trình", error: err.message });
  }
};

exports.capNhatDiagramQuyTrinh = async (req, res) => {
  try {
    const { diagramId } = req.body;
    const { id: quyTrinhId } = req.params;

    if (!diagramId) {
      return res.status(400).json({ message: "Thiếu diagramId" });
    }

    const quyTrinh = await QuyTrinh.findById(quyTrinhId);
    if (!quyTrinh) {
      return res.status(404).json({ message: "Không tìm thấy quy trình" });
    }

    const soDo = await Diagram.findById(diagramId);
    if (!soDo) {
      return res.status(404).json({ message: "Sơ đồ BPMN không tồn tại" });
    }

    // Parse XML để lấy các bước
    const steps = await new Promise((resolve, reject) => {
      parser.parseString(soDo.xml, (err, result) => {
        if (err) reject(err);
        const processes = result["bpmn:definitions"]["bpmn:process"] || [];
        const stepsArray = [];

        processes.forEach((process) => {
          const tasks = process["bpmn:task"] || [];
          tasks.forEach((task) => {
            const stepName = task["$"].name || `Task_${tasks.indexOf(task) + 1}`;
            const stepId = task["$"].id;
            stepsArray.push({ maBuoc: stepId, tenBuoc: stepName });
          });
        });

        resolve(stepsArray);
      });
    });

    // Xóa các bước cũ
    await Buoc.deleteMany({ _id: { $in: quyTrinh.cacBuoc } });

    // Tạo lại danh sách bước mới
    const danhSachBuoc = await Buoc.insertMany(
      steps.map((step, index) => ({
        maBuoc: step.maBuoc,
        tenBuoc: step.tenBuoc,
        trangThai: index === 0 ? "dang_xu_ly" : "cho_xu_ly",
      }))
    );

    quyTrinh.diagramId = diagramId;
    quyTrinh.cacBuoc = danhSachBuoc.map((b) => b._id);
    quyTrinh.buocHienTai = steps.length > 0 ? steps[0].maBuoc : null;
    quyTrinh.trangThai = steps.length > 0 ? "dang_xu_ly" : "cho_xu_ly";
    quyTrinh.ngayCapNhat = new Date();

    await quyTrinh.save();

    res.json({
      message: "Cập nhật sơ đồ và các bước thành công",
      quyTrinh,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi cập nhật sơ đồ và các bước",
      error: err.message,
    });
  }
};


exports.taoQuyTrinhMoi = async (req, res) => {
  try {
    const { ten, lanKhamId, diagramId } = req.body;

    if (!ten || !lanKhamId || !diagramId) {
      return res.status(400).json({ message: "Thông tin không đầy đủ" });
    }

    // Kiểm tra xem diagramId có tồn tại không
    const soDo = await Diagram.findById(diagramId);
    if (!soDo) {
      return res.status(404).json({ message: "Sơ đồ BPMN không tồn tại" });
    }

    // Trích xuất các bước từ XML
    const steps = await new Promise((resolve, reject) => {
      parser.parseString(soDo.xml, (err, result) => {
        if (err) reject(err);

        const processes = result["bpmn:definitions"]["bpmn:process"] || [];
        const stepsArray = [];

        processes.forEach((process) => {
          const tasks = process["bpmn:task"] || [];
          tasks.forEach((task) => {
            const stepName =
              task["$"].name || `Task_${tasks.indexOf(task) + 1}`;
            const stepId = task["$"].id;
            stepsArray.push({ maBuoc: stepId, tenBuoc: stepName });
          });
        });

        resolve(stepsArray);
      });
    });

    // Tạo các bước trong Buoc
    const danhSachBuoc = await Buoc.insertMany(
      steps.map((step, index) => ({
        maBuoc: step.maBuoc,
        tenBuoc: step.tenBuoc,
        trangThai: index === 0 ? "dang_xu_ly" : "cho_xu_ly",
      }))
    );

    const quyTrinh = new QuyTrinh({
      ten,
      lanKhamId,
      diagramId,
      cacBuoc: danhSachBuoc.map((buoc) => buoc._id),
      buocHienTai: steps.length > 0 ? steps[0].maBuoc : null,
      trangThai: steps.length > 0 ? "dang_xu_ly" : "cho_xu_ly",
      ngayBatDau: new Date(),
    });

    await quyTrinh.save();
    res.status(201).json({ message: "Tạo quy trình thành công", quyTrinh });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo quy trình", error: err.message });
  }
};

exports.capNhatQuyTrinh = async (req, res) => {
  try {
    const {
      ten,
      maBenhNhan,
      trangThai,
      buocHienTai,
      diagramId,
      cacBuoc: updatedSteps,
    } = req.body;
    const quyTrinh = await QuyTrinh.findById(req.params.id).populate("cacBuoc");

    if (!quyTrinh) {
      return res.status(404).json({ message: "Không tìm thấy quy trình" });
    }

    if (ten) quyTrinh.ten = ten;
    if (maBenhNhan) quyTrinh.maBenhNhan = maBenhNhan;
    if (trangThai) quyTrinh.trangThai = trangThai;
    if (buocHienTai) quyTrinh.buocHienTai = buocHienTai;
    if (diagramId) {
      const soDo = await Diagram.findById(diagramId);
      if (!soDo) {
        return res.status(404).json({ message: "Sơ đồ BPMN không tồn tại" });
      }
      quyTrinh.diagramId = diagramId;
    }

    if (updatedSteps && Array.isArray(updatedSteps)) {
      // Xóa các bước cũ
      await Buoc.deleteMany({ _id: { $in: quyTrinh.cacBuoc } });

      // Tạo danh sách bước mới từ updatedSteps
      const danhSachBuoc = await Buoc.insertMany(
        updatedSteps.map((step) => ({
          maBuoc: step.maBuoc,
          tenBuoc: step.tenBuoc,
          trangThai: step.trangThai || "cho_xu_ly",
          nguoiThucHien: step.nguoiThucHien || null,
          ghiChu: step.ghiChu || null,
          thoiGianHoanThanh: step.thoiGianHoanThanh || null,
        }))
      );
      quyTrinh.cacBuoc = danhSachBuoc.map((buoc) => buoc._id);

      // Lấy các bước đã populate để kiểm tra trạng thái thực tế
      const populatedSteps = await Buoc.find({
        _id: { $in: quyTrinh.cacBuoc },
      });
      const viTriHoanThanh = populatedSteps.reduce((maxIndex, b, index) => {
        return b.trangThai === "hoan_thanh" ? index : maxIndex;
      }, -1);
      console.log(
        "Vị trí hoàn thành cuối cùng:",
        viTriHoanThanh,
        "Tổng bước:",
        populatedSteps.length
      );

      if (viTriHoanThanh === populatedSteps.length - 1) {
        quyTrinh.buocHienTai = null;
        quyTrinh.trangThai = "hoan_thanh";
      } else if (
        viTriHoanThanh >= 0 &&
        viTriHoanThanh < populatedSteps.length - 1
      ) {
        quyTrinh.buocHienTai = populatedSteps[viTriHoanThanh + 1].maBuoc;
        quyTrinh.trangThai = "dang_xu_ly";
      } else if (viTriHoanThanh === -1 && populatedSteps.length > 0) {
        quyTrinh.buocHienTai = populatedSteps[0].maBuoc;
        quyTrinh.trangThai = "dang_xu_ly";
      }
    }

    quyTrinh.ngayCapNhat = Date.now();
    await quyTrinh.save();

    const quyTrinhCapNhat = await QuyTrinh.findById(req.params.id)
      .populate("cacBuoc")
      .populate("diagramId", "name xml")
      .select(
        "ten maBenhNhan ngayBatDau trangThai buocHienTai diagramId cacBuoc ngayCapNhat"
      )
      .populate({
        path: "maBenhNhan",
        select: "ho_ten",
      });
    res.json({
      message: "Cập nhật quy trình thành công",
      quyTrinh: quyTrinhCapNhat,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật quy trình", error: err.message });
  }
};

exports.xoaQuyTrinh = async (req, res) => {
  try {
    const quyTrinh = await QuyTrinh.findById(req.params.id);
    if (!quyTrinh) {
      return res.status(404).json({ message: "Không tìm thấy quy trình" });
    }
    await Buoc.deleteMany({ _id: { $in: quyTrinh.cacBuoc } });
    await quyTrinh.deleteOne();
    res.json({ message: "Xóa quy trình thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa quy trình", error: err.message });
  }
};

exports.layTatCaSoDo = async (req, res) => {
  try {
    const danhSachSoDo = await Diagram.find().select(
      "name xml createdAt updatedAt"
    );
    res.json(danhSachSoDo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sơ đồ", error: err.message });
  }
};
