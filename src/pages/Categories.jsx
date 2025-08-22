import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  subscribeCategories,
} from '../services/categoryService';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeCategories(user.uid, setCategories);
    return () => unsubscribe();
  }, [user]);

  const handleAddOrEditCategory = async () => {
    if (!name.trim() || !description.trim())
      return alert('Completa ambos campos');

    if (editingId) {
      // Actualización optimista
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, name, description } : cat,
        ),
      );
      setEditingId(null);

      try {
        await updateCategory(editingId, name, description);
      } catch (error) {
        console.error(error);
        alert('No se pudo actualizar la categoría.');
      }
    } else {
      const tempId = Date.now().toString();
      setCategories([...categories, { id: tempId, name, description }]);
      setName('');
      setDescription('');

      try {
        const firestoreId = await createCategory(user.uid, name, description);
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === tempId ? { ...cat, id: firestoreId } : cat,
          ),
        );
      } catch (error) {
        console.error(error);
        alert('No se pudo crear la categoría en Firestore.');
        setCategories((prev) => prev.filter((cat) => cat.id !== tempId));
      }
    }

    setName('');
    setDescription('');
  };

  const handleEditClick = (cat) => {
    setName(cat.name);
    setDescription(cat.description);
    setEditingId(cat.id);
  };

  const handleDeleteClick = async (catId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    setCategories(categories.filter((cat) => cat.id !== catId)); // Optimista
    try {
      await deleteCategory(catId);
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la categoría.');
    }
  };

  return (
    <div>
      <h1>Categorías</h1>
      <div>
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
        <button onClick={handleAddOrEditCategory}>
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName('');
              setDescription('');
            }}
          >
            Cancelar
          </button>
        )}
      </div>

      {categories.length === 0 ? (
        <p>No hay categorías todavía.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
/*
┌────────────────────┐
│   Categories.jsx   │
│ (Página de categorías) │
│--------------------│
│ - useAuth()        │
│ - useState()       │
│ - useEffect()      │
│ - handleAddOrEditCategory() │
│ - handleEditClick() │
│ - handleDeleteClick() │
│--------------------│
│ Renderiza lista de │
│ CategoryCard.jsx   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  CategoryCard.jsx  │
│ (Componente)       │
│--------------------│
│ Props recibidas:   │
│ - category         │
│ - onEdit           │
│ - onDelete         │
│--------------------│
│ Botones Editar y   │
│ Eliminar llaman a  │
│ las funciones      │
│ recibidas via props│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ categoryService.js │
│--------------------│
│ Funciones:         │
│ - createCategory() │
│ - updateCategory() │
│ - deleteCategory() │
│ - subscribeCategories() │
│--------------------│
│ Acceso a Firestore │
│ para CRUD en tiempo│
│ real o asíncrono   │
└────────────────────┘

*/
