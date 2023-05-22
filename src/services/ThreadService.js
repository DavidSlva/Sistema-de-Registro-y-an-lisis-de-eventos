const {Worker} = require('worker_threads');
const rabbitMQInstance = require('../loaders/rabbit');
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
                console.log('Respuesta Hilo:', message);
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

    async consumerMQ(cola){
        const { channel } = await rabbitMQInstance
        console.log(cola);
        try {
            channel.consume(cola, (mensaje) => {
                if (mensaje !== null) {
                  const contenido = mensaje.content.toString();
                  console.log("Mensaje de la cola: ", contenido);
                  channel.ack(mensaje); // Confirmar el procesamiento del mensaje
                  // Realiza aquí el procesamiento del mensaje según tus necesidades
                }
            });
        } catch (error) {
            console.log(`Error en consumer: ${error}`);
        }
    }

    producerMQ(timestamp, minPalabras, cola){

        return new Promise(async (resolve, reject) =>{
            const { channel } = await rabbitMQInstance;

            
            const worker = new Worker('./producer.js', {
                workerData: {timestamp, minPalabras}
            })
            
            worker.on('message', message => {
                console.log(message);
                channel.sendToQueue(cola, Buffer.from(JSON.stringify(message)));
                console.log('Mensaje Recibido');

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