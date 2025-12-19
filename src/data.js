let items = [];
let nextId = 1;

module.exports = {
  getAll: () => items,

  getById: (id) => items.find(item => item.id === id),

  create: (name) => {
    const newItem = { id: nextId++, name };
    items.push(newItem);
    return newItem;
  },

  update: (id, name) => {
    const item = items.find(item => item.id === id);
    if (!item) return null;
    item.name = name;
    return item;
  },

  remove: (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }
};
