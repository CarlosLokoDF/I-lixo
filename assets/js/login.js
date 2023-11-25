import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'

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

let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

const entrar = document.getElementById("entrar")
entrar.addEventListener("click", login)

function login(){
  let email = document.querySelector('#email');
  let emailLabel = document.querySelector('#emailLabel');
  
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  let msgError = document.querySelector('#msgError');

  signInWithEmailAndPassword(auth, email.value, senha.value).then((userCredential) => {
    const user = userCredential.user;
    window.location.href = './home.html'
    console.log(user)
  }).catch((error) => {
    email.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Email ou senha incorretos'
    email.focus()
  });
}

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });