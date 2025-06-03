const mongoose = require('mongoose');

const diagramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'diagram.bpmn',
  },
  xml: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Diagram', diagramSchema);