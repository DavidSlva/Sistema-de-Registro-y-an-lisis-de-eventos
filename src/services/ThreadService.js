const {Worker} = require('worker_threads')
module.exports = class ThreadService{
    constructor(){

    }

    /**
     * Función para inicializar el thread o dispositivo
     * @param {Number} timestamp - Tiempo de carga
     * @param {Number} minPalabras - Cantidad mínima de palabras del dispositivo
     * @returns 
     */

    inicializar(timestamp = 100000, minPalabras = 10){
        return new Promise((resolve, reject) =>{
            const worker = new Worker('./producer.js', {
                workerData: {timestamp, minPalabras}
            })
            
            worker.on('message', message => {
                console.log('Mensaje recibido desde el hilo:', message);
            });
        
            worker.on('error', error => {
                reject(error);
            });
        
            worker.on('exit', code => {
            if (code !== 0)
                reject(new Error(`El hilo finalizó con un código de salida ${code}`));
            else
                resolve();
            });
        })
    }
}