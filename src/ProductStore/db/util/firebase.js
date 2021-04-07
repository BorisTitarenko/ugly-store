import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC-wo7Z1vzrqHYnaYdFqzXzV8spgtNaLrc",
    authDomain: "react-product-store.firebaseapp.com",
    projectId: "react-product-store",
    storageBucket: "react-product-store.appspot.com",
    messagingSenderId: "981853240494",
    appId: "1:981853240494:web:c231bd0257fdf48fdf013f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;
