// Firebase/ultil.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR1ma2-qOhEGgUwA_su71ZE-smJiFhhPs",
  authDomain: "melodia-2.firebaseapp.com",
  projectId: "melodia-2",
  storageBucket: "melodia-2.appspot.com",
  messagingSenderId: "807889094395",
  appId: "1:807889094395:web:67481ddc6a02d1de17925e",
  measurementId: "G-H4QZ3KZST5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getDatabase(app); // Realtime Database
const auth = getAuth(app); // Authentication
const firestore = getFirestore(app); // Firestore
const storage = getStorage(app); // Storage

export { db, auth, firestore, storage };
