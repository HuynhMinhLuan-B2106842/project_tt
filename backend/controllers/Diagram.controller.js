const Diagram = require('../models/Diagram.model');

exports.getAllDiagrams = async (req, res) => {
  try {
    const diagrams = await Diagram.find().select('name createdAt updatedAt');
    res.json(diagrams);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách diagram', error: err.message });
  }
};

exports.getDiagramById = async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) {
      return res.status(404).json({ message: 'Không tìm thấy diagram' });
    }
    res.json(diagram);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy diagram', error: err.message });
  }
};

exports.createDiagram = async (req, res) => {
  try {
    const { name, xml } = req.body;
    if (!xml) {
      return res.status(400).json({ message: 'XML là bắt buộc' });
    }
    const diagram = new Diagram({
      name: name || 'diagram.bpmn',
      xml,
    });
    await diagram.save();
    res.status(201).json({ message: 'Lưu diagram thành công', diagram });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lưu diagram', error: err.message });
  }
};

exports.updateDiagram = async (req, res) => {
  try {
    const { name, xml } = req.body;
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) {
      return res.status(404).json({ message: 'Không tìm thấy diagram' });
    }
    diagram.name = name || diagram.name;
    diagram.xml = xml || diagram.xml;
    diagram.updatedAt = Date.now();
    await diagram.save();
    res.json({ message: 'Cập nhật diagram thành công', diagram });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật diagram', error: err.message });
  }
};

exports.deleteDiagram = async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) {
      return res.status(404).json({ message: 'Không tìm thấy diagram' });
    }
    await diagram.deleteOne();
    res.json({ message: 'Xóa diagram thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa diagram', error: err.message });
  }
};