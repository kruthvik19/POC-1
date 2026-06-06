const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  name: { type: String, required: true },
  premium: { type: String, required: true },
  coverage: { type: String, required: true },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
