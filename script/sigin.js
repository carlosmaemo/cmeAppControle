// sigin
const siginForm = document.querySelector('#sigin-form');
siginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // recuperar informações do usuário
  const email = siginForm['sigin-email'].value;
  const password = siginForm['sigin-password'].value;

  // criar usuário
  auth.signInWithEmailAndPassword(email, password).then((cred) => {

    // reiniciando formulário
    siginForm.reset();
    
    window.open('index.html', "_self");

  });

});