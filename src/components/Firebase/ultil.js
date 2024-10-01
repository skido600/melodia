// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase

const firebaseConfig = {
  apiKey: "AIzaSyBrleCzKnbn3STT7OWsU3itdgnFjfwM5j8",
  authDomain: "melodia-ddaf8.firebaseapp.com",
  projectId: "melodia-ddaf8",
  storageBucket: "melodia-ddaf8.appspot.com",
  messagingSenderId: "296742616351",
  appId: "1:296742616351:web:bc7bb7a6c58fc66055442a",
  measurementId: "G-J53035PF7Z",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
