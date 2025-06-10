const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
});

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  links: [LinkSchema]
});

const FooterSchema = new mongoose.Schema({
  companyInfo: {
    logoText: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  socialLinks: {
    facebook: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    instagram: { type: String, trim: true, default: '' }
  },
  sections: [SectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Footer', FooterSchema);
