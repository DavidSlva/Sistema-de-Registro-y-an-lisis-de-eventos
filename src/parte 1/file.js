const fs = require('fs');

const guardarDatosEnArchivo = (datos, filename) => {
  
    fs.appendFile(filename, datos, (error) => {
      if (error) {
        console.error('Error al guardar los datos:', error);
      } else {
        console.log('Datos almacenados correctamente.');
      }
    });
};
const limpiarArchivo = (filename) => {
    fs.writeFile(filename, '', (error) => {
        if (error) {
          console.error('Error al guardar los datos:', error);
        } else {
          console.log('Datos almacenados correctamente.');
        }
      });
}
module.exports = {
    guardarDatosEnArchivo,
    limpiarArchivo
}