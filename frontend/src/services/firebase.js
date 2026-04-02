import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração lendo do arquivo .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validação simples para evitar erros
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'SUA_API_KEY') {
  console.error('❌ Firebase não configurado! Verifique seu arquivo .env');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);