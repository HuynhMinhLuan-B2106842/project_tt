const express = require("express");
const router = express.Router();
const { 
    dangKy,
    dangNhap,
    laydanhSachTaiKhoan,
    capNhatTaiKhoan,
    xoaTaiKhoan,
    layThongTinTaiKhoan,
} = require("../controllers/taikhoan.controller");
const auth = require("../middleware/auth"); // Middleware kiểm tra token
const { doiMatKhau } = require("../controllers/taikhoan.controller");
/**
 * @swagger
 * /api/taikhoan/doimatkhau:
 *   put:
 *     summary: Đổi mật khẩu tài khoản hiện tại (đăng nhập mới dùng được)
 *     tags: [Taikhoan]
 *     security:
 *       - bearerAuth: []  # Phải có token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mat_khau_cu, mat_khau_moi, mat_khau_moi_laplai]
 *             properties:
 *               mat_khau_cu:
 *                 type: string
 *               mat_khau_moi:
 *                 type: string
 *               mat_khau_moi_laplai:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Lỗi xác thực mật khẩu
 *       403:
 *         description: Token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.put("/doimatkhau", auth, doiMatKhau);

/**
 * @swagger
 * /api/taikhoan/register:
 *   post:
 *     summary: Đăng ký tài khoản (vai trò mặc định là patient)
 *     tags: [Taikhoan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ten_dang_nhap, mat_khau]
 *             properties:
 *               ten_dang_nhap:
 *                 type: string
 *                 description: Tên đăng nhập (email hoặc username)
 *               mat_khau:
 *                 type: string
 *                 description: Mật khẩu
 *     responses:
 *       201:
 *         description: Tài khoản được tạo thành công
 *       400:
 *         description: Tên đăng nhập đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post("/register", dangKy);


/**
 * @swagger
 * /api/taikhoan/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [Taikhoan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ten_dang_nhap, mat_khau]
 *             properties:
 *               ten_dang_nhap:
 *                 type: string
 *               mat_khau:
 *                 type: string
 *               repassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post("/login", dangNhap);

/**
 * @swagger
 * /api/taikhoan/list:
 *   get:
 *     summary: Lấy danh sách tài khoản (admin)
 *     tags: [Taikhoan]
 *     responses:
 *       200:
 *         description: Trả về danh sách
 */
router.get("/list", laydanhSachTaiKhoan);

/**
 * @swagger
 * /api/taikhoan/{id}:
 *   get:
 *     summary: Lấy thông tin tài khoản theo ID
 *     tags: [Taikhoan]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID tài khoản MongoDB
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 ten_TK:
 *                   type: string
 *                 ten_dang_nhap:
 *                   type: string
 *                 vai_tro:
 *                   type: string
 *       404:
 *         description: Không tìm thấy tài khoản
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:id', layThongTinTaiKhoan);

/**
 * @swagger
 * /api/taikhoan/{id}:
 *   put:
 *     summary: Cập nhật tài khoản theo ID
 *     tags: [Taikhoan]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID tài khoản
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_TK:
 *                 type: string
 *               vai_tro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã cập nhật
 */
router.put("/:id", capNhatTaiKhoan);

/**
 * @swagger
 * /api/taikhoan/{id}:
 *   delete:
 *     summary: Xoá tài khoản theo ID
 *     tags: [Taikhoan]
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
router.delete("/:id", xoaTaiKhoan);
module.exports = router;
