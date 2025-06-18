const express = require("express");
const router = express.Router();
const xacThucNguoiDung  = require("../middleware/auth");
const {
    taoLanKham,
    layDanhSachLanKham,
    layChiTietLanKham,
    capNhatTrangThaiLanKham,
    xoaLanKham,
    layLanKhamCuaToi,
} = require("../controllers/lankham.controller");

/**
 * @swagger
 * /api/lankham/benhnhan/me:
 *   get:
 *     summary: Lấy danh sách lần khám của bệnh nhân đang đăng nhập
 *     tags: [Lankham]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */

router.get("/benhnhan/me", xacThucNguoiDung, layLanKhamCuaToi);
/**
 * @swagger
 * /api/lankham:
 *   post:
 *     summary: Tạo lần khám mới từ yêu cầu đã duyệt
 *     tags: [Lankham]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [yeu_cau_id, ngay_kham]
 *             properties:
 *               yeu_cau_id:
 *                 type: string
 *               ngay_kham:
 *                 type: string
 *                 format: date
 *               ghi_chu:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo lần khám thành công
 */
router.post("/", taoLanKham);

/**
 * @swagger
 * /api/lankham:
 *   get:
 *     summary: Lấy danh sách các lần khám
 *     tags: [Lankham]
 *     responses:
 *       200:
 *         description: Danh sách lần khám
 */
router.get("/", layDanhSachLanKham);

/**
 * @swagger
 * /api/lankham/{id}:
 *   get:
 *     summary: Lấy chi tiết lần khám
 *     tags: [Lankham]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết lần khám
 */
router.get("/:id", layChiTietLanKham);

/**
 * @swagger
 * /api/lankham/{id}:
 *   patch:
 *     summary: Cập nhật trạng thái lần khám
 *     tags: [Lankham]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trang_thai:
 *                 type: string
 *                 enum: [dang_kham, hoan_thanh, huy]
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 */
router.patch("/:id", capNhatTrangThaiLanKham);

/**
 * @swagger
 * /api/lankham/{id}:
 *   delete:
 *     summary: Xoá lần khám theo ID
 *     tags: [Lankham]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lần khám
 *     responses:
 *       200:
 *         description: Xoá lần khám thành công
 *       404:
 *         description: Không tìm thấy lần khám
 */
router.delete("/:id", xoaLanKham);

module.exports = router;
