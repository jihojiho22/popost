// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth instead of auth
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYHjIFJc8laddLYeidlVNOcVflfqOT69Q",
    authDomain: "popost-a2170.firebaseapp.com",
    projectId: "popost-a2170",
    storageBucket: "popost-a2170.appspot.com",
    messagingSenderId: "84144373965",
    appId: "1:84144373965:web:721cb920a8db39e242e984",
    measurementId: "G-WKJMGJ4HJ0"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

// Get the auth instance
const auth = getAuth();

export { auth, firestore }; // Export the 'auth' instance
