const express = require("express");
const router = express.Router();
const { 
    dangKy,
    dangNhap,
    laydanhSachTaiKhoan,
    capNhatTaiKhoan,
    xoaTaiKhoan,
} = require("../controllers/taikhoan.controller");

/**
 * @swagger
 * /api/taikhoan/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Taikhoan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ten_dang_nhap, mat_khau, vai_tro]
 *             properties:
 *               ten_TK:
 *                 type: string
 *               ten_dang_nhap:
 *                 type: string
 *               mat_khau:
 *                 type: string
 *               vai_tro:
 *                 type: string
 *                 enum: [patient, staff, admin]
 *     responses:
 *       201:
 *         description: Tài khoản được tạo
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
