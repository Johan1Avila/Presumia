// src/services/categoryService.js
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

// Crear una categoría
export const createCategory = async (userId, name, description) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      userId,
      name,
      description,
      createdAt: new Date(),
    });
    return { id: docRef.id, name, description };
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

// Obtener todas las categorías de un usuario
export const getCategories = async (userId) => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};
