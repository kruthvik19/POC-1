const Todo = require('../models/todo');

async function listTodos(limit = 100) {
  return Todo.find().sort({ createdAt: -1 }).limit(limit).exec();
}

async function createTodo(payload) {
  const todo = new Todo({
    title: payload.title,
    completed: Boolean(payload.completed)
  });
  return todo.save();
}

async function updateTodo(id, payload) {
  const update = {};
  if (payload.title !== undefined) update.title = payload.title;
  if (payload.completed !== undefined) update.completed = payload.completed;
  return Todo.findByIdAndUpdate(id, update, { new: true, runValidators: true }).exec();
}

async function deleteTodo(id) {
  const res = await Todo.findByIdAndDelete(id).exec();
  return !!res;
}

module.exports = { listTodos, createTodo, updateTodo, deleteTodo };
