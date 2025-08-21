// src/firebase/firebaseconfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCf_Pnfo8cm2tnerQZsGsO8bG-vjuycO4Y',
  authDomain: 'presumia-c6f9d.firebaseapp.com',
  projectId: 'presumia-c6f9d',
  storageBucket: 'presumia-c6f9d.firebasestorage.app',
  messagingSenderId: '639019158934',
  appId: '1:639019158934:web:389b4b97048383aa2d21b7',
  measurementId: 'G-KL2M9E2LWG',
};

// Verificación de app inicializada
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
