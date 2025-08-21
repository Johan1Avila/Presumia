import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCf_Pnfo8cm2tnerQZsGsO8bG-vjuycO4Y',
  authDomain: 'presumia-c6f9d.firebaseapp.com',
  projectId: 'presumia-c6f9d',
  storageBucket: 'presumia-c6f9d.firebasestorage.app',
  messagingSenderId: '639019158934',
  appId: '1:639019158934:web:389b4b97048383aa2d21b7',
};

// Inicializa Firebase con tu proyecto
const app = initializeApp(firebaseConfig);

// Exporta auth para usarlo en login/registro
export const auth = getAuth(app);
