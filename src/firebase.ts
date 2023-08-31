import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage'
import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDRvV85Zw-ScF_GNH_B5Etsu5XATKqLvuQ",
    authDomain: "expressflow5988.firebaseapp.com",
    projectId: "expressflow5988",
    storageBucket: "expressflow5988.appspot.com",
    messagingSenderId: "234812935586",
    appId: "1:234812935586:web:1fba8c671e35440dac76fb",
    measurementId: "G-RB7TDG8LM8"
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app)

export { storage, app, auth, firestore };