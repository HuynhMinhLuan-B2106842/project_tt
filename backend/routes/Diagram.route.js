const express = require('express');
const router = express.Router();
const controller = require('../controllers/Diagram.controller');

/**
 * @swagger
 * tags:
 *   name: Diagram
 *   description: API quản lý sơ đồ BPMN
 */

/**
 * @swagger
 * /api/diagrams:
 *   post:
 *     summary: Tạo sơ đồ mới
 *     tags: [Diagram]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', controller.createDiagram);

/**
 * @swagger
 * /api/diagrams:
 *   get:
 *     summary: Lấy tất cả sơ đồ
 *     tags: [Diagram]
 *     responses:
 *       200:
 *         description: Danh sách sơ đồ
 */
router.get('/', controller.getAllDiagrams);

/**
 * @swagger
 * /api/diagrams/{id}:
 *   get:
 *     summary: Lấy chi tiết sơ đồ theo ID
 *     tags: [Diagram]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Thông tin sơ đồ
 */
router.get('/:id', controller.getDiagramById);

/**
 * @swagger
 * /api/diagrams/{id}:
 *   delete:
 *     summary: Xoá sơ đồ
 *     tags: [Diagram]
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
router.delete('/:id', controller.deleteDiagram);

module.exports = router;
