import { db } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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
