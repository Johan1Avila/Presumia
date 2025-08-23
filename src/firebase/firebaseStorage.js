// src/firebase/firebaseStorage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebaseConfig'; // ✅ import default

const storage = getStorage(app);

export const uploadImage = async (file, folderName) => {
  try {
    const storageRef = ref(storage, `${folderName}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
