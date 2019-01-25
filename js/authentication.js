//Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var logOutButton = document.getElementById('logOutButton');

//Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

//Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            alert('Autenticado ' + emailInput.value);
            window.location.href = "home.html";
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.')
        });
});

/*// Logout
logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            alert('Você se deslogou');
            window.location.href = "index.html";
        }, function (error) {
            console.error(error);
        });
});*/

//Autenticar com Google
authGoogleButton.addEventListener('click', function () {
    //Providers
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

//Autenticar com Facebook
authFacebookButton.addEventListener('click', function () {
    //Providers
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

//Autenticar com Twitter
authTwitterButton.addEventListener('click', function () {
    //Providers
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
})

function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            var token = result.credential.acessToken;
            window.location.href = "home.html";
        }).catch(function (error) {
            console.log(error);
            alert('Falha na autenticação');
        });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
       window.user = user;
       var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
    }
}); 


