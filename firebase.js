import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //import the auth module
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCRS0PoAT3wSeaPpXhwQGKSC6AL00m_1b4",
  authDomain: "realty-519a4.firebaseapp.com",
  projectId: "realty-519a4",
  storageBucket: "realty-519a4.appspot.com",
  messagingSenderId: "789264872953",
  appId: "1:789264872953:web:3bfb15229f51cbc0d87928",
};

const app = initializeApp(firebaseConfig);

// firestore db
export const db = getFirestore();
const propertiesRef = collection(db, "properties");
export const authentication = getAuth(app);
