const { Kafka } = require('kafkajs');
const data = require('../../../dispositivos.json');
const { FILE_THREAD } = require('../../config');
const { thread } = require('../../lib/thread');

// Configuración del cliente de Kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092', 'localhost:39092']
});

// Función asincrónica para enviar mensajes al tópico
const sendMessage = async () => {
    const dispositivos = data.dispositivos

    const producer = kafka.producer({
        // createPartitioner: Partitioners.LegacyPartitioner
    })

    dispositivos.map( async (dispositivo, index) => {
        
        setInterval(() => {
            thread(FILE_THREAD, {minPalabras: dispositivo.value})
            .then(async (mensaje) => {
                await producer.connect()
                await producer.send({
                    topic: dispositivo.categoria,
                    messages: [
                      { value: mensaje },
                    ],
                })
                await producer.disconnect()
            })
        }, dispositivo.Timestamp)    
    })
};

// Llamada a la función para enviar el mensaje
sendMessage().catch(console.error);
