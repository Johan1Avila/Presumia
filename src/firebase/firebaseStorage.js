// /firebase/firebaseStorage.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseConfig'; // asegúrate de tener tu config inicial

// Inicializar Storage
const storage = getStorage(app);

/**
 * Subir imagen a Firebase Storage
 * @param {File} file - Archivo de imagen a subir
 * @param {string} path - Carpeta donde se guardará la imagen
 * @returns {Promise<string>} URL de descarga de la imagen subida
 */
export async function uploadImage(file, path) {
  if (!file) throw new Error('No hay archivo para subir');

  const storageRef = ref(storage, `${path}/${file.name}`);

  // Subir el archivo
  await uploadBytes(storageRef, file);

  // Obtener URL de descarga
  const url = await getDownloadURL(storageRef);

  return url;
}

export { storage };
