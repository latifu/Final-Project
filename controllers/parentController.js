const Parent = require("../models/Parent");

const getAllParents = async (req, res) => {
  const parents = await Parent.find().populate("children");
  res.status(200).json({ parents });
};

const getCurrentParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent);
    res.status(200).json({ parent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleParent = async (req, res) => {
  if (!req.parent) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { id } = req.params;
  const parent = await Parent.findById(id);
  res.status(200).json({ parent });
};

const updateParent = async (req, res) => {
  const { id } = req.params;
  const parent = await Parent.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ parent });
};

const deleteParent = async (req, res) => {
  const { id } = req.params;
  await Parent.findByIdAndDelete(id);
  res.status(200).json({ message: "Parent deletion successful" });
};

module.exports = {
  getAllParents,
  getSingleParent,
  updateParent,
  deleteParent,
  getCurrentParent,
};
