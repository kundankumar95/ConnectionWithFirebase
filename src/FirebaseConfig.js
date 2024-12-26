import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCD2DxBilmJIvUmUsomPloge17RkXtK7NI",
  authDomain: "test-532d5.firebaseapp.com",
  projectId: "test-532d5",
  storageBucket: "test-532d5.firebasestorage.app",
  messagingSenderId: "328130253271",
  appId: "1:328130253271:web:b655d873c67dc6e8a53b92"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}