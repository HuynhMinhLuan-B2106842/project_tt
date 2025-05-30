const express = require("express");
const router = express.Router();
const {
  layChiTietBuoc,
  layDanhSachBuocTrongQuyTrinh,
  hoanThanhBuoc
} = require("../controllers/buocthucthi.controller");

/**
 * @swagger
 * tags:
 *   name: Buocthucthi
 *   description: API cho bước thực hiện quy trình
 */

/**
 * @swagger
 * /api/buocthucthi/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 bước
 *     tags: [Buocthucthi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Chi tiết bước
 */
router.get("/:id", layChiTietBuoc);

/**
 * @swagger
 * /api/buocthucthi/quytrinh/{id}:
 *   get:
 *     summary: Lấy danh sách các bước của một quy trình thực thi
 *     tags: [Buocthucthi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Danh sách bước
 */
router.get("/quytrinh/:id", layDanhSachBuocTrongQuyTrinh);

/**
 * @swagger
 * /api/buocthucthi/{id}/hoanthanh:
 *   put:
 *     summary: Đánh dấu bước đã hoàn thành
 *     tags: [Buocthucthi]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id/hoanthanh", hoanThanhBuoc);

module.exports = router;
