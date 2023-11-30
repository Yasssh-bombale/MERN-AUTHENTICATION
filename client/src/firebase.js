// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-32452.firebaseapp.com",
  projectId: "mern-auth-32452",
  storageBucket: "mern-auth-32452.appspot.com",
  messagingSenderId: "892102853491",
  appId: "1:892102853491:web:ed29cfdc836eb52ac17b06",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
