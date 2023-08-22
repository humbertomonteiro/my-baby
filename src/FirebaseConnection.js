// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_xJYfVt3B-jdOtkjX15F9FU4P6HgenYY",
  authDomain: "mybaby-dbd8a.firebaseapp.com",
  projectId: "mybaby-dbd8a",
  storageBucket: "mybaby-dbd8a.appspot.com",
  messagingSenderId: "631897519009",
  appId: "1:631897519009:web:9e6642122c2d4bd72911e0",
  measurementId: "G-CQE75M5BFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }