const express = require('express');
const router = express.Router();
const controller = require('../controllers/Diagram.controller');

router.post('/', controller.createDiagram);
router.get('/', controller.getAllDiagrams);
router.get('/:id', controller.getDiagramById);
router.delete('/:id', controller.deleteDiagram);

module.exports = router;
