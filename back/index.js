/* 
    Va a contener la conexión de node con nuestra BD Mongo a través de mongoose.
*/
const mongoose = require('mongoose'); //Importamos mongoose para la conexión 
const app = require('./app'); // Vamos a importar la lógica de EXPRESS
const port = 4000; // declaramos el puerto de deseemos 

// Vamos a crear la lógica de la conexión con la BD
// El metodo connect recibe dos parámetros, el primero la ruta de la BD a enlazar
// y el segundo será una función que a su vez recibirá los parámetros de error y respuesta
mongoose.connect('mongodb://localhost:27017/bitfy', (err, res)=>{
    if(err){ 
        console.log(`El error es: ${err}`);
    }else{
        console.log(`Conexion Exitosa!!!`);
        app.listen(port, ()=>{
            console.log(`Puerto: ${port}`)
        })
    }
});