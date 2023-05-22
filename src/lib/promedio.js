
module.exports = function calcularPromedio(ejecuciones = []) {
    let promedio = 0;
    ejecuciones.forEach((ejecucion) => {
        promedio += ejecucion
    })
    promedio = promedio / ejecuciones.length;
  
    return promedio;
}
  