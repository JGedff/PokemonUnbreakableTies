document.getElementById("signup").addEventListener("click", function () {
    let email = document.getElementById("signupEmail").value;

    popupUsuario(email);
});

function borrar_registro() {
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupPasswordConfirm").value = "";
};

function borrar_registro_inicio() {
    document.getElementById("usuario_god").value = "";
    document.getElementById("contrasenya_god").value = "";
};

document.getElementById("login_dropdown").addEventListener("click", function () {
    let password = document.getElementById("contrasenya_god").value;
    let email = document.getElementById("usuario_god").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            showAlert("Usuario autenticado", "alert-success");

            localStorage.setItem("correo", email);
            localStorage.setItem("contrasenya", password);

            loadItemsFecha();
        })
        .catch(function () {
            showAlert("Error de autenticación", "alert-danger");
        })
        .finally(() => {
            // Si es el administrador:
            logger(isLogged());
        });
    borrar_registro_inicio();
});

// Login con Google (popup)
document.getElementById("login_google").addEventListener("click", function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function () {
            logger(isLogged());
            showAlert("Usuario autenticado", "alert-success");
        })
        .catch(function () {
            logger(isLogged());
            showAlert("Error de autenticación", "alert-danger");
        });
});

// Cerrar sesión
document.getElementById("registred").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(() => {
            // Log-out correcto
            showAlert("Has salido de tu sesión", "alert-success");

            localStorage.removeItem("correo");
            localStorage.removeItem("contrasenya");

            logger(isLogged());
        })
        .catch((error) => {
            showAlert("Error de autenticación", "alert-danger");
        });
});

// Registrar usuario
document.getElementById("registrar_usuario").addEventListener("click", function () {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    modal.showModal();
});

function isLogged() {
    let logged;

    if (auth.currentUser != null) {
        logged = true;
    } else {
        logged = false;
    }

    return logged;
}

function logger(boolean) {
    let eliminar_god = document.getElementsByClassName("eliminar");
    let editar_god = document.getElementsByClassName("editar");

    if (boolean) {
        document.getElementById("iniciar_sesion").style.display = "none";
        document.getElementById("registred").style.display = "block";
        document.getElementById("publicaciones").style.display = "block";
        document.getElementById("perfil").style.display = "block";
        document.getElementById("linkForo").style.display = "block";

        if (auth.currentUser.uid == "5tPRFSHStdgnEYMPLTngAbep1673") {

            document.getElementById("editarCategorias").style.display = "block";

            for (let i = 0; i < eliminar_god.length; i++) {
                eliminar_god[i].style.display = "inline-block";
                editar_god[i].style.display = "inline-block";
            }
        }
    } else {
        document.getElementById("registred").style.display = "none";
        document.getElementById("publicaciones").style.display = "none";
        document.getElementById("perfil").style.display = "none";
        document.getElementById("editarCategorias").style.display = "none";
        document.getElementById("linkForo").style.display = "none";
        document.getElementById("iniciar_sesion").style.display = "block";
        
        for (let i = 0; i < eliminar_god.length; i++) {
            eliminar_god[i].style.display = "none";
            editar_god[i].style.display = "none";
        }
    }
}