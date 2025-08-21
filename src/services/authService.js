// services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseAuth';

// registrar un usuario
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user; // devuelve el usuario creado
  } catch (error) {
    throw Error; // lanza el error para manejarlo en el componente
  }
}

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error; // importante: relanzar el error
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('Sesión cerrada ✅');
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};
