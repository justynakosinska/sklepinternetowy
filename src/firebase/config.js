
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAKB8wyXppOfG2cVx3tH5M_-SL7P3Ync10",
  authDomain: "sklepinternetowy-f3bf4.firebaseapp.com",
  projectId: "sklepinternetowy-f3bf4",
  storageBucket: "sklepinternetowy-f3bf4.appspot.com",
  messagingSenderId: "825059748431",
  appId: "1:825059748431:web:b082c60c617d984fbed83a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)
 export const db=getFirestore(app);
 export const storage=getStorage(app);
 export default app