const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  bpmnXml: { type: String },
  blocks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Block'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Diagram', DiagramSchema);
