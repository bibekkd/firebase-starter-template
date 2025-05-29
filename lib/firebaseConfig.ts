// lib/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBLYUm8pqofiIu0A43xGIFbPAYafwE_4lc",
  authDomain: "project-one-d9deb.firebaseapp.com",
  projectId: "project-one-d9deb",
  storageBucket: "project-one-d9deb.firebasestorage.app",
  messagingSenderId: "655040757808",
  appId: "1:655040757808:web:ca633f8ea9303cb8feedf5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
console.log("Firebase initialized");
console.log(process.env.FIREBASE_API_KEY!);


/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLYUm8pqofiIu0A43xGIFbPAYafwE_4lc",
  authDomain: "project-one-d9deb.firebaseapp.com",
  projectId: "project-one-d9deb",
  storageBucket: "project-one-d9deb.firebasestorage.app",
  messagingSenderId: "655040757808",
  appId: "1:655040757808:web:ca633f8ea9303cb8feedf5",
  measurementId: "G-3R6RMSXK1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/
