/* 
    Va a contener toda la lógica de ruteo de Express.
    Declaración de rutas, uso de Middleware body-parser.
    Permisos de acceso a cualquier cliente (Permisos al aplicativo Front hecho en Angular)
*/

    const express = require('express'); // Importamos Express
    const bodyParser = require('body-parser'); // Permitir analizar datos en la URL

    const app = express(); // Application Express

    // Solicitar las rutas de acceso a cada función que ejecutará nuestra aplicación
    const usuarioRutas = require('./rutas/usuarioRutas');
    const cancionRutas = require('./rutas/cancionRutas');


    //MIDDLEWARES --
    //Declaramos el análisis de datos con body-parser
    app.use(bodyParser.json());


    //Configuración de permisos de acceso
    

    //Consumo de las rutas
    app.use('/api', usuarioRutas);
    app.use('/api', cancionRutas);
    // ---- FIN MIDDLEWARES---

    //Exportamos el archivo app.js para su uso en la aplicación o raíz index.js
    module.exports = app;
    