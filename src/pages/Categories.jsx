import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  subscribeCategories,
} from '../services/categoryService';
import CategoryCard from '../components/CategoryCard';
import AddCategoryForm from '../components/AddCategoryForm';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // categoría en edición

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeCategories(user.uid, setCategories);
    return () => unsubscribe();
  }, [user]);

  const handleEditClick = (cat) => {
    setEditingCategory(cat); // llenar inputs del formulario
  };

  const handleDeleteClick = async (catId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    setCategories(categories.filter((c) => c.id !== catId)); // optimista
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

      <AddCategoryForm
        editingCategory={editingCategory}
        onAddCategory={async (name, description) => {
          const tempId = Date.now().toString();
          setCategories([...categories, { id: tempId, name, description }]);
          try {
            const firestoreId = await createCategory(
              user.uid,
              name,
              description,
            );
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
        }}
        onUpdateCategory={async (id, name, description) => {
          setCategories(
            categories.map((cat) =>
              cat.id === id ? { ...cat, name, description } : cat,
            ),
          );
          try {
            await updateCategory(id, name, description);
          } catch (error) {
            console.error(error);
            alert('No se pudo actualizar la categoría.');
          }
          setEditingCategory(null); // limpiar estado de edición
        }}
      />

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
┌───────────────────────────────┐
│       Categories.jsx           │
│ (Página de categorías)         │
│-------------------------------│
│ - useAuth()                    │
│ - useState()                   │
│ - useEffect()                  │
│ - handleDeleteClick()          │
│ - handleEditClick(cat)         │
│-------------------------------│
│ Estado clave:                  │
│ - categories (lista)           │
│ - editingCategory (cat en edición) │
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│  AddCategoryForm.jsx           │
│ (Formulario de categoría)      │
│-------------------------------│
│ Props:                         │
│ - editingCategory              │
│ - onAddCategory(name, desc)   │
│ - onUpdateCategory(id,name,desc) │
│-------------------------------│
│ useEffect()                    │
│  -> llena inputs si hay edición│
│-------------------------------│
│ handleSubmit():                │
│  -> Si editingCategory existe  │
│     llama a onUpdateCategory   │
│  -> Sino llama a onAddCategory │
│-------------------------------│
│ Botones:                        │
│ - Agregar / Actualizar         │
│ - Cancelar                     │
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│   CategoryCard.jsx             │
│ (Componente para cada categoría) │
│-------------------------------│
│ Props:                         │
│ - category                     │
│ - onEdit(category)             │
│ - onDelete(categoryId)         │
│-------------------------------│
│ Botones:                        │
│ - Editar -> llama onEdit       │
│ - Eliminar -> llama onDelete   │
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│ categoryService.js             │
│-------------------------------│
│ Funciones CRUD en Firestore:   │
│ - createCategory(userId,name,desc) │
│ - updateCategory(id,name,desc)     │
│ - deleteCategory(id)               │
│ - subscribeCategories(userId, callback) │
└───────────────────────────────┘


*/
