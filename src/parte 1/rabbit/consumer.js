const { COLA_GENERAL } = require("../../config");
const rabbitMQInstance = require("../../loaders/rabbit");

const consumer = async () => {
    const { channel } = await rabbitMQInstance
    await channel.assertQueue(COLA_GENERAL)
    console.log(`Cola "${COLA_GENERAL}" creada`);
    channel.consume(this.COLA_GENERAL, (mensaje) => {
        if(mensaje != null){
            const contenido = mensaje.content.toString();
            console.log(contenido);
            channel.ack(mensaje);
        }
    })
}

consumer()