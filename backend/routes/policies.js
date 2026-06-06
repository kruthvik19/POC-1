const express = require('express');
const verifyToken = require('../middleware/auth');
const Policy = require('../models/policy');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies.map(p => ({ ...p.toObject(), id: p._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: 'Unable to load policies' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).json({ ...policy.toObject(), id: policy._id.toString() });
  } catch (err) {
    res.status(400).json({ error: 'Unable to create policy' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!policy) return res.status(404).json({ error: 'Not found' });
    res.json({ ...policy.toObject(), id: policy._id.toString() });
  } catch (err) {
    res.status(400).json({ error: 'Unable to update policy' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) return res.status(404).json({ error: 'Not found' });
    res.json({ ...policy.toObject(), id: policy._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete policy' });
  }
});

module.exports = router;
