const { COLA_GENERAL } = require("../../config");
const rabbitMQInstance = require("../../loaders/rabbit");

const consumer = async () => {
    const { channel } = await rabbitMQInstance
    await channel.assertQueue(COLA_GENERAL)
    console.log(`Cola "${COLA_GENERAL}" creada`);


    let counter = 0;
    console.time('element')

    channel.consume(this.COLA_GENERAL, (mensaje) => {
        if(mensaje != null){
            const contenido = mensaje.content.toString();
            // console.log(contenido);
            counter++;
            // console.log(counter);
            
            channel.ack(mensaje);
            
        }
        if(counter%100 === 0){
            console.log(`Se consumieron ${counter} mensajes`);
            console.timeEnd('element')
            console.time('element')
        }

    })
}

consumer()