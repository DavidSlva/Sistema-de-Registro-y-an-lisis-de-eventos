const rabbitMQInstance = require("../../loaders/rabbit")
const data = require('../../../dispositivos.json')
const { thread } = require("../../lib/thread")
const { COLA_GENERAL, FILE_THREAD } = require("../../config")
const { categorias } = require("../../CONSTANTS")


const producer = async () => {
    const { channel } = await rabbitMQInstance
    const dispositivos = data.dispositivos
    dispositivos.map( async (dispositivo, index) => {
        const categoria = categorias.find((value) => value == dispositivo.categoria)
        const queueName = `${categoria}_queue`;
        setInterval(() => {
            thread(FILE_THREAD, {minPalabras: dispositivo.value})
            .then((mensaje) => {
                channel.sendToQueue(queueName, Buffer.from(`Disp ${index}: ${mensaje}`))
                console.log(`Disp ${index} enviando con la categoría ${queueName}`);
            })
        }, dispositivo.Timestamp)    
    })
}

producer()