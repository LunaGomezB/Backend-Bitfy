/* 
    Vamos a crear el manejo de rutas de express para nuestra API
    Se encargará de manejar las rutas del lado Backend
*/
    const express = require('express');
    const  UsuarioControl = require('../control/usuarioControl'); // Importamos el controlador de las funciones

    var api = express.Router(); // Cargamos el manejador de rutas de Express

    /*
    Estos son denominados métodos HTTP y hacen parte de las características de una API
        POST  -> para agregar  datos
        GET -> Para obtener datos
        PUT -> para actualizar datos
        DELETE -> Para eliminar datos
    */

    // Declaración de las rutas que darán paso a la ejecución de las funciones
    // Ruta Registro de Usuario
    api.post('/registro', UsuarioControl.crearUsuario);
    //En el caso de un login o inicio de sesió utilizamos el metdo post en vez de GET
    api.post('/login', UsuarioControl.login);
    //Ruta actualizar datos usuario
    api.put('/actualizar/:id', UsuarioControl.actualizarUsuario);

    //Exportacion del archivo usuarioRutas
    module.exports = api;