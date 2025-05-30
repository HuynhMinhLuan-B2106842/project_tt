const diagramService = require('../services/Diagram.service');

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
        const diagrams = await diagramService.getAllDiagrams();
        res.json(diagrams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDiagramById = async (req, res) => {
    try {
        const diagram = await diagramService.getDiagramById(req.params.id);
        res.json(diagram);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteDiagram = async (req, res) => {
    try {
        await diagramService.deleteDiagram(req.params.id);
        res.json({ message: 'Diagram deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
