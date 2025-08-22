// src/services/categoryService.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

/**
 * Crear una nueva categoría
 * @param {string} userId - ID del usuario autenticado
 * @param {string} name - Nombre de la categoría
 * @param {string} description - Descripción de la categoría
 */
export const createCategory = async (userId, name, description) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      userId,
      name,
      description,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando categoría:', error);
    throw error;
  }
};

/**
 * Obtener todas las categorías de un usuario
 * @param {string} userId - ID del usuario autenticado
 */
export const getCategories = async (userId) => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(q);
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    throw error;
  }
};

/**
 * Actualizar una categoría existente
 * @param {string} categoryId - ID de la categoría a actualizar
 * @param {string} name - Nuevo nombre de la categoría
 * @param {string} description - Nueva descripción
 */
export const updateCategory = async (categoryId, name, description) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, {
      name,
      description,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error actualizando categoría:', error);
    throw error;
  }
};

/**
 * Eliminar una categoría
 * @param {string} categoryId - ID de la categoría a eliminar
 */
export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
  } catch (error) {
    console.error('Error eliminando categoría:', error);
    throw error;
  }
};
