function mostrarSelectCategorias(idHtml) {
    let html = "<option value='Random'>Elije una categoría</option>";
    selectAll(CATEGORY)
        .then((arrayItems) => {
            arrayItems.forEach((doc) => {
                if (doc.id != "APqcql5Nzdv0DItyo1NT") {
                    html += `<option value="${doc.data().name}">${doc.data().name}</option>`;
                }
            });
        })
        .finally(() => {
            document.getElementById(idHtml).innerHTML = html;
        });
}

function mostrarEditorCategorias() {
    let html = "";

    selectAll(CATEGORY)
        .then((arrayItems) => {
            arrayItems.forEach((doc) => {
                if (doc.id != "APqcql5Nzdv0DItyo1NT") {
                    html += `<div>
                                <div class="text-center">
                                    ${doc.data().name}
                                </div>
                                <button type="button" class="btn btn-danger me-2" onclick="eliminarCategoria('${doc.id}')">Eliminar categoría</button>
                            </div>`;
                }
            });
        })
        .finally(() => {
            document.getElementById("categoriasCreadas").innerHTML = html;
        });
}

function crearCategoria() {
    let nombreCategoria = document.getElementById("namecategory").value;
    
    let doc = {
        name: nombreCategoria
    };

    add(CATEGORY, doc)
        .then(() => {
            showAlert("La categoría se ha creado correctamente", "alert-success");
        })
        .catch(() => {
            showAlert("La categoría no se ha creado correctamente", "alert-danger");
        })
        .finally(() => {
            mostrarEditorCategorias();
            document.getElementById("namecategory").value = "";
        });
}

function eliminarCategoria(id) {
    deleteById(CATEGORY, id)
        .then(() => {
            showAlert("La categoría se eliminado correctamente", "alert-success");
        })
        .catch(() => {
            showAlert("La categoría no se ha borrado correctamente", "alert-danger");
        })
        .finally(() => {
            mostrarEditorCategorias();
        });
}

document.getElementById("editarCategorias").addEventListener("click", function () {
    popupCategorias.showModal();
    mostrarEditorCategorias();
});