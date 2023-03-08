let delay = 1000;

window.addEventListener("load", function () {
    loadItemsFecha();
    persistence();
});

function undisplay_Mod() {
    document.getElementById("publicaciones").style.display = "none";
}

document.getElementById("perfil").addEventListener("click", function () {
    document.getElementById("divUser").style.display = "block";
    document.getElementById("divNoticias").style.display = "none";
    document.getElementById("divJuego").style.display = "none";
    document.getElementById("divForo").style.display = "none";
    document.getElementById("divFaqs").style.display = "none";

    undisplay_Mod();
    perfilUsuario();
});

// Llamar/ocultar divs de secciones web
document.getElementById("linkNoticias").addEventListener("click", function () {
    document.getElementById("divNoticias").style.display = "block";
    document.getElementById("divJuego").style.display = "none";
    document.getElementById("divForo").style.display = "none";
    document.getElementById("divFaqs").style.display = "none";
    document.getElementById("divUser").style.display = "none";
    // Si eres el mod en esa instancia
    logger(isLogged());
});

document.getElementById("linkJuego").addEventListener("click", function () {
    document.getElementById("divJuego").style.display = "block";
    document.getElementById("divNoticias").style.display = "none";
    document.getElementById("divForo").style.display = "none";
    document.getElementById("divFaqs").style.display = "none";
    document.getElementById("divUser").style.display = "none";

    undisplay_Mod();
});

document.getElementById("linkForo").addEventListener("click", function () {
    document.getElementById("divForo").style.display = "block";
    document.getElementById("divNoticias").style.display = "none";
    document.getElementById("divJuego").style.display = "none";
    document.getElementById("divFaqs").style.display = "none";
    document.getElementById("divUser").style.display = "none";

    undisplay_Mod();
});

document.getElementById("linkFaqs").addEventListener("click", function () {
    document.getElementById("divFaqs").style.display = "block";
    document.getElementById("divNoticias").style.display = "none";
    document.getElementById("divJuego").style.display = "none";
    document.getElementById("divForo").style.display = "none";
    document.getElementById("divUser").style.display = "none";

    undisplay_Mod();
});

function showAlert(text, type) {
    document.getElementById("alert").innerText = text;
    document.getElementById("alert").className = "alert " + type;
    document.getElementById("alert").style.display = "block";
    window.setTimeout(function () {
        document.getElementById("alert").style.display = "none";
    }, delay);
}

document.getElementById("close_register").addEventListener("click", () => {
    modal.close();
    borrar_registro();
});