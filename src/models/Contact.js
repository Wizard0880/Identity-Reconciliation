const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phoneNumber: String,
  email: String,
  linkedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  linkPrecedence: {
    type: String,
    enum: ['primary', 'secondary'],
    required: true
  },
  deletedAt: Date
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Contact', contactSchema);