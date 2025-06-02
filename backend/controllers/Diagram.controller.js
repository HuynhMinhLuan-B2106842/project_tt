const diagramService = require('../services/Diagram.service');
const Diagram = require('../models/Diagram.model');
const Block = require('../models/Block.model');
const Connection = require('../models/Connection.model');

exports.createDiagram = async (req, res) => {
    try {
        const diagram = await diagramService.createDiagram(req.body);
        res.status(201).json(diagram);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllDiagrams = async (req, res) => {
  try {
    const diagrams = await Diagram.find(); 
    const results = [];

    for (const diagram of diagrams) {
      const connections = await Connection.find({ diagramId: diagram._id });
      results.push({ ...diagram.toObject(), connections });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiagramById = async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ error: 'Diagram not found' });

    // Truy vấn block theo diagramId mà không cần populate
    const blocks = await Block.find({ diagramId: diagram._id });

    const connections = await Connection.find({ diagramId: diagram._id });

    res.json({ diagram, blocks, connections });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDiagram = async (req, res) => {
    try {
        await Block.deleteMany({ diagramId: req.params.id });
        await Connection.deleteMany({ diagramId: req.params.id });
        await Diagram.findByIdAndDelete(req.params.id);
        res.json({ message: 'Diagram deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
