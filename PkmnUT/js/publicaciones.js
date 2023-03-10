//Lanzar publicación (desde el popup de publicación)
function guardar() {
    let title = document.getElementById("username").value;
    let content = document.getElementById("descripcion").value;
    let category = document.getElementById("categoria").value;
    let mostrar = document.getElementById("default").checked;
    let imageUndefined = false;

    let emailUser = auth.currentUser.email;

    let imatge = document.getElementById("image").files[0];

    document.getElementById("username").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("default").checked = true;

    //Si no se sube imagen, coge la imagen por defecto (con la checkbox marcada)
    if (imatge == undefined) {
        imatge = staticImg();
        imageUndefined = true;
    }
    
    let date = dateNow();

    //En caso de detectar campos vacíos cuando se publica, estos se autorrellenan
    if (title == "") {
        title = "¿Cuál es este pokémon?";
    }

    if (content == "") {
        content = "Es un Ditto!";
    }

    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.data().email == emailUser) {
                    let doc = {
                        user: usuario.data().name,
                        email: emailUser,
                        contingut: content,
                        titol: title,
                        categoria: "/Categories/"+category,
                        mostraImatge: mostrar,
                        likes: 0,
                        dislikes: 0,
                        quantitatComentaris: 0,
                        fecha: date
                    };
                
                    if (imageUndefined == false) {
                        uploadFile(imatge)
                            .then((imageUrl) => {
                                doc.image = imageUrl;
                                addItem(doc);
                                showAlert("La publicación se ha creado correctamente", "alert-success");
                            })
                            .catch(() => {
                                showAlert("Error al intentar guardar el elemento", "alert-danger");
                            });
                    }
                    else {
                        doc.image = imatge;
                        addItem(doc);
                        showAlert("La publicación se ha creado correctamente", "alert-success");
                    }
                
                    updateUserPublications();
                }
            });
        })
}

function restPublication(docId) {
    selectAll(USUARIS)
        .then((arrayItems) => {
            arrayItems.forEach((usuario) => {
                if (usuario.id != "ytjjkRqzRcwSz5xSNcKM") {
                    selectById(PUBLICACIONES, docId)
                        .then((pub) => {

                            if (usuario.data().email == pub.data().email) {
                                
                                let actUser = {
                                    cantidadPublicaciones: (usuario.data().cantidadPublicaciones - 1),
                                    likesTotales: (usuario.data().likesTotales - pub.data().likes),
                                    dislikesTotales: (usuario.data().dislikesTotales - pub.data().dislikes)
                                }
            
                                updateById(USUARIS, usuario.id, actUser);
                            }
                        })
                        .finally(() => {
                            deleteById(PUBLICACIONES, docId)
                                .then(() => {
                                    showAlert("Publicación eliminada correctamente", "alert-success");
                                })
                                .catch(() => {
                                    showAlert("Error al intentar eliminar el elemento", "alert-danger");
                                });
                        });
                }
            });
        });
}

function editarPubli(id) {
    editPublicacion.showModal();
    document.getElementById("editarId").innerHTML = `<button type="button" class="btn btn-primary me-2" onclick="publicacionEditada('${id}'); editPublicacion.close()">
                                                        Guardar
                                                    </button>
                                                    <button type="button" class="btn btn-secondary ms-2" onclick="editPublicacion.close()">
                                                        Cancelar
                                                    </button>`;
    selectById(PUBLICACIONES, id)
        .then((doc) => {
            document.getElementById("nameuser").value = doc.data().titol;
            document.getElementById("description").value = doc.data().contingut;
            document.getElementById("imagen").src = doc.data().image;
            mostrarSelectCategorias("categories");
            document.getElementById("show").checked = doc.data().mostraImatge;
        })
        .catch(() => {
            showAlert("Error al intentar editar el elemento", "alert-danger");
        });
}

function publicacionEditada(id) {
    let title = document.getElementById("nameuser").value;
    let content = document.getElementById("description").value;
    let imatge = document.getElementById("imagen").src;
    let category = document.getElementById("categories").value;
    let showImage = document.getElementById("show").checked;
    let date = dateNow();
    let emailUser = auth.currentUser.email;

    //En caso de detectar campos vacíos cuando se publica, estos se autorrellenan
    if (title == "") {
        title = "¿Cuál es este pokémon?";
    }

    if (content == "") {
        content = "Es un Ditto!";
    }

    //Si no se sube imagen, coge la imagen por defecto (con la checkbox marcada)
    if (imatge == undefined) {
        imatge = staticImg();
        imageUndefined = true;
    }

    let doc = {
        userUpdate: emailUser,
        titol: title,
        contingut: content,
        image: imatge,
        categoria: "/Categories/"+category,
        mostraImatge: showImage,
        ultimActualitzacio: date
    };

    updateById(PUBLICACIONES, `${id}`, doc)
        .then(() => {
            loadItemsFecha();
            showAlert("Publicación actualizada", "alert-success");
        })
        .catch(() => {
            showAlert("No se ha actualizado la publicación", "alert-danger");
        });
}

function eliminar(itemId, imageUrl) {
    if (imageUrl == "https://firebasestorage.googleapis.com/v0/b/actprova-d4af7.appspot.com/o/imgHtml%2Fbugeaditto.png?alt=media&token=9f1c4ae6-4b85-4240-a339-c851f9d5a82c") {
        deleteItem(itemId);
        wait();
    }
    else {
        deleteFile(imageUrl)
            .then(() => {
                deleteItem(itemId);
                wait();
            })
            .catch(() => {
                showAlert("Error al intentar eliminar la imagen", "alert-danger");
            });
    }
}