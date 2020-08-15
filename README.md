# LewdDataCollector
Bot de Discord programado en Node.js orientado en creación de .json de forma local para almacenar enlaces de archivos multimedia e información de utilidad.
# Requisitos
Para ejecutar este repositorio en Windows es necesario contar con Node.js (https://nodejs.org/es/)

En caso de que desees utilizarlo en Android (Con Termux) o Linux, debes ejecutar lo siguiente:
```sh
$ apt install nodejs
```
Una vez instalado Node.js, basta con posarse en la carpeta raíz e insertar lo siguiente en la terminal:
```sh
$ npm install
```
Esto instalara Discord.js que es necesario para ejecutar este repositorio.
# Ejecución
Para su ejecución, basta con insertar lo siguiente en la terminal:
```sh
$ node lewddatacollector.js
```
# Configuración
Para poder ejecutar este repositorio, es necesario configurar un archivo .json, el cual tiene solicita lo siguiente:

 1. **Token:** Token del Bot el cual se puede obtener en [este enlace](https://discord.com/developers/applications/)
 2. **Servidor:** La ID del servidor que deseas analizar (¡Ojo! Es necesario que el bot tenga acceso a dicho servidor)
 3. **Filtro:** ¿Con que caracteres empiezan los canales de tu interés?
 4. **Nombre_Categorias:** ¿Que nombre de categoría te gustaría que tuviera?
 5. **HabilitarproxyURL:** ¿Deseas almacenar el enlace del contenido multimedia?

**Observación:** Pueden ser múltiples Filtros y/o Nombre_Categorías

# Entrada
Como se puede apreciar en la imagen que se vera a continuación, la entrada debe contener lo siguiente:
1. Contenido multimedia (Opcional)
2. Texto (Si deseas obtener textos en las diferentes variables, estas deben estar con saltos de linea)

![Entrada Esperada](https://cdn.discordapp.com/attachments/742267122666962964/742267199128993843/Readme_LewdDataCollector.png)
# Salida
La salida sera un .json que tendra como nombre el canal que cumpla el filtro asignado y dentro de el contendra lo siguiente:
```javascript
{
  "GIFs": [
    "https://cdn.discordapp.com/attachments/742267122666962964/742267199128993843/Readme_LewdDataCollector.png"
  ],
  "Artistas": [
    "EmiilyExtacy"
  ],
  "URLs:" [
    "https://www.instagram.com/EmiilyExtacy/"
  ],
  "Referencia:" [
    "A Fool Moon Night"
  ]
}

