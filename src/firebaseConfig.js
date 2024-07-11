import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlLZjDSi8sC3M2q--BIWSoqMRcVPGQzCQ",
  authDomain: "formulagenerator-8a635.firebaseapp.com",
  projectId: "formulagenerator-8a635",
  storageBucket: "formulagenerator-8a635.appspot.com",
  messagingSenderId: "825273224869",
  appId: "1:825273224869:web:0211e8c073272e3ca8874c",
  measurementId: "G-VJBX74VXS1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };