import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC_gTP0QWac8sWFYM9cZ26SnmIAUSCezzI",
    authDomain: "final-prog3.firebaseapp.com",
    projectId: "final-prog3",
    storageBucket: "final-prog3.appspot.com",
    messagingSenderId: "118644305348",
    appId: "1:118644305348:web:d702cdab1be07c0079c891"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();