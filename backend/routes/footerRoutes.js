const express = require('express');
const router = express.Router();
const Footer = require('../models/Footer');

// GET footer data (only one doc assumed)
router.get('/', async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST or PATCH footer data (upsert)
router.post('/', async (req, res) => {
  const { title, description, socialLinks, companyLinks } = req.body;
  try {
    let footer = await Footer.findOne();
    if (footer) {
      // Update
      footer.title = title;
      footer.description = description;
      footer.socialLinks = socialLinks;
      footer.companyLinks = companyLinks;
      await footer.save();
    } else {
      // Create
      footer = new Footer({ title, description, socialLinks, companyLinks });
      await footer.save();
    }
    res.json(footer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
