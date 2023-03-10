function answer(id) {
    if (isLogged()) {
        comentar(`${id}`);
    } else {
        alert("Debes iniciar sesión para poder votar y comentar.");
    }
}

// Función para mostrar y esconder los botones del popup de creación de comentarios/respuestas
function comentar(id) {
    comentario.showModal();
    document.getElementById("afegeix").innerHTML = `<button type="button" class="btn btn-primary me-2" onclick="addComentarios('${id}');cerrarComentar()">
                                                        Guardar
                                                    </button>
                                                    <button type="button" class="btn btn-secondary ms-2" onclick="cerrarComentar()">
                                                        Cancelar
                                                    </button>`;
    document.getElementById("items").style.display = "block";
};

//Función para crear comentarios/respuestas
function addComentarios(id) {

    let contenido = document.getElementById("descriptComent").value;
    // Recoge la fecha y hora actual y guarda día, mes, año, hora, minuto y segundo
    let date = dateNow();
    let emailUser = auth.currentUser.email;
    let userName = "";

    if (contenido == "") {
        contenido = "Eso pensava yo!";
    }

    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.data().email == auth.currentUser.email) {
                    userName = usuario.data().name;
                }
            });
        })
        .finally(() => {
            selectById(PUBLICACIONES, `${id}`)
                .then((publicacion) => {
                    // Crea en la BD el documento del comentario
                    let doc = {
                        email: emailUser,
                        user: userName,
                        contingut: contenido,
                        likes: 0,
                        dislikes: 0,
                        fecha: date,
                        post: "/Publicacions/"+id
                    };

                    let act = {
                        quantitatComentaris: (publicacion.data().quantitatComentaris + 1)
                    };

                    updateById(PUBLICACIONES, id, act);

                    // Añade el comentario en la base de datos
                    add(COMENTARIOS, doc)
                        .then(() => {
                            showAlert("Comentario creado correctamente", "alert-success");
                        })
                        .finally(() => {
                            wait();
                        });
                });

            updateUserComents();
        });
}

function restComent(docId) {
    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.id != "ytjjkRqzRcwSz5xSNcKM") {
                    selectById(COMENTARIOS, docId)
                        .then((coment) => {

                            if (usuario.data().email == coment.data().email) {
                                
                                let actUser = {
                                    cantidadComentarios: (usuario.data().cantidadComentarios - 1),
                                    likesTotales: (usuario.data().likesTotales - coment.data().likes),
                                    dislikesTotales: (usuario.data().dislikesTotales - coment.data().dislikes)
                                }
            
                                updateById(USUARIS, usuario.id, actUser);

                                selectAll(PUBLICACIONES)
                                    .then((arrayItems) => {
                                        arrayItems.forEach((pub) => {
                                            if ("/Publicacions/"+pub.id == coment.data().post) {

                                                let actPubli = {
                                                    quantitatComentaris: (pub.data().quantitatComentaris - 1)
                                                }

                                                updateById(PUBLICACIONES, pub.id, actPubli);

                                            }
                                        });
                                    })
                            }
                        })
                        .finally(() => {
                            deleteById(COMENTARIOS, docId)
                                .then(() => {
                                    showAlert("Comentario eliminado correctamente", "alert-success");
                                })
                                .catch(() => {
                                    showAlert("Error al intentar eliminar el elemento", "alert-danger");
                                });
                        });
                }
            });
        });
}

function deleteItem(id) {
    let idPost = "/Publicacions/"+id;

    selectAll(COMENTARIOS)
        .then((arrayItems) => {
            arrayItems.forEach((doc) => {
                
                if (doc.data().post == idPost) {
                    restComent(doc.id);
                }
            });
        })
        .finally(() => {
            restPublication(id);
        });
}

function editarComent(id) {
    comentario.showModal();
    document.getElementById("afegeix").innerHTML = `<button type="button" class="btn btn-primary me-2" onclick="updateComents('${id}');cerrarComentar()">
                                                        Guardar
                                                    </button>
                                                    <button type="button" class="btn btn-secondary ms-2" onclick="cerrarComentar()">
                                                        Cancelar
                                                    </button>`;
    document.getElementById("items").style.display = "block";

    selectById(COMENTARIOS, id)
        .then((doc) => {
            document.getElementById().value = doc.data("nombre").user;
            document.getElementById().value = doc.data("descriptComent").contingut;
        })
        .catch(() => {
            showAlert("Error al intentar editar el elemento", "alert-danger");
        });
}

function updateComents(id) {

    let contenido = document.getElementById("descriptComent").value;
    let date = dateNow();
    let emailUser = auth.currentUser.email;

    let doc = {
        userUpdate: emailUser,
        contingut: contenido,
        ultimActualitzacio: date,
    };

    updateById(COMENTARIOS, `${id}`, doc)
        .then(() => {
            loadItemsFecha();
            showAlert("Comantario actualizado", "alert-success");
        })
        .catch(() => {
            showAlert("No se ha actualizado el comentario", "alert-danger");
        });
}