/* 
    Se encargará de recibir los datos que el usuario envía desde la vista, procesandolos
    para enviarlos al modelo y que este los pueda corroborar con la BD para posteriormente
    guardarlos. También tendrá toda la lógica de las consultas, actualizaciones y eliminaciones
*/

    const Usuario = require('../modelo/usuario'); // Importamos el modelo de usuario

    // Funcion registro de usuario
    //Posee dos parámetros (Peticion o request)
    // res (respuesta o response)
    function crearUsuario(req, res){
        //Instanciar el objeto Usuario
        var usuario = new Usuario();

        //Guardar el cuerpo de la petición para mejor acceso de los datos que el usuario está enviando
        // parametros = {"nombre": "", "apellido": "", "correo": "", "contraseña": ""}
        var parametros = req.body;

        // Guardamos cada propiedad del JSON de la peticón en cada propiedad del modelo
        usuario.nombre = parametros.nombre;
        usuario.apellido = parametros.apellido;
        usuario.correo = parametros.correo;
        usuario.contraseña = parametros.contraseña;
        usuario.rol = 'usuario';
        usuario.imagen = null;

        //Guardar y validar los datos
        // db.coleccion.insert => usuario.save(); save es un método propio de mongoose
        usuario.save((err, usuarioNuevo)=>{
            if(err){
                // El primer error a validar será a nivel de servidor e infraestructura 500
                //Para esto existen States o estados.
                res.status(500).send({ message: "Error en el servidor"});
            } else{
                if(!usuarioNuevo){
                    // 404 -> Página no encontrada
                    // 200 -> ok pero con una alerta indicando que hay datos inválidos
                    res.status(200).send({
                        message: "No fue posible realizar el registro"
                    });
                } else{
                    // 200 -> ok
                    res.status(200).send({usuario: usuarioNuevo});
                }
            }
        });
    }

    //LOGIN USUARIO
    function login(req,res){
        var parametros = req.body;
        var correoUsuario = parametros.correo;
        var contraUsuario = parametros.contraseña;

        //Buscamos al usuario a través del correo. Usaremos toLowerCase() para evitar problemas de datos
        Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado) =>{
            if(err){
                res.status(500).send({message: "Error en el servidor"});
            }else {
                if(!usuarioLogueado){
                    res.status(200).send({message: "No has podido iniciar sesión,  verifica los datos"});
                }else{
                    if(usuarioLogueado.contraseña != contraUsuario){
                        res.status(200).send({message: "Contraseña Incorrecta"});
                    }else{
                        res.status(200).send({usuario: usuarioLogueado});
                    }
                }
            }
        });

    }
    // ACTUALIZAR USUARIO
    function actualizarUsuario(req,res){
        var usuarioId = req.params.id;
        var nuevosDatosUsuario = req.body;

        Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
            if(err){
                res.status(500).send({message: "Error en el servidor"});
            } else {
                if(!usuarioActualizado){
                    res.status(200).send({message: "No fue posible actualizar tus datos"});
                }else{
                    res.status(200).send({usuario: usuarioActualizado});
                }
            }
        });
    }
    //Exportación de las funciones creadas
    module.exports = {
        crearUsuario,
        login,
        actualizarUsuario
    }