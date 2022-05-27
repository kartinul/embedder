// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0qnTzNdjvlp0th9b6QSiuLULaGYOrRIk",
  authDomain: "embedder-vercel.firebaseapp.com",
  projectId: "embedder-vercel",
  storageBucket: "embedder-vercel.appspot.com",
  messagingSenderId: "1063945971000",
  appId: "1:1063945971000:web:8c9682a8666250e353cdcd",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
