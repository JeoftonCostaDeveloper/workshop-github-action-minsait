const express = require("express");
const data = require("./data");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check (importante para CD)
app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: process.env.NODE_ENV || "dev" });
});

// GET - listar todos
app.get("/items", (req, res) => {
  res.json(data.getAll());
});

// GET - buscar por id
app.get("/items/:id", (req, res) => {
  const item = data.getById(Number(req.params.id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
});

// POST - criar
app.post("/items", (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newItem = data.create(name, age);
  res.status(201).json(newItem);
});


// PUT - atualizar
app.put("/items/:id", (req, res) => {
  const { name } = req.body;
  const updatedItem = data.update(Number(req.params.id), name);
  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(updatedItem);
});

// DELETE - remover
app.delete("/items/:id", (req, res) => {
  const removed = data.remove(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
