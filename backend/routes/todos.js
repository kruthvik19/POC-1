
const Todo = require('../models/todo');

const express = require('express');
const controller = require('../controllers/todoController');
const asyncWrap = require('../middleware/asyncWrapper');

const router = express.Router();

router.get('/', asyncWrap(controller.getTodos));
router.post('/', asyncWrap(controller.createTodo));
router.put('/:id', asyncWrap(controller.updateTodo));
router.delete('/:id', asyncWrap(controller.deleteTodo));

module.exports = router;

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete todo' });
  }
});

module.exports = router;
