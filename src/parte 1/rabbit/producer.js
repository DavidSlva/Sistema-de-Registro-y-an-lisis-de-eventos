const rabbitMQInstance = require("../../loaders/rabbit")
const data = require('../../../dispositivos.json')
const { thread } = require("../../lib/thread")
const { COLA_GENERAL, FILE_THREAD } = require("../../config")


const producer = async () => {
    const { channel } = await rabbitMQInstance
    const dispositivos = data.dispositivos
    dispositivos.map( async (dispositivo, index) => {
        setInterval(() => {
            thread(FILE_THREAD, {minPalabras: dispositivo.value})
            .then((mensaje) => {
                channel.sendToQueue(COLA_GENERAL, Buffer.from(`Disp ${index}: ${mensaje}`))
                console.log(`Disp ${index} enviando`);
            })
        }, dispositivo.timestamp)    
    })
}

producer()