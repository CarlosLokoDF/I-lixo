import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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

async function getdata (email) {
  const docRef = doc(db, "usuario", email);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log(docSnap.data());
    var cpf = docSnap.data()["cpf"];
    var nome = docSnap.data()["nome"];
    var telefone = docSnap.data()["telefone"];
    // Escrever aqui para utilizar cpf, nome e telefone do usuário
    var composteiras = docSnap.data()["composteiras"];
    if (composteiras) {
      var listaEstados = [];
      for (var i = 0; i < composteiras.length; i++) {
        var ref = composteiras[i]["id"];
        var composteira = await getDoc(ref);
        listaEstados.push(composteira.data()["estado"]);
      }
      console.log(listaEstados[0]);
    } else {
      console.log("Nenhuma composteira")
    };
    // Escrever aqui para utilizar os 
    // estados da composteira pelo array listaEstados
  } else {
    console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        console.log(email);
        getdata(email);
    }else {
        document.location.href = "/assets/html/Login.html";
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