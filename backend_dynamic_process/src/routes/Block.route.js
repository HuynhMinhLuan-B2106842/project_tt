const express = require('express');
const router = express.Router();
const controller = require('../controllers/Block.controller');

router.get('/', controller.getBlocks);
router.post('/', controller.createBlock);
router.put('/:id', controller.updateBlock);
router.delete('/:id', controller.deleteBlock);

module.exports = router;