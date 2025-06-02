const express = require('express');
const router = express.Router();
const controller = require('../controllers/Block.controller');

/**
 * @swagger
 * tags:
 *   name: Block
 *   description: API quản lý các block trong sơ đồ
 */

/**
 * @swagger
 * /api/blocks:
 *   get:
 *     summary: Lấy danh sách block
 *     tags: [Block]
 *     responses:
 *       200:
 *         description: Danh sách block
 */
router.get('/', controller.getBlocks);

/**
 * @swagger
 * /api/blocks:
 *   post:
 *     summary: Tạo block mới
 *     tags: [Block]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type, position, diagramId]
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               diagramId:
 *                 type: string
 *                 description: ID của sơ đồ (diagram) mà block thuộc về
 *               position:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *     responses:
 *       201:
 *         description: Tạo thành công
 */

router.post('/', controller.createBlock);

/**
 * @swagger
 * /api/blocks/{id}:
 *   put:
 *     summary: Cập nhật block
 *     tags: [Block]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               position:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', controller.updateBlock);

/**
 * @swagger
 * /api/blocks/{id}:
 *   delete:
 *     summary: Xóa block
 *     tags: [Block]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/:id', controller.deleteBlock);

module.exports = router;
