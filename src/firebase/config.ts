import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'ycmovies-fe3b1.firebaseapp.com',
  projectId: 'ycmovies-fe3b1',
  storageBucket: 'ycmovies-fe3b1.appspot.com',
  messagingSenderId: '1031941144973',
  appId: '1:1031941144973:web:5e13ba225029a7b02d3dc4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();  
export default app;
