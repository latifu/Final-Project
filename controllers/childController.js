const Child = require("../models/Child");
const Parent = require("../models/Parent");
const { createChildValidator } = require("../utils/validations");

const getAllChildren = async (req, res) => {
  const children = await Child.find();
  res.status(200).json({ children });
};

const createChild = async (req, res) => {
  try {
    const result = await createChildValidator.validateAsync(req.body);
    const { firstName, lastName, age, gender, parentId } = result;
    const child = await Child.create({ firstName, lastName, age, gender });
    const parent = await Parent.findById(parentId);
    parent.children.push(child._id);
    await parent.save({ validateBeforeSave: false });
    res.status(201).json({ child });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateChild = async (req, res) => {
  const { id } = req.params;
  const child = await Child.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ child });
};

const deleteChild = async (req, res) => {
  const { id } = req.params;
  await Child.findByIdAndDelete(id);
  res.status(200).json({ message: "Child deletion successful" });
};

module.exports = {
  getAllChildren,
  createChild,
  updateChild,
  deleteChild,
};
