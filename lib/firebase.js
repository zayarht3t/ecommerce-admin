// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCSSDj6aRud_5KcKZ4W6JMiB8SFlTW1IWI",
  authDomain: "ecommerce-f135e.firebaseapp.com",
  projectId: "ecommerce-f135e",
  storageBucket: "ecommerce-f135e.appspot.com",
  messagingSenderId: "666315671702",
  appId: "1:666315671702:web:93d78c8288b062df22dab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);