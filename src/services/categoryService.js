import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot, // 👈 importante para tiempo real
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

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

export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
  } catch (error) {
    console.error('Error eliminando categoría:', error);
    throw error;
  }
};

// Suscripción en tiempo real
export const subscribeCategories = (userId, callback) => {
  const q = query(collection(db, 'categories'), where('userId', '==', userId));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const cats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(cats);
  });
  return unsubscribe;
};
