// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDuwW1pTJR6xFD3v3Ds_b72nDv1DDhYNLo",
  // authDomain: "hotel-booking-5ea8c.firebaseapp.com",
  // projectId: "hotel-booking-5ea8c",
  // storageBucket: "hotel-booking-5ea8c.firebasestorage.app",
  // messagingSenderId: "560628547104",
  // appId: "1:560628547104:web:41661412c0bc5920ee4645"
  apiKey:import.meta.env.VITE_apiKey, 
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth