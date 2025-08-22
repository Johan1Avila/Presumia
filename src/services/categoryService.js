import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

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
