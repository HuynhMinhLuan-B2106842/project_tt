const blockService = require('../services/Block.service');

exports.getBlocks = async (req, res) => {
    try {
        const blocks = await blockService.getAllBlocks(req.query.diagramId);
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBlock = async (req, res) => {
    try {
        const block = await blockService.createBlock(req.body);
        res.status(201).json(block);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBlock = async (req, res) => {
    try {
        const block = await blockService.updateBlock(req.params.id, req.body);
        res.json(block);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBlock = async (req, res) => {
    try {
        await blockService.deleteBlock(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};