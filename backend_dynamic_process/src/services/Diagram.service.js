const Diagram = require('../models/Diagram.model');

exports.createDiagram = async (data) => {
    try {
        const diagram = new Diagram(data);
        return await diagram.save();
    } catch (err) {
        console.error('Error creating diagram:', err);
        throw new Error('Failed to create diagram');
    }
};

exports.getAllDiagrams = async () => {
    try {
        return await Diagram.find().populate('blocks connections');
    } catch (err) {
        console.error('Error getting diagrams:', err);
        throw new Error('Failed to get diagrams');
    }
};

exports.getDiagramById = async (id) => {
    try {
        return await Diagram.findById(id).populate('blocks connections');
    } catch (err) {
        console.error('Error getting diagram:', err);
        throw new Error('Failed to get diagram by ID');
    }
};

exports.deleteDiagram = async (id) => {
    try {
        return await Diagram.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error deleting diagram:', err);
        throw new Error('Failed to delete diagram');
    }
};
