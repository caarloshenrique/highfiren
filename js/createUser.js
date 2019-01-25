//Buttons
var createUserButton = document.getElementById('createUserButton');

//Inputs
var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var confPassword = document.getElementById('confPasswordInput');

//Criar Usuário
createUserButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function () {
            alert('Bem vindo ' + nameInput.value);
            window.location.href = "home.html";
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique erro no console.')
        });
});