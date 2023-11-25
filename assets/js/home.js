import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'

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
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        var perfil = document.getElementById("perfil");
        var txtPerfil = document.getElementById("txtPerfil")
        perfil.setAttribute("href", "/assets/html/perfil.html")
        txtPerfil.innerHTML = "Perfil"

    } else {
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