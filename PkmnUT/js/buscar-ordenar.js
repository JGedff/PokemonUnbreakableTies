function queBuscar() {
    let buscar = document.getElementById("selectSearcher").value;
    if (buscar == "categoria") {

        document.getElementById("Descript").style.display = "none";
        document.getElementById("inputControler").innerHTML = `<select class="form-control m-2" id="inputTextSearcher">`
        
        mostrarSelectCategorias("inputTextSearcher");

        document.getElementById("inputControler").innerHTML +=`</select>`;
    }
    else if (buscar == "likes" || buscar == "dislikes" || buscar == "quantitatComentaris") {
        
        document.getElementById("Descript").style.display = "block";
        document.getElementById("Descript").innerHTML = "Elije un operador:<br/>Escribe un numero:";

        document.getElementById("inputControler").innerHTML = `<select class="form-control m-2" id="operador">
                                                                    <option value=">">Mayor que</option>
                                                                    <option value=">=">Mayor o igual a</option>
                                                                    <option value="==">Igual a</option>
                                                                    <option value="<=">Menor o igual a</option>
                                                                    <option value="<">Menor que</option>
                                                                </select>`;        
        document.getElementById("inputControler").innerHTML += `<input type="number" class="form-control m-2 mt-3" id="inputTextSearcher">`;
    }
    else {
        document.getElementById("Descript").style.display = "block";
        document.getElementById("Descript").innerHTML = "Contenido del campo:";
        document.getElementById("inputControler").innerHTML = `<input type="text" class="form-control mt-3" id="inputTextSearcher">`;
    }
}

function buscador() {

    //Crea dos variables. field para guardar que campo el usuario ha seleccionado y value para guardar el valor que el usuario ha escrito
    let field = document.getElementById("selectSearcher").value;
    let value = document.getElementById("inputTextSearcher").value;

    if (field == "categoria") {
        value = "/Categories/"+value
    }

    //Si el usuario no ha seleccionado ningun campo
    if (field == "null") {
        //Muestra todos los elementos de la coleccion de la variable
        selectAll(PUBLICACIONES)
            .then((arrayItems) => {
                showElements(arrayItems);
            })
            .catch(() => {
                //Si hay algun error, muestra una alerta
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
    //...Si no escribe ningún valor
    else if (value == "") {
        //Muestra los elementos de la coleccion de la variable coleccion ordenados por el campo indicado
        selectAll(PUBLICACIONES, field)
            .then((arrayItems) => {
                showElements(arrayItems);
            })
            .catch(() => {
                //Si hay algun error, muestra una alerta
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
    //...Si la variable field es igual a likes, dislikes o quantitatComentaris
    else if (field == "likes" || field == "dislikes" || field == "quantitatComentaris") {
        //Crea una variable donde guarde que operador se usarà en el selectWhere
        let operator = document.getElementById("operador").value;
        //Selecciona los documentos que cumplen con la operacion del selectWhere. Number(value) permite que el valor de la variable value se detecte como un numero y no como una frase.
        selectWhere(PUBLICACIONES, field, operator, Number(value))
            .then((arrayItems) => {
                showElements(arrayItems);
            })
            .catch(() => {
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
    else {

        //Muestra los elementos de la coleccion de la variable coleccion ordenados por el campo indicado, solo mostrando aquellos que empiezan por el valor que el usuario haya escrito
        selectLike(PUBLICACIONES, field, value)
            .then((arrayItems) => {
                showElements(arrayItems);
            })
            .catch(() => {
                //Si hay algun error, muestra una alerta
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
}

function userSelectorSearch() {
    let selected = document.getElementById("users_selector").value;

    if (selected == "cantidadPublicaciones" || selected == "cantidadComentarios" || selected == "likesTotales" || selected == "dislikesTotales") {
        document.getElementById("users_field").innerHTML = `Elije un operador:<br/>Escribe un numero:`;
        document.getElementById("users_controler").innerHTML = `<select class="form-control m-2" id="users_operator">
                                                                    <option value=">">Mayor que</option>
                                                                    <option value=">=">Mayor o igual a</option>
                                                                    <option value="==">Igual a</option>
                                                                    <option value="<=">Menor o igual a</option>
                                                                    <option value="<">Menor que</option>
                                                                </select>`;        
        document.getElementById("users_controler").innerHTML += `<input type="number" class="form-control m-2 mt-3" id="users_input">`
    }
    else {
        document.getElementById("users_field").innerHTML = "Contenido del campo";
        document.getElementById("users_controler").innerHTML = `<input type="text" class="form-control mt-3" id="users_input" placeholder="Introduce el texto a buscar">`;
    }
}

function userSearch() {
    let field = document.getElementById("users_selector").value;
    let value = document.getElementById("users_input").value;

    if (field == "likesTotales" || field == "dislikesTotales" || field == "cantidadComentarios" || field == "cantidadPublicaciones") {
        let operator = document.getElementById("users_operator").value;
        
        selectWhere(USUARIS, field, operator, Number(value))
            .then((arrayItems) => {
                listUsers(arrayItems);
            });
    }
    else {
        selectLike(USUARIS, field, value)
            .then((arrayItems) => {
                listUsers(arrayItems);
            });
    }
}

function loadItemsFecha() {

    selectAll(PUBLICACIONES, "fecha")
        .then((arrayItems) => {
            showElements(arrayItems);
        })
        .catch(() => {
            showAlert("Error al mostrar los elementos", "alert-danger");
        });
}

function orderAll(field, desc) {

    //Si la variable desc no es nula
    if (desc != null) {
        //Muestra los elementos de la coleccion USUARIS ordenados por el campo indicado
        selectAll(PUBLICACIONES, field)
            .then((arrayItems) => {
                //Invierte el array
                arrayItems.reverse();
                showElements(arrayItems);
            })
            .catch(() => {
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
    else {
        //Muestra los elementos de la coleccion USUARIS ordenados por el campo indicado
        selectAll(PUBLICACIONES, field)
            .then((arrayItems) => {
                showElements(arrayItems);
            })
            .catch(() => {
                //Si hay algún error, muestra esta alerta
                showAlert("Error al mostrar los elementos", "alert-danger");
            });
    }
}

function allUsers() {

    selectAll(USUARIS, "fecha")
        .then((arrayItems) => {
            arrayItems.reverse();
            listUsers(arrayItems);
        });
}

function usersBy(field, desc = false) {

    if (desc) {

        selectAll(USUARIS, field)
            .then((arrayItems) => {
                arrayItems.reverse();
                listUsers(arrayItems);
            });
    }
    else {

        selectAll(USUARIS, field)
            .then((arrayItems) => {
                listUsers(arrayItems);
            });
    }
}