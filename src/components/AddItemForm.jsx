import { useState, useEffect } from 'react';

export default function AddItemForm({ categories, onAddItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !categoryId) {
      alert('Por favor completa todos los campos.');
      return;
    }

    await onAddItem({ name, price, categoryId, imageFile });

    // Limpiar inputs
    setName('');
    setPrice('');
    setCategoryId('');
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del ítem"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button type="submit">Agregar Ítem</button>
    </form>
  );
}
