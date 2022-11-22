
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHEjyo2ASnXuu_klhoQT56e9WkJO-HOgw",
  authDomain: "crossgo-alani.firebaseapp.com",
  projectId: "crossgo-alani",
  storageBucket: "crossgo-alani.appspot.com",
  messagingSenderId: "507145513265",
  appId: "1:507145513265:web:036f4d3900b7f90e076810",
  measurementId: "G-9WGJQTF8FB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();




