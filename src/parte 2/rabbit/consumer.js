const { exchangeName, categorias } = require("../../CONSTANTS");
const { COLA_GENERAL } = require("../../config");
const rabbitMQInstance = require("../../loaders/rabbit");
const { limpiarArchivo, guardarDatosEnArchivo } = require("../../services/file");

const OUTPUT_FILE_NAME = 'rabbit_output.txt'

const consumer = async () => {
    const { channel } = await rabbitMQInstance
    // await channel.assertQueue(COLA_GENERAL)

    await channel.assertExchange(exchangeName, 'direct', { durable: false }); // Declarar el intercambio directo

    console.log(`Cola "${COLA_GENERAL}" creada`);
    // limpiarArchivo(OUTPUT_FILE_NAME);
    categorias.forEach(async (categoria) => {
        const queueName = `${categoria}_queue`;
        limpiarArchivo(`rabbit_${queueName}.txt`);
        const routingKey = categoria;
        await channel.assertQueue(queueName, { durable: false }); // Declarar una cola para cada tipo de mensaje
        await channel.bindQueue(queueName, exchangeName, routingKey);

        let counter = 0;

        let startTime = performance.now()

        channel.consume(queueName, (mensaje) => {
            if(mensaje != null){
                const contenido = mensaje.content.toString();
                console.log({
                    cola: queueName,
                    message: contenido
                });
                counter++;
                channel.ack(mensaje);
            }
            if(counter%100 === 0){
                let endTime = performance.now();
                let duration = Math.floor(endTime - startTime)
                guardarDatosEnArchivo(`${queueName},${counter},${duration}\n`,`p2_rabbit.txt`)
                console.log(`Se consumieron ${counter} mensajes en ${duration} ms`);
                startTime = performance.now()
            }
        })
    })
}

consumer()