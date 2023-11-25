import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'

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

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let cpf = document.querySelector('#cpf')
let labelCpf = document.querySelector('#labelCpf')
let validCpf = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let telefone = document.querySelector('#telefone')
let labelTelefone = document.querySelector('#labelTelefone')
let validTelefone = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

cpf.addEventListener('keyup', () => {
  const filter = /^(\d)\1{10}$/;
  let resto;
  if (cpf.value.length !== 11 || filter.test(cpf.value)) {
    labelCpf.setAttribute('style', 'color: red')
    labelCpf.innerHTML = '*Insira um CPF válido'
    cpf.setAttribute('style', 'border-color: red')
    validCpf = false
  } else {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.value.charAt(i)) * (10 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.value.charAt(9))) {
      labelCpf.setAttribute('style', 'color: red')
      labelCpf.innerHTML = '*Insira um CPF válido'
      cpf.setAttribute('style', 'border-color: red')
      validCpf = false
    } else {
      soma = 0
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.value.charAt(i)) * (11 - i);
      }
      resto = 11 - (soma % 11);
      let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

      if (digitoVerificador2 !== parseInt(cpf.value.charAt(10))) {
        labelCpf.setAttribute('style', 'color: red')
        labelCpf.innerHTML = '*Insira um CPF válido'
        cpf.setAttribute('style', 'border-color: red')
        validCpf = false
      } else {
        labelCpf.setAttribute('style', 'color: green')
        labelCpf.innerHTML = 'CPF'
        cpf.setAttribute('style', 'border-color: green')
        validCpf = true
      }
    }
  }
})

telefone.addEventListener('keyup', () => {

  if (telefone.value.length < 12 || telefone.value.length > 18) {
    labelTelefone.setAttribute('style', 'color: red')
    labelTelefone.innerHTML = ' *Insira um telefone válido'
    telefone.setAttribute('style', 'border-color: red')
    validTelefone = false
  } else {
    labelTelefone.setAttribute('style', 'color: green')
    labelTelefone.innerHTML = 'Telefone'
    telefone.setAttribute('style', 'border-color: green')
    validTelefone = true
  }
  telefone.value = telefone.value.replace(/\D/g, '')
  telefone.value = telefone.value.replace(/(\d{2})(\d)/, "($1) $2")
  telefone.value = telefone.value.replace(/(\d)(\d{4})$/, "$1-$2")


})

email.addEventListener('keyup', () => {
  const filter = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  if (!filter.test(email.value)) {
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Email *Insira um email válido'
    email.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    email.setAttribute('style', 'border-color: green')
    validEmail = true
  }

})



senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})
const cadastrar = document.getElementById("cadastrar")
cadastrar.addEventListener("click", registrar)

function registrar() {
  if (validNome && validCpf && validEmail && validTelefone && validSenha && validConfirmSenha) {
    createUserWithEmailAndPassword(auth, email.value, senha.value).then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      msgSuccess.setAttribute('style', 'display: block')
      msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
      msgError.setAttribute('style', 'display: none')
      msgError.innerHTML = ''

      setTimeout(() => {
        window.location.href = '../html/login.html'
      }, 2000)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });

  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha')

  if (inputConfirmSenha.getAttribute('type') == 'password') {
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})





