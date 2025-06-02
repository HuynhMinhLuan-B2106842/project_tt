const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { 
        type: String,
        enum: ['normal', 'condition', 'start', 'end'],
        // "type": "normal" → khối xử lý bình thường
        // "type": "condition" → khối if/else hoặc switch
        // "type": "start" → điểm bắt đầu
        // "type": "end" → điểm kết thúc
        required: true 
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    diagramId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diagram', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Block', BlockSchema);