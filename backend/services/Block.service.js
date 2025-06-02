const Block = require('../models/Block.model');

exports.getAllBlocks = async (diagramId = null) => {
    try {
        return diagramId
      ? await Block.find({ diagramId })
      : await Block.find();
    } catch (err) {
        console.error('Error getting blocks:', err);
        throw new Error('Failed to retrieve blocks');
    }
};

exports.createBlock = async (data) => {
    try {
        const block = new Block(data);
        return await block.save();
    } catch (err) {
        console.error('Error creating block:', err);
        throw new Error('Failed to create block');
    }
};

exports.updateBlock = async (id, data) => {
    try {
        return await Block.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
        console.error('Error updating block:', err);
        throw new Error('Failed to update block');
    }
};

exports.deleteBlock = async (id) => {
    try {
        return await Block.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error deleting block:', err);
        throw new Error('Failed to delete block');
    }
};