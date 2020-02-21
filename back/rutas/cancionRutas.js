const express = require('express');
const  CancionControl = require('../control/cancionControl'); 
const multipart = require('connect-multiparty'); 
const subirImgDirectorio = multipart({uploadDir: './archivos/canciones'});

var api = express.Router(); 

api.post('/cargarContenido', CancionControl.registrarCancion);
api.put('/actualizarCancion/:id', CancionControl.actualizarCancion);
api.delete('/eliminarCancion/:id', CancionControl.eliminarCancion);
api.get('/buscarCancion', CancionControl.buscarCancion);
api.put('/subir-imagen-cancion/:id', subirImgDirectorio, CancionControl.imgCancion);
api.get('/obtener-imagen-cancion/:imageFile', subirImgDirectorio, CancionControl.mostrarImgCancion);

module.exports = api;