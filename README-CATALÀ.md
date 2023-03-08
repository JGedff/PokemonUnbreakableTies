# firebaseProject
Aquest projecte es una web inspirada en el fangame "Pokémon Unbreakable Ties", feta amb HTML, CSS y JavaScript conectat a Firebase.

Avans de començar, haurà de fer alguns canvis en els arxius:
  - En l'arxiu index.html, l'última funció "staticImg()" haurà de canviar la ruta local de l'arxiu per la URL d'una imatge guardada en el Storage del Firebase.
  - En l'arxiu js/config.js, en la funció firebase.initializeApp({ haurà de posar les dades que se li demanen.
  - En l'arxiu items.js haurà de canviar les senténcies "...db.collection();" i posar-li el nom de les col·leccions de firebase entre cometes dins dels paréntesis.
  - Haurà de crear un usuari i posar-li la uid "5tPRFSHStdgnEYMPLTngAbep1673". L'usuari registrat en la base de dades amb aquesta uid serà l'usuari administrador.
  - En la col·lecció de categoríes, haurà de crar un document amb la id "APqcql5Nzdv0DItyo1NT". Aquest document procurarà que la col·lecció no s'esborri en el cas de no tenir cap document, ja que no es mostrarà en ningún moment.
  - En la col·lecció de usuaris, haurà de crear un document amb la id "ytjjkRqzRcwSz5xSNcKM". Aquest document procurarà que la col·lecció dels usuaris no s'esborri en el cas de no tenir cap document, ja que no s'hauría de mostrar en ningún moment.
  - En la col·lecció de publicacions, haurà de crar un document amb la id "vtJrDcKOBi9HEgMKoYX2" per la mateixa raó que en els anteriors casos.
  - En la col·lecció de comentaris, haurà de crar un document amb la id "I4OCfTIRdQzyuEXSrnQn" per la mateixa raó que en els casos anteriors.


Per últim, avans d'explicar que es pot fer a la web, haig d'informar-li de que l'eliminació dels usuaris no funciona del tot:
  - Esborra els seus comentaris i les seves publicacions, s'esborra també el seu document de perfil, pero no s'esborra de l'autenticació de Firebase.
 

Per millorar:
  - Refactoring / Canviar nom de variables reiteratives i en diferents idiomes.
  - Com a usuari NO REGISTRAT:
  - Millora del HTML / CSS
  - Falta persisténcia de likes i dislikes.
  - Una publicació o comentari al ser editat, mostrar un text "(editat)" perque altres usuaris sàpiguen que la publicació o comentari s'ha editat.
  - Una publicació o comentari al ser editat, mostrar quin usuari ha editat el text.
  - Editor de perfil.
  - Eliminador de perfil.
  - Creació i gestió de secrets per poder eliminar perfils.
    

Qué es pot fer:
  - Com a usuari NO REGISTRAT:
      + Mirar l'apartat de "El juego", "Fórum" i "FAQs"
      + En l'apartat de "Fórum" només pot mirar. No es pot ni crear comentaris, ni donar like a comentaris o publicacions
      + Pot buscar una o vàries publicacions segons el seu títol, el seu contingut escrivint com comença
      + Pot buscar una o vàries publicacions segons la seva categoría, elegint una de les categoríes que surten en el desplegable
      + Pot buscar una o vàries publicacions segons la cuantitat de likes, dislikes o cuantitat de comentaris indicant si es major, major o igual, igual, menor o igual o menor que un numero que escrigui
      + Pot ordenar les publicacions pel titol, el contingut de la publicació, el nom de la categoría, la cuantitat de likes, dislikes o cuantitat de respostes.
  
  - Com a usuari REGISTRAT:
      + Pot crear publicacions
      + Pot crear comentaris
      + Pot donar like o dislike a un comentari o publicació
      + Pot editar o eliminar un comentari o publicació creada pel mateix usuari
      + Pot veure el seu perfil
      + Pot entrar en la secció de "Usuarios", en la cual es llisten tots els usuaris registrats a la base de dades que tenen un document en la col·lecció d'usuaris
      + Pot buscar un o varis usuaris segons com comença el seu correu, el nom d'usuari o la seva descripcció
      + Pot buscar un o varis usueris segons la cuantitat cuantitat de likes acumulats, de dislikes acumulats, publicacions creades i comentaris fets
      + Pot ordenar els usuaris segons el seu correu, el nom d'usuari, la seva descripció, la cuantitat de publicacions creades, la cuantitat de comentaris fets, la cuantitat de likes o dislikes acumulats.

  - Com a usuari administrador / usuari amb id "ytjjkRqzRcwSz5xSNcKM"
      + Pot crear i eliminar categoríes
      + Pot editar TOTS els comentaris, publicacions i perfils d'usuari
      + Pot eliminar TOTS els comentaris, publicacions i perfils d'usuari


Cualsevol canvi per millorar, si li ha agradat o si no li ha agradat, siusplau, contacta amb mi.
