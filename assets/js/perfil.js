import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBORA1Rg2yS097wd1kakrUzz6VuQm2xn_8",
  authDomain: "ilixo-abfed.firebaseapp.com",
  databaseURL: "https://ilixo-abfed-default-rtdb.firebaseio.com",
  projectId: "ilixo-abfed",
  storageBucket: "ilixo-abfed.appspot.com",
  messagingSenderId: "602244988300",
  appId: "1:602244988300:web:09e0d0b8f4cc83f0c32aa9",
  measurementId: "G-RQ2DB3PNQY"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

const usuario = collection(db, "usuario")

onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        console.log(email);
    }else {
        console.log("Não logado")
    }
});


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });