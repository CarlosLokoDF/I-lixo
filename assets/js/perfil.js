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

var userName = document.querySelector('#userName')
console.log(userName)
var docCpf = document.querySelector('#docCpf')
console.log(docCpf)
var mail = document.querySelector('#mail')
console.log(mail)
var phone = document.querySelector('#phone')
console.log(phone)

async function getdata (email) {
  const docRef = doc(db, "usuario", email);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log(docSnap.data());
    
    var cpf = docSnap.data()["cpf"];
    docCpf.textContent = cpf
    var nome = docSnap.data()["nome"];
    userName.textContent = nome
    var telefone = docSnap.data()["telefone"];
    phone.textContent = telefone
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
  } else {
    console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        console.log(email);
        getdata(email);
        mail.textContent = email 
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