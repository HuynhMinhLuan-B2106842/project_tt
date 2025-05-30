const express = require("express");
const router = express.Router();
const {
  taoMau,
  layTatCa,
  layChiTiet,
  capNhat,
  xoa
} = require("../controllers/mauquytrinh.controller");

/**
 * @swagger
 * tags:
 *   name: Mauquytrinh
 *   description: API cho mẫu quy trình khám bệnh
 */

/**
 * @swagger
 * /api/mauquytrinh:
 *   post:
 *     summary: Tạo mẫu quy trình mới
 *     tags: [Mauquytrinh]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_MQT:
 *                 type: string
 *               mo_ta_MQT:
 *                 type: string
 *               bpmn_xml:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo mẫu thành công
 */
router.post("/", taoMau);

/**
 * @swagger
 * /api/mauquytrinh:
 *   get:
 *     summary: Lấy tất cả mẫu quy trình
 *     tags: [Mauquytrinh]
 *     responses:
 *       200:
 *         description: Danh sách mẫu quy trình
 */
router.get("/", layTatCa);

/**
 * @swagger
 * /api/mauquytrinh/{id}:
 *   get:
 *     summary: Lấy chi tiết mẫu quy trình
 *     tags: [Mauquytrinh]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về chi tiết mẫu
 */
router.get("/:id", layChiTiet);

/**
 * @swagger
 * /api/mauquytrinh/{id}:
 *   put:
 *     summary: Cập nhật mẫu quy trình
 *     tags: [Mauquytrinh]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               ten_MQT:
 *                 type: string
 *               mo_ta_MQT:
 *                 type: string
 *               bpmn_xml:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", capNhat);

/**
 * @swagger
 * /api/mauquytrinh/{id}:
 *   delete:
 *     summary: Xoá mẫu quy trình
 *     tags: [Mauquytrinh]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá thành công
 */
router.delete("/:id", xoa);

module.exports = router;
