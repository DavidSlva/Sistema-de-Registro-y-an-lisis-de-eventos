const {Worker} = require('worker_threads')
module.exports = class ThreadService{
    constructor(){

    }

    inicializar(){
        return new Promise((resolve, reject) =>{
            const worker = new Worker('./producer.js')
            
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