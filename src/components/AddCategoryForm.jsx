export default function AddCategoryForm({
  name,
  setName,
  description,
  setDescription,
  onSubmit,
  editingCategory,
  onCancelEdit,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit();
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    onCancelEdit();
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
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}
