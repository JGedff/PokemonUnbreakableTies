const USUARIS = db.collection();
const PUBLICACIONES = db.collection();
const COMENTARIOS = db.collection();
const CATEGORY = db.collection();

//Switch dia/noche
const btnSwitch = document.querySelector('#switch');
    btnSwitch.addEventListener('click', () => {
        document.body.classList.toggle('light');
        btnSwitch.classList.toggle('active');
    });

function addItem(doc) {
    add(PUBLICACIONES, doc)
        .then(() => {
            loadItemsFecha();

            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";

            showAlert("Elemento guardado correctamente", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar guardar el elemento", "alert-danger");
        });
}

//Likes y dislikes publicaciones
function likes(id, x) {
    if (isLogged()) {
        selectById(PUBLICACIONES, id)
            .then((pub) => {
                    let doc = {
                        likes: (pub.data().likes + 1)
                    };

                updateUserLikes(pub);

                updateById(PUBLICACIONES, id, doc)
                    .then(() => {
                        likesDislikes(x);
                        showAlert("Elemento actualizado correctamente", "alert-success");
                    })
                    .catch(() => {
                        showAlert("Error al intentar actualizar el elemento", "alert-danger");
                    });
            });
    } else {
        alert("Debes iniciar sesión para poder votar y comentar.");
    }
}

function dislikes(id, x) {
    if (isLogged()) {
        selectById(PUBLICACIONES, id).then((doc) => {
            let doca = {
                dislikes: (doc.data().dislikes + 1)
            };

            updateUserDislikes(doc);

            updateById(PUBLICACIONES, id, doca)
                .then(() => {
                    likesDislikes(x);
                    showAlert("Elemento actualizado correctamente", "alert-success");
                })
                .catch(() => {
                    showAlert("Error al intentar actualizar el elemento", "alert-danger");
                });
        });
    } else {
        alert("Debes iniciar sesión para poder votar y comentar.");
    }
}

//Likes y dislikes respuestas
function likes2(id, x) {
    if (isLogged()) {
        selectById(COMENTARIOS, id)
            .then((coment) => {
                let doc = {
                    likes: (coment.data().likes + 1)
                };

                updateUserLikes(coment);

                updateById(COMENTARIOS, id, doc)
                    .then(() => {
                        likesDislikes(x);
                        showAlert("Elemento actualizado correctamente", "alert-success");
                    })
                    .catch(() => {
                        showAlert("Error al intentar actualizar el elemento", "alert-danger");
                    });
            });
    } else {
        alert("Debes iniciar sesión para poder votar y comentar.");
    }
}

function dislikes2(id, x) {
    if (isLogged()) {
        selectById(COMENTARIOS, id).then((doc) => {
            let doca = {
                dislikes: (doc.data().dislikes + 1)
            };

            updateUserDislikes(doc);

            updateById(COMENTARIOS, id, doca)
                .then(() => {
                    likesDislikes(x);
                    showAlert("Elemento actualizado correctamente", "alert-success");
                })
                .catch(() => {
                    showAlert("Error al intentar actualizar el elemento", "alert-danger");
                });
        });
    } else {
        alert("Debes iniciar sesión para poder votar y comentar.");
    }
}

function likesDislikes(x) {
    selectAll(PUBLICACIONES)
        .then((arrayItems) => {
            showElements(arrayItems);
        })
        .catch(() => {
            showAlert("Error al mostrar los elementos", "alert-danger");
        })
        .finally(() => {

            setTimeout(function() {
                document.getElementById("like" + x).classList.add("disabled");
                document.getElementById("dislike" + x).classList.add("disabled");
                logger(isLogged());
            }, delay);
        });
    }