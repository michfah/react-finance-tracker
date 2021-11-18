import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyARo9YQSR2xsJk0VkBfSBFNhH3pVZDV3bE",
    authDomain: "mymoney-f512f.firebaseapp.com",
    projectId: "mymoney-f512f",
    storageBucket: "mymoney-f512f.appspot.com",
    messagingSenderId: "731910936859",
    appId: "1:731910936859:web:3fa574fa8cb2d12e161bbe"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp }