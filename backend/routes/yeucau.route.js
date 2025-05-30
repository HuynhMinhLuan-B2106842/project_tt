const express = require("express");
const router = express.Router();
const {
    guiYeuCauKham,
    layDanhSachYeuCau,
    layChiTietYeuCau,
    duyetYeuCau,
    huyYeuCau
} = require("../controllers/yeucau.controller");

/**
 * @swagger
 * /api/yeucau:
 *   post:
 *     summary: Bệnh nhân gửi yêu cầu khám
 *     tags: [YeuCau]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ma_BN, ngay_muon_kham, chuyen_khoa, trieu_chung]
 *             properties:
 *               ma_BN:
 *                 type: string
 *               ngay_muon_kham:
 *                 type: string
 *                 format: date
 *               chuyen_khoa:
 *                 type: string
 *               trieu_chung:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yêu cầu khám đã được gửi
 */
router.post("/", guiYeuCauKham);

/**
 * @swagger
 * /api/yeucau:
 *   get:
 *     summary: Nhân viên lấy danh sách yêu cầu khám
 *     tags: [YeuCau]
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu khám
 */
router.get("/", layDanhSachYeuCau);

/**
 * @swagger
 * /api/yeucau/{id}:
 *   get:
 *     summary: Xem chi tiết yêu cầu khám
 *     tags: [YeuCau]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết yêu cầu khám
 */
router.get("/:id", layChiTietYeuCau);

/**
 * @swagger
 * /api/yeucau/duyet/{id}:
 *   put:
 *     summary: Nhân viên duyệt yêu cầu khám
 *     tags: [YeuCau]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Yêu cầu đã được duyệt
 */
router.put("/duyet/:id", duyetYeuCau);

/**
 * @swagger
 * /api/yeucau/huy/{id}:
 *   delete:
 *     summary: Hủy yêu cầu khám
 *     tags: [YeuCau]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Yêu cầu đã bị hủy
 */
router.delete("/huy/:id", huyYeuCau);

module.exports = router;
