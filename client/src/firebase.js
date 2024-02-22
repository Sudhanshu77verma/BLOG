// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-d9fa0.firebaseapp.com",
  projectId: "blog-d9fa0",
  storageBucket: "blog-d9fa0.appspot.com",
  messagingSenderId: "248323075901",
  appId: "1:248323075901:web:3e812378fddf2e0ec2df54"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
