import { db } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

// Colección Categorías
const categoriesCollection = collection(db, 'categories');

// ✅ Crear categoría
export const addCategory = async (categoryData) => {
  return await addDoc(categoriesCollection, categoryData);
};

// ✅ Obtener todas las categorías
export const getCategories = async () => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Obtener categoría por ID
export const getCategoryById = async (id) => {
  const docRef = doc(db, 'categories', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

// ✅ Obtener ítems por categoría
export const getItemsByCategory = async (categoryId) => {
  try {
    const q = query(
      collection(db, 'items'),
      where('categoryId', '==', categoryId),
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error('Error obteniendo ítems:', error);
    return [];
  }
};

// ✅ Agregar ítem a una categoría
export const addItemToCategory = async (categoryId, itemData) => {
  try {
    const docRef = await addDoc(collection(db, 'items'), {
      categoryId,
      ...itemData,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error agregando ítem:', error);
    throw error;
  }
};

// ✅ Actualizar categoría
export const updateCategory = async (id, updatedData) => {
  const docRef = doc(db, 'categories', id);
  return await updateDoc(docRef, updatedData);
};

// ✅ Eliminar categoría
export const deleteCategory = async (id) => {
  const docRef = doc(db, 'categories', id);
  return await deleteDoc(docRef);
};
