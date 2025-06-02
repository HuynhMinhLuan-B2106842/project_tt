const Connection = require('../models/Connection.model');

exports.getAllConnections = async (diagramId = null) => {
  try {
    if (diagramId) {
      return await Connection.find({ diagramId }).populate('from to');
    }
    return await Connection.find().populate('from to');
  } catch (err) {
    console.error('Error getting connections:', err);
    throw new Error('Failed to retrieve connections');
  }
};

exports.createConnection = async (data) => {
  try {
    const conn = new Connection(data);
    return await conn.save();
  } catch (err) {
    console.error('Error creating connection:', err);
    throw new Error('Failed to create connection');
  }
};

exports.deleteConnection = async (id) => {
  try {
    return await Connection.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting connection:', err);
    throw new Error('Failed to delete connection');
  }
};