function crearDataUsuario() {

    let correo = document.getElementById("emailUser").value;
    let nombre = document.getElementById("name").value;
    let descripcion = document.getElementById("descripcionUsuario").value;
    let imagen = document.getElementById("imagenUsuario").files[0];

    let stringName = new String(nombre);
    let wordsInName = stringName.split('.');
    let wordsInName2 = stringName.split(' ');

    let imageUndefined = false;

    let date = dateNow();

    let nameWithoutPoints = true;

    if (wordsInName[1] != undefined || wordsInName2[0] == "") {
        nameWithoutPoints = false;
    }

    if (nameWithoutPoints) {

        createUser();

        if (imagen == undefined) {
            imagen = staticImg();
            imageUndefined = true;
        }

        let doc = {
            email: correo.toLowerCase(),
            name: nombre,
            descripcionPerfil: descripcion,
            fecha: date,
            cantidadComentarios: 0,
            cantidadPublicaciones: 0,
            likesTotales: 0,
            dislikesTotales: 0,
        };

        if (imageUndefined == false) {
            uploadProfileFile(imagen)
                .then((imageUrl) => {
                    doc.fotoPerfil = imageUrl;
                    addUser(doc);
                    showAlert("La publicación se ha creado correctamente", "alert-success");
                })
                .catch(() => {
                    showAlert("Error al intentar guardar el elemento", "alert-danger");
                });
        }
        else {
            doc.fotoPerfil = imagen;
            addUser(doc);
            showAlert("La publicación se ha creado correctamente", "alert-success");
        }

        crearUsuario.close();
    }
    else {
        alert("El nombre de usuario no puede contener nigun punto o iniciar con un espacio");
    }
}

function persistence() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {

            let email = localStorage.getItem('correo');
            let password = localStorage.getItem('contrasenya');

            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .finally(() => {
            logger(isLogged());
        });
}

function popupUsuario(correo) {
    let usuarioYaRegistrado = false;

    let emailLowercase = correo.toLowerCase();

    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.data().email == emailLowercase) {
                    usuarioYaRegistrado = true;
                }
            });
        })
        .finally(() => {
            if (usuarioYaRegistrado) {
                alert("El usuario con este correo ya existe");
            }
            else {
                document.getElementById("emailUser").value = correo;

                crearUsuario.showModal();
                
                document.getElementById("createUser").style.display = "block";
                document.getElementById("editUser").style.display = "none";
            }
        });
}

function createUser() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let passwordConfirm = document.getElementById("signupPasswordConfirm").value;

    if (email.length > 0 && email.indexOf("@") > 1) {
        if (password.length > 0) {
            if (password == passwordConfirm) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(function () {
                        showAlert("Usuario creado correctamente", "alert-success");
                    })
                    .catch(function (error) {
                        showAlert("Error al intentar crear el usuario", "alert-danger");
                    });
            } else {
                showAlert("Las contraseñas no coinciden", "alert-danger");
            }
        } else {
            showAlert("La contraseña es obligatoria", "alert-danger");
        }
    } else {
        showAlert("Email incorrecto", "alert-danger");
    }
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    modal.close();
    borrar_registro();
};

function addUser(doc) {
    add(USUARIS, doc)
        .then(() => {
            showAlert("Usuario creado correctamente", "alert-success");
        })
        .catch((error) => {
            showAlert(error.message, "alert-danger")
        });
}

function updateUserLikes(doc) {

    selectAll(USUARIS)
        .then((array) => {
            array.forEach((usuario) => {

                if (usuario.data().email == doc.data().email) {
                    let actLikes = {
                        likesTotales: (usuario.data().likesTotales + 1)
                    }

                    updateById(USUARIS, usuario.id, actLikes);
                }
            });
        });
}

function updateUserDislikes(doc) {

    selectAll(USUARIS)
        .then((array) => {
            array.forEach((usuario) => {

                if (usuario.data().email == doc.data().email) {
                    let actDislikes = {
                        dislikesTotales: (usuario.data().dislikesTotales + 1)
                    }

                    updateById(USUARIS, usuario.id, actDislikes);
                }
            });
        });
}

function updateUserComents() {
    let userEmail = auth.currentUser.email;

    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.data().email == userEmail) {
                    
                    let actUser = {
                        cantidadComentarios: (usuario.data().cantidadComentarios + 1)
                    }

                    updateById(USUARIS, usuario.id, actUser);
                }
            });
        });
}

function updateUserPublications() {
    let userEmail = auth.currentUser.email;

    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.data().email == userEmail) {
                    
                    let actUser = {
                        cantidadPublicaciones: (usuario.data().cantidadPublicaciones + 1)
                    }

                    updateById(USUARIS, usuario.id, actUser);
                }
            });
        });
}

function delMyUser() {
    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach(user => {
                if (user.data().email == auth.currentUser.email) {

                    delDataUser(user.id);
                }
            });
        });
}

function delDataUser(userId) {
    selectById(USUARIS, userId)
        .then((user) => {
            selectAll(PUBLICACIONES)
                .then((array) => {
                    array.forEach(pub => {
                        if (pub.data().email == user.data().email) {
                            eliminar(pub.id, pub.data().image);
                        }
                    });
                })
                .finally(() => {
                    selectAll(COMENTARIOS)
                        .then((items) => {
                            items.forEach(coment => {
                                if (coment.data().email == user.data().email) {
                                    restComent(coment.id);
                                }
                            });
                        })
                        .finally(() => {
                            deleteById(USUARIS, user.id)
                                    .then(() => {
                                        showAlert("Usuario eliminado correctamente", "alert-success");
                                    })
                                    .finally(() => {
                                        allUsers();
                                        auth.currentUser.delete();
                                    });
                        });
                });
        });
}

function editMyUser() {
    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach(user => {
                if (user.data().email == auth.currentUser.email) {

                    editDataUser(user.id);
                }
            });
        });
}

function editDataUser(userId) {
    selectById(USUARIS, userId)
        .then((user) => {
            document.getElementById("emailUser").value = user.data().email;
            document.getElementById("name").value = user.data().name;
            document.getElementById("descripcionUsuario").value = user.data().descripcionPerfil;

            crearUsuario.showModal();

            document.getElementById("createUser").style.display = "none";
            document.getElementById("editUser").style.display = "block";
        })
}

function saveUser() {

    let correo = document.getElementById("emailUser").value;
    let nombre = document.getElementById("name").value;
    let descripcion = document.getElementById("descripcionUsuario").value;
    let imagen = document.getElementById("imagenUsuario").files[0];

    let stringName = new String(nombre);
    let wordsInName = stringName.split('.');
    let wordsInName2 = stringName.split(' ');

    let imageUndefined = false;

    let nameWithoutPoints = true;

    if (wordsInName[1] != undefined || wordsInName2[0] == "") {
        nameWithoutPoints = false;
    }

    if (nameWithoutPoints) {

        if (imagen == undefined) {
            imageUndefined = true;
        }

        let doc = {
            name: nombre,
            descripcionPerfil: descripcion,
        };

        if (imageUndefined == false) {
            uploadProfileFile(imagen)
                .then((imageUrl) => {
                    doc.fotoPerfil = imageUrl;
                    selectLike(USUARIS, "email", correo)
                        .then((items) => {
                            items.forEach(user => {
                                if (user.data().email == correo) {
                                    updateById(USUARIS, user.id, doc);
                                }
                            });
                        })
                        .finally(() => {
                            showAlert("El usuario se ha actualizado correctamente", "alert-success");
                        });
                })
                .catch(() => {
                    showAlert("Error al intentar guardar el usuario", "alert-danger");
                });
        }
        else {
            selectLike(USUARIS, "email", correo)
                .then((items) => {
                    items.forEach(user => {
                        if (user.data().email == correo) {
                            updateById(USUARIS, user.id, doc);
                        }
                    });
                })
                .finally(() => {
                    showAlert("El usuario se ha actualizado correctamente", "alert-success");
                });
        }

        crearUsuario.close();
    }
    else {
        alert("El nombre de usuario no puede contener nigun punto o iniciar con un espacio");
    }
}