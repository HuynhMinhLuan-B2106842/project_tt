const express = require('express');
const router = express.Router();
const quanLyQuyTrinh = require('../controllers/QuanLyQuyTrinh');

router.get('/', quanLyQuyTrinh.layTatCaQuyTrinh);
router.get('/:id', quanLyQuyTrinh.layQuyTrinhTheoId);
router.post('/', quanLyQuyTrinh.taoQuyTrinhMoi);
router.put('/:id', quanLyQuyTrinh.capNhatQuyTrinh);
router.delete('/:id', quanLyQuyTrinh.xoaQuyTrinh);
router.get('/sodo/sodo', quanLyQuyTrinh.layTatCaSoDo);
router.put("/capnhat-sodo/:id", quanLyQuyTrinh.capNhatDiagramQuyTrinh);
module.exports = router;