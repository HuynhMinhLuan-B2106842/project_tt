const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true },
    label: {
        type: String, // "true", "false", "case A", "case B", ...
        default: ""
      }
}, { timestamps: true });

module.exports = mongoose.model('Connection', ConnectionSchema);