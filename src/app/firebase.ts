// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaNRqeMpB6SrrAKXhwry59dtNOukJPZiE",
  authDomain: "traveljun.firebaseapp.com",
  projectId: "traveljun",
  storageBucket: "traveljun.appspot.com",
  messagingSenderId: "703151499655",
  appId: "1:703151499655:web:0b6e9ec971f305cf918b22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   