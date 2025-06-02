const express = require('express');
const router = express.Router();
const controller = require('../controllers/Connection.controller');

/**
 * @swagger
 * tags:
 *   name: Connection
 *   description: API quản lý kết nối giữa các khối
 */

/**
 * @swagger
 * /api/connections:
 *   get:
 *     summary: Lấy danh sách connection
 *     tags: [Connection]
 *     parameters:
 *       - in: query
 *         name: diagramId
 *         schema:
 *           type: string
 *         description: ID sơ đồ để lọc
 *     responses:
 *       200:
 *         description: Danh sách connection
 */
router.get('/', controller.getConnections);

/**
 * @swagger
 * /api/connections:
 *   post:
 *     summary: Tạo connection mới
 *     tags: [Connection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [from, to, diagramId]
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               label:
 *                 type: string
 *               diagramId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', controller.createConnection);

/**
 * @swagger
 * /api/connections/{id}:
 *   delete:
 *     summary: Xoá connection
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Xoá thành công
 */
router.delete('/:id', controller.deleteConnection);

module.exports = router;
