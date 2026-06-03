const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
  const todos = await todoService.listTodos();
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, completed } = req.body;
  const todo = await todoService.createTodo({ title, completed });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const updated = await todoService.updateTodo(id, { title, completed });
  if (!updated) return res.status(404).json({ error: 'Todo not found' });
  res.json(updated);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await todoService.deleteTodo(id);
  if (!deleted) return res.status(404).json({ error: 'Todo not found' });
  res.json({ success: true });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
