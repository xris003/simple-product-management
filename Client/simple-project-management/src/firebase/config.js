import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhFqzM1tcecUMJ1Fnr40ZREGop321C67E",
  authDomain: "simple-project-3c1a4.firebaseapp.com",
  projectId: "simple-project-3c1a4",
  storageBucket: "simple-project-3c1a4.appspot.com",
  messagingSenderId: "275049437322",
  appId: "1:275049437322:web:7f266778006afeef09b573",
  measurementId: "G-4VBCXYB300",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };
