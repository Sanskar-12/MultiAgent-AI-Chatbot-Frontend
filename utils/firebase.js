import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortex-ai-c83a6.firebaseapp.com",
  projectId: "cortex-ai-c83a6",
  storageBucket: "cortex-ai-c83a6.firebasestorage.app",
  messagingSenderId: "23119077186",
  appId: "1:23119077186:web:6b2036836b8ac28bddb2db",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
