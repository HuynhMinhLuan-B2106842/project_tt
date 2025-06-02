const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Connection' }]
}, { timestamps: true });

module.exports = mongoose.model('Diagram', DiagramSchema);