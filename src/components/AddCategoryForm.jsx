import { useEffect, useState } from 'react';

export default function AddCategoryForm({
  editingCategory,
  onAddCategory,
  onUpdateCategory,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim())
      return alert('Completa ambos campos');

    if (editingCategory) {
      onUpdateCategory(editingCategory.id, name, description);
    } else {
      onAddCategory(name, description);
    }

    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">
        {editingCategory ? 'Actualizar' : 'Agregar'}
      </button>
      {editingCategory && (
        <button
          type="button"
          onClick={() => {
            setName('');
            setDescription('');
            onUpdateCategory(null); // cancelar edición
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
