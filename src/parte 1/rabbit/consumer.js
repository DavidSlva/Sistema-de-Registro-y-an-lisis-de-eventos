const { COLA_GENERAL } = require("../../config");
const rabbitMQInstance = require("../../loaders/rabbit");
const { limpiarArchivo, guardarDatosEnArchivo } = require("../file");

const OUTPUT_FILE_NAME = 'rabbit_output.txt'

const consumer = async () => {
    const { channel } = await rabbitMQInstance
    await channel.assertQueue(COLA_GENERAL)
    console.log(`Cola "${COLA_GENERAL}" creada`);
    limpiarArchivo(OUTPUT_FILE_NAME);


    let counter = 0;

    let startTime = performance.now()

    channel.consume(this.COLA_GENERAL, (mensaje) => {
        if(mensaje != null){
            const contenido = mensaje.content.toString();
            // console.log(contenido);
            counter++;
            // console.log(counter);
            
            channel.ack(mensaje);
            
        }
        if(counter%100 === 0){
            let endTime = performance.now();
            let duration = endTime - startTime
            guardarDatosEnArchivo(`${counter}, ${duration}\n`,OUTPUT_FILE_NAME)
            console.log(`Se consumieron ${counter} mensajes en ${duration} ms`);
            startTime = performance.now()
        }

    })
}

consumer()