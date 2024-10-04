import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Import storage

const firebaseConfig = {
  apiKey: "AIzaSyBR1ma2-qOhEGgUwA_su71ZE-smJiFhhPs",
  authDomain: "melodia-2.firebaseapp.com",
  projectId: "melodia-2",
  storageBucket: "melodia-2.appspot.com",
  messagingSenderId: "807889094395",
  appId: "1:807889094395:web:67481ddc6a02d1de17925e",
  measurementId: "G-H4QZ3KZST5",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
