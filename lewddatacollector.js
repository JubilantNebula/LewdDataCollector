//  Carga el módulo del sistema de archivos nativo de Node.js
const fs = require('fs');
//  Carga el Modulo Discord.js
const Discord = require('discord.js');
/*  Carga la configuración ubicada en ./config.json
    Dicha config debe contener:.
    @Token: Token del Bot
    @Servidor: ID del Servidor a Analizar
    @Filtro: ¿Con que nombre deben comenzar los canales a analizar?
    @Nombre_Categorias: ¿Que nombre tendra cada linea analizada por mensaje?
    @HabilitarproxyURL: ¿Almaceno el enlace del contenido Multimedia? 
*/
const {Token,Servidor,Filtro,Nombre_Categorias,HabilitarproxyURL} = require('./config.json');
// Crea un nuevo cliente de Discord
const client = new Discord.Client();
// Si todo sale bien, despliego un mensaje en consola y pongo el status correspondiente
client.once('ready', () => {
    console.log('¡Estoy actualmente operativa~!');
        client.user.setActivity('contenido', { type: 'WATCHING' })
        .catch(console.error);
});

// Cuando el cliente este listo, empiezo a trabajar.
client.on('message', message => {
    // Si alguien escribe en el servidor especificado.
    if (message.guild.id === Servidor){
        // Creo variable para determinar si el nombre del canal empieza con alguno de los filtros.
        var Canal = false;
        // ¿El nombre del canal empieza con alguno de los filtros?
        for (i = 0; i < Filtro.length-1; i++){
            if (message.channel.name.includes(Filtro[i])){
                Canal = true
            }
        }
        // Si escribe en el servidor y adicionalmente el nombre del canal empieza con alguno de los filtros, trabajo.
        if (Canal){
            // Divido la información que me interesa por saltos de lineas.
            var Informacion = message.content.split('\n');
            // Creo variable para almacenar el proxyURL (y lo resetea en caso de contener algo)
            var proxyURL = '';
            // Si encuentro una imagen, agregar a URL.
            message.attachments.forEach(attachment => {
                proxyURL = attachment.proxyURL;
            });
            // Especifico la Ruta del archivo
            const Imagenes = `./commands/BDD/${message.channel.name}.json`;
            // Si el archivo no existe, lo creo
            if (!fs.existsSync(Imagenes)){
                fs.closeSync(fs.openSync(Imagenes,'w'));
                fs.writeFileSync(Imagenes,'{\n\n}')
            }
            // Preparo los archivos para modificar.
            const Lectura = fs.readFileSync(Imagenes);
            const Archivo = JSON.parse(Lectura);
            // Creo Desfase en caso de que tenga que almacenar una imagen.
            var Desfase = 0;
            // Si no existe el estructura, lo creo.
            if (!Archivo[Nombre_Categorias[0]]){
                // Creo nuevas variables para dar lugar a las distintas categorias.
                for (i = 0; i < Nombre_Categorias.length-1; i++) {
                    var Temporal = [];
                    var Imagen = [];
                    // En caso de que se desee almacenar el enlace del contenido multimedia.
                    if (HabilitarproxyURL === 1 && i === 0){
                        Temporal.push(Informacion[i]);
                        Imagen.push(proxyURL);
                        Archivo[`${Nombre_Categorias[i]}`] = Imagen;
                        Archivo[`${Nombre_Categorias[i+1]}`] = Temporal;
                        fs.writeFileSync(Imagenes, JSON.stringify(Archivo,null,2));
                        Desfase++;
                    }
                    else{
                        Temporal.push(Informacion[i]);
                        Archivo[`${Nombre_Categorias[i+Desfase]}`] = Temporal;
                        fs.writeFileSync(Imagenes, JSON.stringify(Archivo,null,2));
                    }
                } 
            }
            // Si la estructura ya esta definida, agrego datos.
            else{
                for (i = 0; i < Nombre_Categorias.length-1; i++) {
                    var Temporal = [];
                    // En caso de que se desee almacenar el enlace del contenido multimedia.
                    if (HabilitarproxyURL === 1 && i === 0){
                        Archivo[`${Nombre_Categorias[i]}`].push(proxyURL);
                        Archivo[`${Nombre_Categorias[i+1]}`].push(Informacion[i]);
                        fs.writeFileSync(Imagenes, JSON.stringify(Archivo,null,2));
                        Desfase++;
                    }
                    else{
                        Archivo[`${Nombre_Categorias[i+Desfase]}`].push(Informacion[i]);
                        fs.writeFileSync(Imagenes, JSON.stringify(Archivo,null,2));
                    }
                } 
            }
        }
    }
});

// Inicia sesion a Discord con el token cargado en ./config.json
client.login(Token);