const mongoose = require('mongoose');

const NavbarElementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  children: [
    {
      title: String,
      url: String,
      order: Number,
      visible: { type: Boolean, default: true },
    },
  ],
});

module.exports = mongoose.model('NavbarElement', NavbarElementSchema);
