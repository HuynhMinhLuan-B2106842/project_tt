const connectionService = require('../services/Connection.service');

exports.getConnections = async (req, res) => {
    try {
        const connections = await connectionService.getAllConnections(req.query.diagramId);
        res.json(connections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createConnection = async (req, res) => {
    try {
        const conn = await connectionService.createConnection(req.body);
        res.status(201).json(conn);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteConnection = async (req, res) => {
    try {
        await connectionService.deleteConnection(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
