// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZLKf6Nc0-sxd6P-TO3yjnioLHLYKDDbY",
  authDomain: "netflixgpt-747.firebaseapp.com",
  projectId: "netflixgpt-747",
  storageBucket: "netflixgpt-747.firebasestorage.app",
  messagingSenderId: "795088544458",
  appId: "1:795088544458:web:6d6dc9bbf8e850f35f8a33",
  measurementId: "G-ZBPXK49WD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); // This is going to be used all the time