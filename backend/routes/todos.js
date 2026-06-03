const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().limit(10);
    if (todos.length === 0) {
      await Todo.create([
        { title: 'Build Angular frontend', completed: true },
        { title: 'Create Node.js API', completed: true },
        { title: 'Connect to MongoDB', completed: false }
      ]);
      return res.json(await Todo.find().limit(10));
    }
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load todos' });
  }
});

module.exports = router;
