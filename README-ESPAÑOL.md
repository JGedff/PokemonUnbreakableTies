# firebaseProject
Este proyecto es una web inspirada en el fangame "Pokémon Unbreakable Ties", hecha con HTML, CSS y JavaScript conectado a Firebase.

Antes de empezar, tendrá que hacer algunos cambios en los archivos:
  - En el archivo index.html, la última función "staticImg()", tendrá que canviar la ruta del arxivo local al URL de un archivo guardado en el Storage de Firebase.
  - En el archivo js/config.js, en la función firebase.initializeApp({ tendrá que poner los datos que se le piden.
  - En el archivo items.js deberá cambiar las sentencias "...db.collection();" y ponerle el nombre de las colecciones de firebase entre comillas dentro de los paréntesis.
  - Deberá crear un usuario y ponerle la uid "5tPRFSHStdgnEYMPLTngAbep1673". El usuario registrado en la base de datos con esta uid será el usuario administrador.
  - En la colección de categorías, deberá crear un documento con la id "APqcql5Nzdv0DItyo1NT". Este documento procurará que la colección no se borre en caso de no tener ningún documento, ya que no se mostrará en ningún momento.
  - En la colección de usuarios, tendrá que crear un documento con la id "ytjjkRqzRcwSz5xSNcKM". Este documento procurará que la colección de los usuarios no se borre en caso de no tener ningún documento, ya que no debería mostrarse en ningún momento.
  - En la colección de publicaciones, deberá crear un documento con la id "vtJrDcKOBi9HEgMKoYX2" por la misma razón que en los anteriores casos.
  - En la colección de comentarios, deberá crear un documento con la id "I4OCfTIRdQzyuEXSrnQn" por la misma razón que en los casos anteriores.


Por último, antes de explicar que se puede hacer en la web, debo informarle de que la eliminación de los usuarios no funciona del todo:
  - Borra sus comentarios y publicaciones, se borra también su documento de perfil, pero no se borra de la autenticación de Firebase.


Para mejorar:
  - Refactoring / Cambiar nombre de variables reiterativas y en distintos idiomas.
  - Como usuario NO REGISTRADO:
  - Mejora del HTML/CSS
  - Falta persistencia de likes y dislikes.
  - Una publicación o comentario al ser editado, mostrar un texto "(editado)" para que otros usuarios sepan que la publicación o comentario se ha editado.
  - Una publicación o comentario al ser editado, mostrar que usuario ha editado el texto.
  - Editor de perfil.
  - Eliminador de perfil.
  - Creación y gestión de secretos para eliminar perfiles.


Qué se puede hacer:
  - Como usuario NO REGISTRADO:
      + Mirar el apartado de "El juego", "Fórum" y "FAQs"
      + En el apartado de "Fórum" sólo puede mirar. No se puede crear comentarios, ni dar like a comentarios o publicaciones
      + Puede buscar una o varias publicaciones según su título, su contenido escribiendo cómo comienza
      + Puede buscar una o varias publicaciones según su categoría, eligiendo una de las categorías que salen en el desplegable
      + Puede buscar una o varias publicaciones según la cantidad de likes, dislikes o cantidad de comentarios indicando si es mayor, mayor o igual, igual, menor o igual o menor que un número que escriba
      + Puede ordenar las publicaciones por el título, el contenido de la publicación, el nombre de la categoría, la cantidad de likes, dislikes o cantidad de respuestas.
  
  - Como usuario REGISTRADO:
      + Puede crear publicaciones
      + Puede crear comentarios
      + Puede dar like o dislike a un comentario o publicación
      + Puede editar o eliminar un comentario o publicación creada por el mismo usuario
      + Puede ver su perfil
      + Puede entrar en la sección de "Usuarios", en la que se listan todos los usuarios registrados en la base de datos que tienen un documento en la colección de usuarios
      + Puede buscar uno o varios usuarios según comience su correo, el nombre de usuario o su descripción
      + Puede buscar uno o varios usuarios según la cantidad cantidad de likes acumulados, de dislikes acumulados, publicaciones creadas y comentarios hechos
      + Puede ordenar a los usuarios según su correo, el nombre de usuario, su descripción, la cantidad de publicaciones creadas, la cantidad de comentarios hechos, la cantidad de likes o dislikes acumulados.

  - Como usuario administrador / usuario con id "ytjjkRqzRcwSz5xSNcKM"
      + Puede crear y eliminar categorías
      + Puede editar TODOS los comentarios, publicaciones y perfiles de usuario
      + Puede eliminar TODOS los comentarios, publicaciones y perfiles de usuario


Cualquier cambio para mejorar, si le ha gustado o si no le ha gustado, por favor, contacta conmigo.
