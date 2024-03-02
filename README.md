Hola!, bienvenido a mi API REST de League Of Quotes, un pequeño recopilatorio de personajes y algunas de sus frases del videojuego "League of Legends".
Esta API realmente, mas que ser util, es una demostracion de mis habilidades, poniendo a prueba mi capacidad de poder desarrollar API utilizando las tecnologias de NodeJS con Express.
Tambien podria haber alimentado la informacion de la API con una base de datos, ya sea relacional o no relacional. Pero cosa que no me es posible por terminos de presupuestos, ya que
tanto para ejecutar, desarrollar y mantener el repositorio o en si, el servidor. Estoy utilizando recursos gratuitos que no lo admiten.

Cabe destacar que la API se basa en el videojuego League Of Legends, propiedad de Riot Games. Creditos hacia ellos.

A continuacion, vamos a repasar lo que se puede hacer con la API y como esta se estructura.

1. Ruta Raiz (https://league-of-quotes-api.vercel.app)

En esta ruta, simplemente se obtiene un JSON de todos los personajes que se encuentran en la API, en ambos idiomas, tanto español o ingles. Solo eso, no hay mas.

2. Segunda ruta, lenguaje (https://league-of-quotes-api.vercel.app/spanish) - (https://league-of-quotes-api.vercel.app/english)

Esta ruta se divide en dos partes, una donde contiene la informacion de los personajes en español y otra en inglés. Ambas funcionan exactamente igual, asi que para terminos practicos solo vamos a
centrarnos en la ruta "spanish".
Esta ruta devuelve un JSON con los personajes exclusivamente en español (o el lenguaje de la ruta que accediste), brindando informacion de los personajes a la cual puedes acceder mediante sus claves
que se mostraran a continuacion (para ambos lenguajes las claves se encuentran en ingles).

"id" -> ID unico del personaje.
"name" -> Nombre del personaje.
"slogan" -> El slogan del personaje.
"quote" -> Frase del personaje (para estas me basé en su frase de pick c: ).
"region" -> Region de la que procede el personaje.
"pic" -> Ruta relativa a la imagen del personaje, esta se encuentra en formato jpg.

Esta ruta tambien acepta parametros, los cuales tambien veremos a continuacion.

random -> Devuelve un personaje aleatorio. Acepta argumento true o false;
EJ: https://league-of-quotes-api.vercel.app/spanish?random=true

orderBY -> Devuelve a los personajes en el orden indicado por la clave.
EJ: https://league-of-quotes-api.vercel.app/spanish/search?orderBy=name

order -> Se le puede especificar el orden "desc" (descendiente) o "asc" (ascendiente), por defecto, incluso si no se usa este filtro, se ordena de forma ascendiente.
EJ: https://league-of-quotes-api.vercel.app/spanish/search?order=desc

region -> Se puede filtrar personajes por la region a la que pertenecen.
EJ: https://league-of-quotes-api.vercel.app/spanish/search?region=ionia

Algunos parametros se pueden combinar con el simbolo &.
EJ: https://league-of-quotes-api.vercel.app/spanish/search?region=ionia&orderBy=name

3. Ruta de personaje (https://league-of-quotes-api.vercel.app/spanish/search/ID_DE_PERSONAJE)
Tambien se puede filtrar para rescatar un personaje por su ID, pero no he logrado que funcione con el proveedor de hosting (Vercel).
Asi que los invito a descargar el codigo y hostearlo ustedes si quieren probarlo, mientras tanto estare trabajando para su fix en algun futuro :).
EJ: https://league-of-quotes-api.vercel.app/spanish/search/2

Y eso es todo lo que debes saber, la ruta en ingles funciona y acepta lo mismo, solo que en lugar de spanish, pues, pones ingles :p.
