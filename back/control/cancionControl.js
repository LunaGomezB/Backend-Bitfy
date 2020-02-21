const Cancion = require('../modelo/cancion');
const fs = require('fs'); //Importamos el modulo File System de NodeJs
const path = require('path'); //Importamos el modulo path de NodeJs 

function registrarCancion(req, res){
    
    var cancion = new Cancion();
    var parametros = req.body;  

    cancion.nombre = parametros.nombre;
    cancion.artista = parametros.artista;
    cancion.album = parametros.album;
    cancion.duracion = parametros.duracion; 
    cancion.genero = parametros.genero;
    cancion.portada = null;
    cancion.archivo = null; 

    cancion.save((err, cancionNueva)=>{
        if(err){
            res.status(500).send({ message: "Error en el servidor"});
        } else{
            if(!cancionNueva){
                res.status(200).send({
                    message: "No fue posible realizar el registro de la canción"
                });
            } else{
                res.status(200).send({ cancion: cancionNueva});
            }
        }
    });
}
function imgCancion(req,res){
    var cancionId = req.params.id;
    var nombreArchivo = "No ha subido ninguna imagen...";

    //validar si efectivamente se está enviando la imagen o el archivo

    if(req.files){
        //vamos ir analizando la ruta del archivo, el nombre y la extensión
        var rutaArchivo = req.files.portada.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);
        
        var extensionImg = nombreArchivo.split('\.');
        console.log(extensionImg);

        var extensionArchivo = extensionImg[1];
        console.log(extensionArchivo);
        
        //Validar si el formato del archivo es aceptable
        
        if(extensionArchivo == "png"|| extensionArchivo == "jpg" || extensionArchivo == "jpeg"){
        //Actualizar del usuario, el campo imagen que inicialmente teniamos null
            Cancion.findByIdAndUpdate(cancionId, {portada: nombreArchivo},(err, cancionImg) => {
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!cancionImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            portada: nombreArchivo, 
                            cancion: cancionImg});
                    }
                }          
            });

        } else{ 
            //Formato Ivalido
            res.status(200).send({message: "Formato inválido!! No es imagen"});
        } 

        } else{
            //No existe una img para subir
            res.status(200).send({message: "No ha subido ninguna imagen"});

    }
}
function mostrarImgCancion(req,res){
    var archivo = req.params.imageFile 
    //Verificamos la carpeta para encontrar el archivo
    var ruta = './archivos/canciones/' +  archivo;

    //validar su existe la imagen
    //fs.exists('el archivo a verificar', (existe o no)=>{}) 
    fs.exists(ruta, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Imagen no encontrada"});
        }
    });   
}
function actualizarCancion(req,res){
    var cancionId = req.params.id;
    var nuevosDatosCancion = req.body;

    Cancion.findByIdAndUpdate(cancionId, nuevosDatosCancion, (err, cancionActualizada)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        } else {
            if(!cancionActualizada){
                res.status(200).send({message: "No fue posible actualizar la canción"});
            }else{
                res.status(200).send({cancion: cancionActualizada});
            }
        }
    });
}
function buscarCancion(req,res){
     const cancionId = req.params.id;
    Cancion.find(cancionId, (err, cancion) => {
        if (err){ 
            return req.status(500).send({message: "Error de conexión"});
        }else{
            return res.status(200).send(cancion);
        }
        
    });

}

function eliminarCancion(req,res){
    var cancionId = req.params.id;

    Cancion.findByIdAndRemove(req.params.cancionId,(err, cancion)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        } else {
            res.status(200).send({message: "Se elimino la canción correctamente"});
        }
        
    });
}

module.exports = {
    registrarCancion,
    actualizarCancion,
    imgCancion,
    mostrarImgCancion,
    buscarCancion,
    eliminarCancion
}