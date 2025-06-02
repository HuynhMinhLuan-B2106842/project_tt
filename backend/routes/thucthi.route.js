const express = require("express");
const router = express.Router();
const {
  taoThucThi,
  layTatCa,
  layChiTiet,
  capNhat,
  xoa
} = require("../controllers/thucthi.controller");

/**
 * @swagger
 * tags:
 *   name: Thucthiquytrinh
 *   description: API xử lý các quy trình khám bệnh đang thực hiện
 */

/**
 * @swagger
 * /api/thucthiquytrinh:
 *   post:
 *     summary: Tạo mới bản thực hiện quy trình từ mẫu
 *     tags: [Thucthiquytrinh]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_MQT:
 *                 type: string
 *               ma_LKB:
 *                 type: string
 *               ma_TK:
 *                 type: string
 *               tao_boi_TTQT:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post("/", taoThucThi);

/**
 * @swagger
 * /api/thucthiquytrinh:
 *   get:
 *     summary: Lấy tất cả quy trình đang thực hiện
 *     tags: [Thucthiquytrinh]
 *     responses:
 *       200:
 *         description: Danh sách quy trình
 */
router.get("/", layTatCa);

/**
 * @swagger
 * /api/thucthiquytrinh/{id}:
 *   get:
 *     summary: Lấy chi tiết quy trình thực hiện theo ID
 *     tags: [Thucthiquytrinh]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về chi tiết quy trình
 */
router.get("/:id", layChiTiet);

/**
 * @swagger
 * /api/thucthiquytrinh/{id}:
 *   put:
 *     summary: Cập nhật thông tin quy trình thực hiện
 *     tags: [Thucthiquytrinh]
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
 *               ma_MQT:
 *                 type: string
 *               ma_LKB:
 *                 type: string
 *               ma_TK:
 *                 type: string
 *               tao_boi_TTQT:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", capNhat);

/**
 * @swagger
 * /api/thucthiquytrinh/{id}:
 *   delete:
 *     summary: Xoá bản ghi thực hiện quy trình
 *     tags: [Thucthiquytrinh]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá
 */
router.delete("/:id", xoa);

module.exports = router;
