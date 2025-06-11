const express = require("express");
const router = express.Router();
const {
    taoHoSoBenhNhan,
    layDanhSachBenhNhan,
    layChiTietBenhNhan,
    capNhatHoSoBenhNhan,
    xoaBenhNhan,
    Timkiembenhnhan,
} = require("../controllers/benhnhan.controller");

/**
 * @swagger
 * /api/benhnhan:
 *   post:
 *     summary: Tạo hồ sơ bệnh nhân mới
 *     tags: [BenhNhan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ho_ten
 *               - ngay_sinh
 *               - gioi_tinh
 *               - dien_thoai
 *               - email
 *               - dia_chi
 *             properties:
 *               ho_ten:
 *                 type: string
 *               ngay_sinh:
 *                 type: string
 *                 format: date
 *               gioi_tinh:
 *                 type: string
 *                 enum: [Nam, Nu, Khac]
 *               dien_thoai:
 *                 type: string
 *               email:
 *                 type: string
 *               dia_chi:
 *                 type: string
 *               ngay_tao_ho_so:
 *                 type: string
 *                 format: date
 *                 description: Không cần gửi, tự động tạo
 *     responses:
 *       201:
 *         description: Hồ sơ bệnh nhân được tạo thành công
 */
router.post("/", taoHoSoBenhNhan);

/**
 * @swagger
 * /api/benhnhan:
 *   get:
 *     summary: Lấy danh sách hồ sơ bệnh nhân
 *     tags: [BenhNhan]
 *     responses:
 *       200:
 *         description: Trả về danh sách hồ sơ bệnh nhân
 */
router.get("/", layDanhSachBenhNhan);

/**
 * @swagger
 * /api/benhnhan/timkiem/{ho_ten}:
 *   get:
 *     summary: Tìm kiếm bệnh nhân theo họ tên (gần đúng, không phân biệt hoa thường)
 *     tags: [BenhNhan]
 *     parameters:
 *       - name: ho_ten
 *         in: path
 *         required: true
 *         description: Họ tên bệnh nhân cần tìm (có thể là một phần tên)
 *         schema:
 *           type: string
 *           example: nguyen
 *     responses:
 *       200:
 *         description: Danh sách bệnh nhân tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   ho_ten:
 *                     type: string
 *                   ngay_sinh:
 *                     type: string
 *                     format: date
 *                   gioi_tinh:
 *                     type: string
 *                   dien_thoai:
 *                     type: string
 *                   email:
 *                     type: string
 *                   dia_chi:
 *                     type: string
 *                   ngay_tao_ho_so:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Không tìm thấy bệnh nhân nào
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/timkiem/:ho_ten', Timkiembenhnhan)

/**
 * @swagger
 * /api/benhnhan/{id}:
 *   get:
 *     summary: Lấy chi tiết hồ sơ bệnh nhân theo ID
 *     tags: [BenhNhan]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID bệnh nhân
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết hồ sơ bệnh nhân
 */
router.get("/:id", layChiTietBenhNhan);

/**
 * @swagger
 * /api/benhnhan/{id}:
 *   put:
 *     summary: Cập nhật hồ sơ bệnh nhân theo ID
 *     tags: [BenhNhan]
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
 *               ho_ten:
 *                 type: string
 *               ngay_sinh:
 *                 type: string
 *                 format: date
 *               gioi_tinh:
 *                 type: string
 *               dia_chi:
 *                 type: string
 *               dien_thoai:
 *                 type: string
 *               ngay_tao_ho_so:
 *                 type: string
 *                 format: date
 *                 description: Không cần gửi, tự động tạo
 *     responses:
 *       200:
 *         description: Hồ sơ bệnh nhân đã được cập nhật
 */
router.put("/:id", capNhatHoSoBenhNhan);

/**
 * @swagger
 * /api/benhnhan/{id}:
 *   delete:
 *     summary: Xoá hồ sơ bệnh nhân theo ID
 *     tags: [BenhNhan]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hồ sơ bệnh nhân đã được xoá
 */
router.delete("/:id", xoaBenhNhan);

module.exports = router;
