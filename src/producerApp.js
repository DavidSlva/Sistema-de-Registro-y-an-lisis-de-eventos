const data = require('../dispositivos.json')
const { Worker } = require('worker_threads')
const rabbitMQInstance = require('./loaders/rabbit')

const dispositivos = data.dispositivos

const producer = async () =>{
    const { channel } = await rabbitMQInstance;
    const cola = 'mi-cola';
    dispositivos.map( async (dispositivo, index) => {
        setInterval(() => {
            const worker = new Worker('./producer.js', {
                workerData: {minPalabras: dispositivo.value}
            })
            worker.on('message', async message => {
                try {
                    await channel.sendToQueue(cola, Buffer.from(`Dispositivo ${index}:`));
                    console.log(`Dispositivo ${index}:`);
                } catch (error) {
                    console.log('error en producr: ', error);
                }
            })
        }, dispositivo.timestamp)    
        // channel.sendToQueue(cola, Buffer.from(dispositivo.value.toString()));
    })
    
    const mensaje = '¡Hola, mundo!';
    
    // channel.sendToQueue(cola, Buffer.from(mensaje));
    
    console.log(`Mensaje enviado a la cola ${cola}: ${mensaje}`);
}
producer()
// const cola = '/dispositivos'

// // dispositivos.map( async (dispositivo, index) => {
// //     const { channel } = await rabbitMQInstance
// //     setInterval(() => {
// //         const worker = new Worker('./producer.js', {
// //             workerData: {minPalabras: dispositivo.value}
// //         })
// //         worker.on('message', async message => {
// //             try {
// //                 await channel.sendToQueue(cola, Buffer.from(message));
// //                 console.log(`Dispositivo ${index}:`, message);
// //             } catch (error) {
// //                 console.log('error en producr: ', error);
// //             }
// //         })
// //     }, dispositivo.timestamp)    
// // })