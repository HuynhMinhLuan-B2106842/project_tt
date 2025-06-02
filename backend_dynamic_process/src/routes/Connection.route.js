const express = require('express');
const router = express.Router();
const controller = require('../controllers/Connection.controller');

router.get('/', controller.getConnections);
router.post('/', controller.createConnection);
router.delete('/:id', controller.deleteConnection);

module.exports = router;