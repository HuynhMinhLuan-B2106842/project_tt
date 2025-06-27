const express = require("express");
const router = express.Router();
const {
    guiYeuCauKham,
    layDanhSachYeuCau,
    layChiTietYeuCau,
    duyetYeuCau,
    huyYeuCau,
    timKiemYeuCau,
    layYeuCauCuaToi,
} = require("../controllers/yeucau.controller");
const auth = require('../middleware/auth');

router.post('/', auth, guiYeuCauKham);

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
 * /api/yeucau/benhnhan/me:
 *   get:
 *     summary: Lấy danh sách yêu cầu lần khám của bệnh nhân đang đăng nhập
 *     tags: [YeuCau]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/benhnhan/me", auth, layYeuCauCuaToi);

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

/**
 * @swagger
 * /api/yeucau/timkiem/{ten}:
 *   get:
 *     summary: Tìm kiếm yêu cầu khám theo tên bệnh nhân
 *     tags: [YeuCau]
 *     parameters:
 *       - in: path
 *         name: ten
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên bệnh nhân cần tìm
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu khám tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/YeuCau'
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/timkiem/:ten', timKiemYeuCau);

module.exports = router;
