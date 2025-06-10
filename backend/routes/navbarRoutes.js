const express = require('express');
const router = express.Router();
const NavbarElement = require('../models/NavbarElement');

// GET all navbar items sorted by order
router.get('/', async (req, res) => {
  try {
    const items = await NavbarElement.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new navbar item
router.post('/', async (req, res) => {
  const { title, url, order, children } = req.body;

  const newItem = new NavbarElement({ title, url, order, children });

  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update navbar item (for example, toggle visibility)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await NavbarElement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Navbar item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE navbar item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await NavbarElement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Navbar item not found" });
    res.json({ message: "Navbar item deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----------- CHILDREN MANAGEMENT -------------

// Add child to a navbar element
router.post('/:id/children', async (req, res) => {
  const { title, url, order = 0, visible = true } = req.body;
  try {
    const parent = await NavbarElement.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent nav item not found" });

    parent.children.push({ title, url, order, visible });
    await parent.save();
    res.status(201).json(parent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a child by childId inside a navbar element
router.patch('/:id/children/:childId', async (req, res) => {
  try {
    const parent = await NavbarElement.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent nav item not found" });

    const child = parent.children.id(req.params.childId);
    if (!child) return res.status(404).json({ message: "Child nav item not found" });

    Object.assign(child, req.body);
    await parent.save();
    res.json(parent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a child by childId inside a navbar element
router.delete('/:id/children/:childId', async (req, res) => {
  try {
    const parent = await NavbarElement.findById(req.params.id);
    if (!parent) return res.status(404).json({ message: "Parent nav item not found" });

    const child = parent.children.id(req.params.childId);
    if (!child) return res.status(404).json({ message: "Child nav item not found" });

    parent.children.pull(req.params.childId);
    await parent.save();
    res.json(parent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
