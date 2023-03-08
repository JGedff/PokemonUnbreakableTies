function perfilUsuario() {

    let emailActual = auth.currentUser.email;
    let html = "";

    selectAll(USUARIS)
        .then((array) => {
            array.forEach((user) => {
                if (user.data().email == emailActual) {
                    html = `<div>
                                <div class="d-flex">
                                    <div>
                                        <img src="${user.data().fotoPerfil}" alt="Foto de perfil de ${user.data().name}" class="m-3" style="width: 350px">
                                    </div>
                                    <div class="w-100 my-3" style="margin-right: 15px">
                                        <div class="d-flex justify-content-between">
                                            <h2>${user.data().name}</h2>
                                            <b>${user.data().email}</b>
                                        </div>
                                        <div>${user.data().descripcionPerfil}</div>
                                        <button type="button" class="btn btn-danger"onclick="delMyUser()">Eliminar usuario</button>
                                        <button type="button" class="btn btn-info"onclick="editMyUser()">Editar usuario</button>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around mt-5">
                                    <div>Publicaciones creadas: ${user.data().cantidadPublicaciones}</div>
                                    <div>Comentarios publicador: ${user.data().cantidadComentarios}</div>
                                    <div>Likes acumulados: ${user.data().likesTotales}</div>
                                    <div>Dislikes acumulados: ${user.data().dislikesTotales}</div>
                                </div>
                            </div>`;
                }
            });
        })
        .finally(() => {
            document.getElementById("divUser").innerHTML = html;
        });
}

/* IMPORTANTE--Interacción con el div "ordenar" del apartado Noticias y novedades.
 * Esta función es la que hace que se muestre el contenido, además de permitir ordenarlo. */ 
function showElements(arrayItems) {

    //Elimina todo el texto html del elemento con id ordenar
    document.getElementById("ordenar").innerHTML = "";

    //Muestra las publicaciones con su contenido habitual: imagen, usuario, categoría, contenido, likes, dislikes y cantidad de comentarios
    let counter = 0;

    arrayItems.forEach((doc) => {
        if (doc.id != "vtJrDcKOBi9HEgMKoYX2") {

            counter++;

            let documents = "/Publicacions/"+doc.id;
            //Para saber la categoria de la publicacion
            let category = new String(doc.data().categoria);
            let categoriaDocument = category.split('/');
            let categoryEliminated = true;

            //Si la publicación incluye una imagen, se muestra una carta con categoría, título, imagen, contenido, likes, dislikes y cantidad de comentarios

                selectAll(CATEGORY)
                    .then((arrayItems) => {
                        arrayItems.forEach((categ) => {
                            if (categ.data().name == categoriaDocument[2]) {
                                categoryEliminated = false;
                            }
                        })
                    })
                    .finally(() => {

                        if (categoryEliminated) {
                            categoriaDocument[2] = "Esta categoría ha sido eliminada";
                        }

                        if (auth.currentUser == null) {
                            document.getElementById("ordenar").innerHTML += `<div class="card card-body border border-secondary mt-3 mb-5 mx-5 contentBG">
                                                                                    <div class="d-flex justify-content-between">
                                                                                        <div class="mx-2 mt-1">
                                                                                            <strong>Usuario: ${doc.data().user} (${doc.data().email})</strong>
                                                                                        </div>
                                                                                        <div class="mx-2 mt-1">
                                                                                            Categoria: ${categoriaDocument[2]}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="mt-1 border-top border-bottom border-info rounded">
                                                                                        <div class="mx-3 my-2">
                                                                                            <h3>${doc.data().titol}</h3>
                                                                                            <div class="mt-3 ms-4">
                                                                                                <p>${doc.data().contingut}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ms-4 mb-1">
                                                                                            <img src="${doc.data().image}" class="rounded mb-2" style="max-width: 350px; max-height: 350px;" "alt="${doc.data().title}">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="d-flex mx-2 justify-content-between">
                                                                                        <div>
                                                                                            <button type="button" id="like${counter}" class="likes btn btn-primary mx-2 mt-2" onclick="likes('${doc.id}', ${counter})">
                                                                                                <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                ${doc.data().likes}
                                                                                            </button>
                                                                                            <button type="button" id="dislike${counter}" class="dislikes btn btn-primary mx-2 mt-2" onclick="dislikes('${doc.id}', ${counter})">
                                                                                                <img src="img/Dislike.png" alt="Disike" style="width: 20px"/>
                                                                                                ${doc.data().dislikes}
                                                                                            </button>
                                                                                            <button type="button" class="btn btn-secondary mx-2 mt-2">
                                                                                                Comentarios: ${doc.data().quantitatComentaris}
                                                                                            </button>
                                                                                            <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                                Borrar publicación
                                                                                            </button>
                                                                                            <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarPubli('${doc.id}')">
                                                                                                Editar publicación
                                                                                            </button>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button type="button" id="respuestas${counter}" class="respuestas btn btn-primary end-0 mx-2 mt-2" onclick="answer('${doc.id}')">
                                                                                                <i class="fa-solid fa-reply mx-2"></i>
                                                                                                Responder
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="ms-5" id="r${doc.id}"></div>
                                                                                </div>`;
                                                                                
                                                                                counter++;
    
                                                                                /* Selecciona TODOS los comentarios */
                                                                                selectAll(COMENTARIOS)
                                                                                    .then((array) => {
                                                                                        array.forEach((doca) => {
                                                                                            
                                                                                            if (doca.id != "I4OCfTIRdQzyuEXSrnQn" && doca.data().post == documents) {
                                                                                                document.getElementById(`r${doc.id}`).innerHTML += `<div class="card card-body border border-secondary mt-3 pb-2 contentBG">
                                                                                                        <div class="mx-2 text-center">
                                                                                                            <h5 class="float-start">Re: ${doc.data().titol}</h5>
                                                                                                            <h6 class="float-end"><strong>${doca.data().user} (${doca.data().email})</strong></h6>
                                                                                                        </div>
                                                                                                        <div class="border-top border-bottom border-info rounded">
                                                                                                            <div class="mt-2 mx-3">
                                                                                                                <p>${doca.data().contingut}</p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="d-flex justify-content-between">
                                                                                                            <div>
                                                                                                                <button type="button" id="like${counter}" class="likes btn btn-primary btn-sm mx-2 mt-2" onclick="likes2('${doca.id}', ${counter})">
                                                                                                                    <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                                    ${doca.data().likes}
                                                                                                                </button>
                                                                                                                <button type="button" id="dislike${counter}" class="dislikes btn btn-primary btn-sm mx-2 mt-2" onclick="dislikes2('${doca.id}', ${counter})">
                                                                                                                    <img src="img/Dislike.png" alt="Dislike" style="width: 20px"/>
                                                                                                                    ${doca.data().dislikes}
                                                                                                                </button>
                                                                                                                <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="restComent('${doca.id}')">
                                                                                                                    Borrar comentario
                                                                                                                </button>
                                                                                                                <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarComent('${doca.id}')">
                                                                                                                    Editar comentario
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>`;
                                                                                            }
                                                                                        });
                                                                                    });
                        }
                        else {

                            if (doc.data().mostraImatge) {
                                
                                if (doc.data().email == auth.currentUser.email) {
                                    document.getElementById("ordenar").innerHTML += `<div class="card card-body border border-secondary mt-3 mb-5 mx-5 contentBG">
                                                                                        <div class="d-flex justify-content-between">
                                                                                            <div class="mx-2 mt-1">
                                                                                                <strong>Usuario: ${doc.data().user} (${doc.data().email})</strong>
                                                                                            </div>
                                                                                            <div class="mx-2 mt-1">
                                                                                                Categoria: ${categoriaDocument[2]}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="mt-1 border-top border-bottom border-info rounded">
                                                                                            <div class="mx-3 my-2">
                                                                                                <h3>${doc.data().titol}</h3>
                                                                                                <div class="mt-3 ms-4">
                                                                                                    <p>${doc.data().contingut}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="ms-4 mb-1">
                                                                                                <img src="${doc.data().image}" class="rounded mb-2" style="max-width: 350px; max-height: 350px;" "alt="${doc.data().title}">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="d-flex mx-2 justify-content-between">
                                                                                            <div>
                                                                                                <button type="button" id="like${counter}" class="likes btn btn-primary mx-2 mt-2" onclick="likes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                    ${doc.data().likes}
                                                                                                </button>
                                                                                                <button type="button" id="dislike${counter}" class="dislikes btn btn-primary mx-2 mt-2" onclick="dislikes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Dislike.png" alt="Disike" style="width: 20px"/>
                                                                                                    ${doc.data().dislikes}
                                                                                                </button>
                                                                                                <button type="button" class="btn btn-secondary mx-2 mt-2">
                                                                                                    Comentarios: ${doc.data().quantitatComentaris}
                                                                                                </button>
                                                                                                <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                                    Borrar publicación
                                                                                                </button>
                                                                                                <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2" onclick="editarPubli('${doc.id}')">
                                                                                                    Editar publicación
                                                                                                </button>
                                                                                            </div>
                                                                                            <div>
                                                                                                <button type="button" id="respuestas${counter}" class="respuestas btn btn-primary end-0 mx-2 mt-2" onclick="answer('${doc.id}')">
                                                                                                    <i class="fa-solid fa-reply mx-2"></i>
                                                                                                    Responder
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ms-5" id="r${doc.id}"></div>
                                                                                    </div>`;
                                }
                                else {
                                    document.getElementById("ordenar").innerHTML += `<div class="card card-body border border-secondary mt-3 mb-5 mx-5 contentBG">
                                                                                        <div class="d-flex justify-content-between">
                                                                                            <div class="mx-2 mt-1">
                                                                                                <strong>Usuario: ${doc.data().user} (${doc.data().email})</strong>
                                                                                            </div>
                                                                                            <div class="mx-2 mt-1">
                                                                                                Categoria: ${categoriaDocument[2]}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="mt-1 border-top border-bottom border-info rounded">
                                                                                            <div class="mx-3 my-2">
                                                                                                <h3>${doc.data().titol}</h3>
                                                                                                <div class="mt-3 ms-4">
                                                                                                    <p>${doc.data().contingut}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="ms-4 mb-1">
                                                                                                <img src="${doc.data().image}" class="rounded mb-2" style="max-width: 350px; max-height: 350px;" "alt="${doc.data().title}">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="d-flex mx-2 justify-content-between">
                                                                                            <div>
                                                                                                <button type="button" id="like${counter}" class="likes btn btn-primary mx-2 mt-2" onclick="likes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                    ${doc.data().likes}
                                                                                                </button>
                                                                                                <button type="button" id="dislike${counter}" class="dislikes btn btn-primary mx-2 mt-2" onclick="dislikes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Dislike.png" alt="Disike" style="width: 20px"/>
                                                                                                    ${doc.data().dislikes}
                                                                                                </button>
                                                                                                <button type="button" class="btn btn-secondary mx-2 mt-2">
                                                                                                    Comentarios: ${doc.data().quantitatComentaris}
                                                                                                </button>
                                                                                                <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                                    Borrar publicación
                                                                                                </button>
                                                                                                <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarPubli('${doc.id}')">
                                                                                                    Editar publicación
                                                                                                </button>
                                                                                            </div>
                                                                                            <div>
                                                                                                <button type="button" id="respuestas${counter}" class="respuestas btn btn-primary end-0 mx-2 mt-2" onclick="answer('${doc.id}')">
                                                                                                    <i class="fa-solid fa-reply mx-2"></i>
                                                                                                    Responder
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ms-5" id="r${doc.id}"></div>
                                                                                    </div>`;
                                }
            
                                counter++;
        
                                /* Selecciona TODOS los comentarios */
                                selectAll(COMENTARIOS)
                                    .then((array) => {
                                        array.forEach((doca) => {
                                            
                                            if (doca.id != "I4OCfTIRdQzyuEXSrnQn" && doca.data().post == documents) {
        
                                                /* Solo muestra esos comentarios que en el campo post és igual a la variable documents */
                                                if (doca.data().email == auth.currentUser.email) {
                                                    document.getElementById(`r${doc.id}`).innerHTML += `<div class="card card-body border border-secondary mt-3 pb-2 contentBG">
                                                                                                            <div class="mx-2 text-center">
                                                                                                                <h5 class="float-start">Re: ${doc.data().titol}</h5>
                                                                                                                <h6 class="float-end"><strong>${doca.data().user} (${doca.data().email})</strong></h6>
                                                                                                            </div>
                                                                                                            <div class="border-top border-bottom border-info rounded">
                                                                                                                <div class="mt-2 mx-3">
                                                                                                                    <p>${doca.data().contingut}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="d-flex justify-content-between">
                                                                                                                <div>
                                                                                                                    <button type="button" id="like${counter}" class="likes btn btn-primary btn-sm mx-2 mt-2" onclick="likes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                                        ${doca.data().likes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="dislike${counter}" class="dislikes btn btn-primary btn-sm mx-2 mt-2" onclick="dislikes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Dislike.png" alt="Dislike" style="width: 20px"/>
                                                                                                                        ${doca.data().dislikes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2" onclick="restComent('${doca.id}')">
                                                                                                                        Borrar comentario
                                                                                                                    </button>
                                                                                                                    <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2" onclick="editarComent('${doca.id}')">
                                                                                                                        Editar comentario
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>`;
                                                }
                                                else {
                                                    document.getElementById(`r${doc.id}`).innerHTML += `<div class="card card-body border border-secondary mt-3 pb-2 contentBG">
                                                                                                            <div class="mx-2 text-center">
                                                                                                                <h5 class="float-start">Re: ${doc.data().titol}</h5>
                                                                                                                <h6 class="float-end"><strong>${doca.data().user} (${doca.data().email})</strong></h6>
                                                                                                            </div>
                                                                                                            <div class="border-top border-bottom border-info rounded">
                                                                                                                <div class="mt-2 mx-3">
                                                                                                                    <p>${doca.data().contingut}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="d-flex justify-content-between">
                                                                                                                <div>
                                                                                                                    <button type="button" id="like${counter}" class="likes btn btn-primary btn-sm mx-2 mt-2" onclick="likes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                                        ${doca.data().likes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="dislike${counter}" class="dislikes btn btn-primary btn-sm mx-2 mt-2" onclick="dislikes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Dislike.png" alt="Dislike" style="width: 20px"/>
                                                                                                                        ${doca.data().dislikes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="restComent('${doca.id}')">
                                                                                                                        Borrar comentario
                                                                                                                    </button>
                                                                                                                    <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarComent('${doca.id}')">
                                                                                                                        Editar comentario
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>`;
                                            }
                                        }
                                    });
                                })
                                .finally(() => {
                                    logger(isLogged());
                                });
                            }

                            //En caso contrario, se muestra una carta con categoría, contenido, likes, dislikes y cantidad de comentarios
                            else {
                                if (doc.data().email == auth.currentUser.email) {
                                    document.getElementById("ordenar").innerHTML += `<div class="card card-body border border-secondary mt-3 mb-5 mx-5 contentBG">
                                                                                        <div class="d-flex justify-content-between">
                                                                                            <div class="mx-2 mt-1">
                                                                                                <strong>Usuario: ${doc.data().user} (${doc.data().email})</strong>
                                                                                            </div>
                                                                                            <div class="mx-2 mt-1">
                                                                                                Categoria: ${categoriaDocument[2]}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="mt-1 border-top border-bottom border-info rounded">
                                                                                            <div class="mx-3 my-2">
                                                                                                <h3>${doc.data().titol}</h3>
                                                                                                <div class="mt-3 ms-4">
                                                                                                    <p>${doc.data().contingut}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="ms-4 mb-1">
                                                                                                <img src="${doc.data().image}" class="rounded mb-2" style="max-width: 350px; max-height: 350px;" "alt="${doc.data().title}">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="d-flex mx-2 justify-content-between">
                                                                                            <div>
                                                                                                <button type="button" id="like${counter}" class="likes btn btn-primary mx-2 mt-2" onclick="likes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                    ${doc.data().likes}
                                                                                                </button>
                                                                                                <button type="button" id="dislike${counter}" class="dislikes btn btn-primary mx-2 mt-2" onclick="dislikes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Dislike.png" alt="Disike" style="width: 20px"/>
                                                                                                    ${doc.data().dislikes}
                                                                                                </button>
                                                                                                <button type="button" class="btn btn-secondary mx-2 mt-2">
                                                                                                    Comentarios: ${doc.data().quantitatComentaris}
                                                                                                </button>
                                                                                                <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                                    Borrar publicación
                                                                                                </button>
                                                                                                <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2" onclick="editarPubli('${doc.id}')">
                                                                                                    Editar publicación
                                                                                                </button>
                                                                                            </div>
                                                                                            <div>
                                                                                                <button type="button" id="respuestas${counter}" class="respuestas btn btn-primary end-0 mx-2 mt-2" onclick="answer('${doc.id}')">
                                                                                                    <i class="fa-solid fa-reply mx-2"></i>
                                                                                                    Responder
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ms-5" id="r${doc.id}"></div>
                                                                                    </div>`;
                                }
                                else {
                                    document.getElementById("ordenar").innerHTML += `<div class="card card-body border border-secondary mt-3 mb-5 mx-5 contentBG">
                                                                                        <div class="d-flex justify-content-between">
                                                                                            <div class="mx-2 mt-1">
                                                                                                <strong>Usuario: ${doc.data().user} (${doc.data().email})</strong>
                                                                                            </div>
                                                                                            <div class="mx-2 mt-1">
                                                                                                Categoria: ${categoriaDocument[2]}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="mt-1 border-top border-bottom border-info rounded">
                                                                                            <div class="mx-3 my-2">
                                                                                                <h3>${doc.data().titol}</h3>
                                                                                                <div class="mt-3 ms-4">
                                                                                                    <p>${doc.data().contingut}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="ms-4 mb-1">
                                                                                                <img src="${doc.data().image}" class="rounded mb-2" style="max-width: 350px; max-height: 350px;" "alt="${doc.data().title}">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="d-flex mx-2 justify-content-between">
                                                                                            <div>
                                                                                                <button type="button" id="like${counter}" class="likes btn btn-primary mx-2 mt-2" onclick="likes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                    ${doc.data().likes}
                                                                                                </button>
                                                                                                <button type="button" id="dislike${counter}" class="dislikes btn btn-primary mx-2 mt-2" onclick="dislikes('${doc.id}', ${counter})">
                                                                                                    <img src="img/Dislike.png" alt="Disike" style="width: 20px"/>
                                                                                                    ${doc.data().dislikes}
                                                                                                </button>
                                                                                                <button type="button" class="btn btn-secondary mx-2 mt-2">
                                                                                                    Comentarios: ${doc.data().quantitatComentaris}
                                                                                                </button>
                                                                                                <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                                    Borrar publicación
                                                                                                </button>
                                                                                                <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarPubli('${doc.id}')">
                                                                                                    Editar publicación
                                                                                                </button>
                                                                                            </div>
                                                                                            <div>
                                                                                                <button type="button" id="respuestas${counter}" class="respuestas btn btn-primary end-0 mx-2 mt-2" onclick="answer('${doc.id}')">
                                                                                                    <i class="fa-solid fa-reply mx-2"></i>
                                                                                                    Responder
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ms-5" id="r${doc.id}"></div>
                                                                                    </div>`;
                                }
                
                                counter++;
        
                                /* Selecciona TODOS los comentarios */
                                selectAll(COMENTARIOS)
                                    .then((array) => {
                                        array.forEach((doca) => {
                                            
                                            if (doca.id != "I4OCfTIRdQzyuEXSrnQn" && doca.data().post == documents) {
        
                                                /* Solo muestra esos comentarios que en el campo post és igual a la variable documents */
                                                if (doca.data().email == auth.currentUser.email) {
                                                    document.getElementById(`r${doc.id}`).innerHTML += `<div class="card card-body border border-secondary mt-3 pb-2 contentBG">
                                                                                                            <div class="mx-2 text-center">
                                                                                                                <h5 class="float-start">Re: ${doc.data().titol}</h5>
                                                                                                                <h6 class="float-end"><strong>${doca.data().user} (${doca.data().email})</strong></h6>
                                                                                                            </div>
                                                                                                            <div class="border-top border-bottom border-info rounded">
                                                                                                                <div class="mt-2 mx-3">
                                                                                                                    <p>${doca.data().contingut}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="d-flex justify-content-between">
                                                                                                                <div>
                                                                                                                    <button type="button" id="like${counter}" class="likes btn btn-primary btn-sm mx-2 mt-2" onclick="likes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                                        ${doca.data().likes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="dislike${counter}" class="dislikes btn btn-primary btn-sm mx-2 mt-2" onclick="dislikes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Dislike.png" alt="Dislike" style="width: 20px"/>
                                                                                                                        ${doca.data().dislikes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2" onclick="restComent('${doca.id}')">
                                                                                                                        Borrar comentario
                                                                                                                    </button>
                                                                                                                    <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2" onclick="editarComent('${doca.id}')">
                                                                                                                        Editar comentario
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>`;
                                                }
                                                else {
                                                    document.getElementById(`r${doc.id}`).innerHTML += `<div class="card card-body border border-secondary mt-3 pb-2 contentBG">
                                                                                                            <div class="mx-2 text-center">
                                                                                                                <h5 class="float-start">Re: ${doc.data().titol}</h5>
                                                                                                                <h6 class="float-end"><strong>${doca.data().user} (${doca.data().email})</strong></h6>
                                                                                                            </div>
                                                                                                            <div class="border-top border-bottom border-info rounded">
                                                                                                                <div class="mt-2 mx-3">
                                                                                                                    <p>${doca.data().contingut}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="d-flex justify-content-between">
                                                                                                                <div>
                                                                                                                    <button type="button" id="like${counter}" class="likes btn btn-primary btn-sm mx-2 mt-2" onclick="likes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Like.png" alt="Like" style="width: 20px"/>
                                                                                                                        ${doca.data().likes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="dislike${counter}" class="dislikes btn btn-primary btn-sm mx-2 mt-2" onclick="dislikes2('${doca.id}', ${counter})">
                                                                                                                        <img src="img/Dislike.png" alt="Dislike" style="width: 20px"/>
                                                                                                                        ${doca.data().dislikes}
                                                                                                                    </button>
                                                                                                                    <button type="button" id="eliminar${counter}" class="eliminar btn btn-danger mx-2 mt-2 ocultar" onclick="restComent('${doca.id}')">
                                                                                                                        Borrar comentario
                                                                                                                    </button>
                                                                                                                    <button type="button" id="editar${counter}" class="editar btn btn-info mx-2 mt-2 ocultar" onclick="editarComent('${doca.id}')">
                                                                                                                        Editar comentario
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>`;
                                                }
                                            }
                                        });
                                    })
                                    .finally(() => {
                                        logger(isLogged());
                                    });
                            }
                    }
            });
        }
    });
}

function listUsers(arrayItems) {
    document.getElementById("users").innerHTML = "";

    arrayItems.forEach((user) => {
        if (user.id != "ytjjkRqzRcwSz5xSNcKM") {
            document.getElementById("users").innerHTML += `<div class="d-flex">
                                                                <div>
                                                                    <img src="${user.data().fotoPerfil}" alt="Imagen de perfil de ${user.data().name}" class="m-3" style="width: 150px">
                                                                </div>
                                                                <div class="w-100 my-3" style="margin-right: 15px">
                                                                    <div class="d-flex justify-content-between">
                                                                        <h2>${user.data().name}</h2>
                                                                        <b>${user.data().email}</b>
                                                                    </div>
                                                                    <div>${user.data().descripcionPerfil}</div>
                                                                    <button type="button" class="btn btn-info" onclick="userWithId('${user.id}')">Ver perfil</button>
                                                                </div>
                                                            </div>`;
        }
    });
}

function userWithId(userId) {
    selectById(USUARIS, userId)
        .then((user) => {
            if (auth.currentUser.uid == "5tPRFSHStdgnEYMPLTngAbep1673" || auth.currentUser.email == user.data().email) {
                document.getElementById("users").innerHTML = `<div>
                                                                    <div class="d-flex">
                                                                        <div>
                                                                            <img src="${user.data().fotoPerfil}" alt="Foto de perfil de ${user.data().name}" class="m-3" style="width: 350px">
                                                                        </div>
                                                                        <div class="w-100 my-3" style="margin-right: 15px">
                                                                            <div class="d-flex justify-content-between">
                                                                                <h2>${user.data().name}</h2>
                                                                                <b>${user.data().email}</b>
                                                                            </div>
                                                                            <div>${user.data().descripcionPerfil}</div>
                                                                            <button type="button" class="btn btn-primary" onclick="allUsers()">Volver</button>
                                                                            <button typw="button" class="btn btn-danger" onclick="delDataUser('${user.id}')">Eliminar usuario</button>
                                                                            <button typw="button" class="btn btn-info" onclick="editDataUser('${user.id}')">Editar usuario</button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="d-flex justify-content-around mt-5">
                                                                        <div>Publicaciones creadas: ${user.data().cantidadPublicaciones}</div>
                                                                        <div>Comentarios publicados: ${user.data().cantidadComentarios}</div>
                                                                        <div>Likes acumulados: ${user.data().likesTotales}</div>
                                                                        <div>Dislikes acumulados: ${user.data().dislikesTotales}</div>
                                                                    </div>
                                                                </div>`;
            }
            else {
                document.getElementById("users").innerHTML = `<div>
                                                                <div class="d-flex">
                                                                    <div>
                                                                        <img src="${user.data().fotoPerfil}" alt="Foto de perfil de ${user.data().name}" class="m-3" style="width: 350px">
                                                                    </div>
                                                                    <div class="w-100 my-3" style="margin-right: 15px">
                                                                        <div class="d-flex justify-content-between">
                                                                            <h2>${user.data().name}</h2>
                                                                            <b>${user.data().email}</b>
                                                                        </div>
                                                                        <div>${user.data().descripcionPerfil}</div>
                                                                        <button type="button" class="btn btn-info" onclick="allUsers()">Volver</button>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex justify-content-around mt-5">
                                                                    <div>Publicaciones creadas: ${user.data().cantidadPublicaciones}</div>
                                                                    <div>Comentarios publicados: ${user.data().cantidadComentarios}</div>
                                                                    <div>Likes acumulados: ${user.data().likesTotales}</div>
                                                                    <div>Dislikes acumulados: ${user.data().dislikesTotales}</div>
                                                                </div>
                                                            </div>`;
            }
        });
}