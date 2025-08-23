// src/firebase/firebaseStorage.js
import { storage } from './firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file, path = 'images/') => {
  try {
    const storageRef = ref(storage, `${path}${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw error;
  }
};
