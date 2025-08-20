// src/firebase/firebaseAuth.js
import { getAuth } from 'firebase/auth';
import app from './firebaseConfig'; // 👈 Importa la app que ya tiene la config

export const auth = getAuth(app);
